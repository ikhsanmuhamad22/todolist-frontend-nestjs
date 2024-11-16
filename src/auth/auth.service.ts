import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: Partial<User>) {
    return this.userService.create(userData);
  }

  async login(email: string, password: string) {
    const user = this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, (await user).password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: (await user).id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
