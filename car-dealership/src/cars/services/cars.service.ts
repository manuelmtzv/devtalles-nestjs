import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from '../dtos/create-car.dto';
import { UpdateCarDto } from '../dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: 2,
      brand: 'Audi',
      model: 'Q7',
    },
    {
      id: 3,
      brand: 'Mercedes',
      model: 'GLE',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(dto: CreateCarDto) {
    const id = this.cars.length + 1;
    const car = { id, ...dto };

    this.cars.push(car);

    return car;
  }

  update(id: number, dto: UpdateCarDto) {
    const car = this.findOne(id);

    Object.assign(car, dto);

    return car;
  }

  remove(id: number) {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1)
      throw new NotFoundException(`Car with id ${id} not found`);

    this.cars.splice(index, 1);

    return;
  }
}
