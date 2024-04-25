import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @Column('text', {
    nullable: true,
  })
  alt?: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
