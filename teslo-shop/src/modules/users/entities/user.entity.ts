import { Product } from '@/modules/products/entities';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { uniq } from 'ramda';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', { select: false })
  hashedPassword: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  beforeInser() {
    const roles = this.roles ?? [];

    if (roles.length === 0) {
      this.roles = ['user'];
    } else {
      if (!roles.includes('user')) {
        this.roles.push('user');
      }
    }
    this.roles = uniq(roles);
  }
}
