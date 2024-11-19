import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
