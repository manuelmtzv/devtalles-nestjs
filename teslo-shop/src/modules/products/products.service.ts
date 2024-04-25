import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '@/modules/products/dto';
import { handleDbException } from '@/shared/utils/handleDbException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { TagsService } from '../tags/tags.service';
import { Product, Image } from '@/modules/products/entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
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
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({ where: { id: term } });
    } else {
      const query = this.productRepository.createQueryBuilder('product');

      product = await query
        .where('LOWER(title) =LOWER(:term) OR LOWER(slug) =:term', {
          term,
        })
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product with id ${term} not found`);

    return product;
  }

  async findOne(term: string) {
    const product = await this.findOneRaw(term);
    return this.productRespose(product);
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(
      await this.composeProduct(createProductDto),
    );

    try {
      return await this.productRespose(
        await this.productRepository.save(product),
      );
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const composedProduct = await this.composeProduct(updateProductDto);

    try {
      const product = await this.productRepository.preload({
        id,
        ...composedProduct,
      });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      await this.productRepository.save(product);

      return this.productRespose(product);
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async remove(id: string) {
    const product = await this.findOneRaw(id);
    await this.productRepository.remove(product);
  }

  async composeProduct(createProductDto: CreateProductDto | UpdateProductDto) {
    const { images } = createProductDto;

    return {
      ...createProductDto,
      tags: await this.tagsService.findManyOrCreate(
        createProductDto.tags || [],
      ),
      images: images.map((url) => this.imageRepository.create({ url: url })),
    };
  }

  async productRespose(data: Product | Product[]) {
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
      tags: data.tags.map((tag) => tag.name),
    };
  }
}
