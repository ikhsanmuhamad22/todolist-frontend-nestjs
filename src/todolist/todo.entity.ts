import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ default: false })
  isComplated: boolean;

  @ManyToOne(() => User, (user) => user.todos, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
