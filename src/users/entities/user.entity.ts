import { Investment } from 'src/investments/entities/investment.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Investment, (investment) => investment.user)
  investments: Investment[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log('Deleted User with id', this.id);
  }
}
