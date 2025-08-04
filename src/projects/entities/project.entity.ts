import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  totalStocks: number;

  @Column()
  stockPrice: number;

  @Column()
  currency: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
