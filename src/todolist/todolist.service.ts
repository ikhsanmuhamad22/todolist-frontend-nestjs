import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodolistService {
  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  async create(title: string, user: User): Promise<Todo> {
    const newTodo = this.todoRepository.create({ title, user });
    return this.todoRepository.save(newTodo);
  }
}
