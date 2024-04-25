import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/modules/products/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@/modules/products/dto';
import { handleDbException } from '@/shared/utils/handleDbException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,
      // todo: relations
    });
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({ where: { id: term } });
    } else {
      const query = this.productRepository.createQueryBuilder('product');

      product = await query
        .where('LOWER(title) =LOWER(:term) OR LOWER(slug) =:term', {
          term,
        })
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product with id ${term} not found`);

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(
      await this.composeProductWithTags(createProductDto),
    );

    try {
      return await this.productRepository.save(product);
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const composedProduct = await this.composeProductWithTags(updateProductDto);

    try {
      const product = await this.productRepository.preload({
        id,
        ...composedProduct,
      });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      await this.productRepository.save(product);

      return product;
    } catch (err: unknown) {
      handleDbException(err, this.logger);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async composeProductWithTags(
    createProductDto: CreateProductDto | UpdateProductDto,
  ) {
    return {
      ...createProductDto,
      tags: await this.tagsService.findManyOrCreate(
        createProductDto.tags || [],
      ),
    };
  }
}
