import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { composeSlug } from '@/shared/utils';
import { Tag } from '@/modules/tags/entities/tag.entity';

@Entity()
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

  @ManyToMany(() => Tag, (tag) => tag.products, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];

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
