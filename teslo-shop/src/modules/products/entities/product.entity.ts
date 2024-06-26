import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { composeSlug } from '@/shared/utils';
import { Tag } from '@/modules/tags/entities/tag.entity';
import { Image } from '@/modules/images/entities/image.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.products, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'products_tags' })
  tags: Tag[];

  @OneToMany(() => Image, (image) => image.product, {
    eager: true,
    cascade: true,
  })
  images?: Image[];

  @BeforeInsert()
  createSlug() {
    this.setSlug();
  }

  @BeforeUpdate()
  updateSlug() {
    this.setSlug();
  }

  private setSlug() {
    this.slug = composeSlug(this.slug ?? this.title);
  }
}
