import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/modules/products/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@/modules/products/dto';
import { handleDbException } from '@/shared/utils/handleDbException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (err) {
      handleDbException(err, this.logger);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    const updatedProduct = this.productRepository.create({
      ...product,
      ...updateProductDto,
    });

    await this.productRepository.update(id, updatedProduct);

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
