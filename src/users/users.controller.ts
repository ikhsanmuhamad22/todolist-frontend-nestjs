import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard) // Pastikan guard ini diterapkan
  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // req.user seharusnya berisi data user setelah autentikasi
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return id;
  }

  @Post()
  create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }
}
