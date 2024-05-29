import { Injectable } from '@nestjs/common';
import { ProductsService } from '@/modules/products/products.service';
import { productsInitialData, usersInitialData } from '@/modules/seed/seeders';
import { TagsService } from '@/modules/tags/tags.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    await this.deleteTables();

    const users = await this.seedNewUsers();
    await this.seedNewProducts(users);

    return 'Seeded!';
  }

  private async seedNewUsers() {
    const result = await Promise.all(
      usersInitialData.map((user) => {
        return this.usersService.create(user);
      }),
    );

    return result;
  }

  private async seedNewProducts(users: User[]) {
    const products = productsInitialData;

    const tags = products.reduce((acc, product) => {
      return [...acc, ...product.tags];
    }, []);

    await this.tagsService.findManyOrCreate(tags);

    const result = await Promise.all(
      products.map((product) => {
        const randomIndex = Math.floor(Math.random() * users.length);

        return this.productsService.create(users.at(randomIndex), product);
      }),
    );

    return result;
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    await this.tagsService.deleteAllTags();
    await this.usersService.deleteAllUsers();
  }
}
