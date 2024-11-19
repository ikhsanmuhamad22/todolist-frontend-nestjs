import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
