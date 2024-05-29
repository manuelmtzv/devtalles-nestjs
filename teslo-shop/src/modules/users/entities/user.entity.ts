import { Product } from '@/modules/products/entities';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { uniq } from 'ramda';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: '91d1c122-c7d5-4118-8a29-32a1b0cd0ae9',
    description: 'The unique identifier of the user',
    uniqueItems: true,
  })
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
