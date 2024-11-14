import { Injectable, NotFoundException } from '@nestjs/common';
import { userDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: userDTO[] = [];

  findAll() {
    return this.users;
  }

  findById(id: number): userDTO | undefined {
    const user = this.users.find((u) => u.id === id);
    console.log('==> user', this.users);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string): userDTO | undefined {
    const findByEmail = this.users.find((u) => u.email === email);
    if (!email) {
      throw new NotFoundException('email not found');
    }
    return findByEmail;
  }

  create(createUserDTO: userDTO) {
    const newUser = { id: Date.now(), ...createUserDTO };
    this.users.push(newUser);
    console.log('User added:', newUser); // Log user yang ditambahkan
    console.log('All users:', this.users);
    return newUser;
  }
}
