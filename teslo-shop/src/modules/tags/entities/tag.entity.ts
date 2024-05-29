import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@/modules/products/entities/product.entity';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}
