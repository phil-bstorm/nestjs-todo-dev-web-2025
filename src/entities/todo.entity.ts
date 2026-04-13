import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;
}
