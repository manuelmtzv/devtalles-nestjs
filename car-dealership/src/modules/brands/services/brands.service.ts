import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '@modules/brands/dto';
import { Brand } from '@modules/brands/entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'BMW',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);

    Object.assign(brand, updateBrandDto, {
      updatedAt: new Date().toISOString(),
    });

    return brand;
  }

  remove(id: string) {
    const index = this.brands.findIndex((brand) => brand.id === id);

    if (index === -1)
      throw new NotFoundException(`Brand with id ${id} not found`);

    this.brands.splice(index, 1);
  }

  seedBrands(brands: Brand[]) {
    this.brands = brands;
  }
}
