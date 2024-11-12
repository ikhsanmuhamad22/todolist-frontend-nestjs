import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServie: AuthService) {}

  @UseGuards(jwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post()
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authServie.register(name, email, password);
  }

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authServie.login(email, password);
  }
}
