import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authServie: AuthService) {}

  @Post('register')
  async register(@Body() userData: Partial<User>) {
    return this.authServie.register(userData);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authServie.login(email, password);
  }
}
