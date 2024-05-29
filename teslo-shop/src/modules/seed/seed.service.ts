import { Injectable } from '@nestjs/common';
import { ProductsService } from '@/modules/products/products.service';
import { initialData } from '@/modules/seed/seeders/seed.seeder';
import { TagsService } from '@/modules/tags/tags.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly tagsService: TagsService,
  ) {}

  async seed() {
    await this.seedNewProducts();

    return 'Seeded!';
  }

  async seedNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const tags = products.reduce((acc, product) => {
      return [...acc, ...product.tags];
    }, []);

    await this.tagsService.findManyOrCreate(tags);

    await Promise.all(
      products.map((product) => {
        return this.productsService.create(product);
      }),
    );

    return true;
  }
}
