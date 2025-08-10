import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stocksAmount: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Column()
  investedAt: Date;

  @Column()
  exitedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Project, (project) => project.investments)
  project: Project;

  @ManyToOne(() => User, (user) => user.investments)
  user: User;
}
