import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  sum: number;

  @Column()
  source: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}

