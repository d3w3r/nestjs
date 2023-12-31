import {
  Length,
  IsEmail,
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  // OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Customer } from './../../customers/entities/customers.entity';
import { Order } from './../../orders/entities/orders.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'Unique identificator for the register' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({ description: 'Passphrase that represents the user of access' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column({ type: 'varchar', length: 255 })
  readonly nickname: string;

  // @Exclude()
  @ApiProperty({ description: 'Password for the user' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(6, 25)
  @Column({ type: 'varchar', length: 255 })
  readonly password: string;

  @ApiProperty({ description: 'Identification of the customer of the user' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int', nullable: true })
  @OneToOne(() => Customer, (customer) => customer.userId)
  @JoinColumn({ name: 'customer_id' })
  readonly customerId: number;

  @ManyToMany(() => Order, (order) => order.user)
  readonly order: number;
}
