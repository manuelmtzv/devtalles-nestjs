import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from '@modules/cars/dtos';
import { v4 as uuid } from 'uuid';
import { Car } from '@modules/cars/entities/car.entity';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'BMW',
    //   model: 'X5',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(dto: CreateCarDto) {
    const id = uuid();
    const car = { id, ...dto };

    this.cars.push(car);

    return car;
  }

  update(id: string, dto: UpdateCarDto) {
    const car = this.findOne(id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    Object.assign(car, dto);

    return car;
  }

  remove(id: string) {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1)
      throw new NotFoundException(`Car with id ${id} not found`);

    this.cars.splice(index, 1);

    return;
  }

  seedCars(cars: Car[]) {
    this.cars = cars;
  }
}
