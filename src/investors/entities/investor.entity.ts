import { Investment } from '../../investments/entities/investment.entity';
import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Investor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  nationalId: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Investor with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Investor with id', this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log('Deleted Investor with id', this.id);
  }
}