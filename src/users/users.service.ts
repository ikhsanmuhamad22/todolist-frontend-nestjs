import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  async create(userData: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findById(id: number): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('email not found');
    }
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('email not found');
    }
    return user;
  }
}
