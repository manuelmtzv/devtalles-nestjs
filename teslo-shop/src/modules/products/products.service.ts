import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '@/modules/products/dto';
import { handleDbException } from '@/shared/utils/handleDbException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { TagsService } from '../tags/tags.service';
import { Product, Image } from '@/modules/products/entities';
import { User } from '../users/entities/user.entity';
import { deleteAllRows } from '@/shared/utils/deleteAllRows';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly dataSource: DataSource,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.productRespose(
      await this.productRepository.find({
        take: limit,
        skip: offset,
      }),
    );
  }

  async findOneRaw(term: string) {
    const whereClause = isUUID(term)
      ? { id: term }
      : [{ title: term }, { slug: term }];

    const product = await this.productRepository.findOne({
      where: whereClause,
      relations: ['tags', 'images', 'user'],
    });

    if (!product)
      throw new NotFoundException(`Product with id ${term} not found`);

    return product;
  }

  async findOne(term: string) {
    const product = await this.findOneRaw(term);
    return this.productRespose(product);
  }

  async create(user: User, createProductDto: CreateProductDto) {
    const composedProduct = await this.composeProduct(createProductDto);

    const product = this.productRepository.create({
      ...composedProduct,
      user,
    });

    try {
      return this.productRespose(await this.productRepository.save(product));
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...this.composeProduct(toUpdate),
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(Image, { product: product.id });

        product.images = images.map((url) =>
          this.imageRepository.create({ url: url }),
        );
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      const updatedProduct = await this.findOne(id);

      return updatedProduct;
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDbException(err, this.logger);
    }
  }

  async remove(id: string) {
    const product = await this.findOneRaw(id);
    await this.productRepository.remove(product);
  }

  async composeProduct(createProductDto: CreateProductDto | UpdateProductDto) {
    const { images = [] } = createProductDto;

    return {
      ...createProductDto,
      tags: await this.tagsService.findManyOrCreate(
        createProductDto.tags || [],
      ),
      images: images.map((url) => this.imageRepository.create({ url: url })),
    };
  }

  productRespose(data: Product | Product[]) {
    if (Array.isArray(data)) {
      return data.map((product) => {
        return {
          ...product,
          tags: product.tags.map((tag) => tag.name),
        };
      });
    }
    return {
      ...data,
      tags: data.tags?.map((tag) => tag.name),
    };
  }

  async deleteAllProducts() {
    return deleteAllRows(this.productRepository);
  }
}
