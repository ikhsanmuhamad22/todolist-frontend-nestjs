import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todoService: TodolistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body('title') title: string, @Req() req) {
    return this.todoService.create(title, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUserId(@Req() req) {
    return this.todoService.findByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateStatusTodo(@Param('id') id: number) {
    return this.todoService.updateStatusTodo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodoByUser(id);
  }
}
