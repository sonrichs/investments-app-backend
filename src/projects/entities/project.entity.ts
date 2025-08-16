import { Investment } from '../../investments/entities/investment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  phase: number;

  @Column()
  currency: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToMany(() => Investment, (investment) => investment.project)
  investments: Investment[];
}
