import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodolistService {
  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  create(title: string, user: User): Promise<Todo> {
    const newTodo = this.todoRepository.create({ title, user });
    return this.todoRepository.save(newTodo);
  }

  async findByUserId(userId: number): Promise<Todo[]> {
    const response = await this.todoRepository.find({
      where: { user: { id: userId } },
    });
    return response;
  }

  async updateStatusTodo(todoId: number) {
    const response = await this.todoRepository
      .createQueryBuilder()
      .update(Todo)
      .set({ isComplated: true })
      .where({ id: todoId })
      .execute();
    return response;
  }

  async deleteTodoByUser(todoId: number) {
    const response = await this.todoRepository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where({ id: todoId })
      .execute();

    return response;
  }
}
