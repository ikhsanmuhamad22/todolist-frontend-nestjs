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
import { userDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @Post()
  create(@Body() createUserDTO: userDTO) {
    return this.userService.create(createUserDTO);
  }
}
