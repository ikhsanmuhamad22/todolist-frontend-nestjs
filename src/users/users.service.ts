import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return user;
  }

  create(createUserDTO: createUserDTO) {
    const newUser = { id: Date.now(), ...createUserDTO };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDTO: createUserDTO) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('user not found');
    }
    const updateUser = { ...this.users[userIndex], ...updateUserDTO };
    this.users[userIndex] = updateUser;
    return 'User has benn update';
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('user not found');
    }
    this.users.splice(userIndex, 1);
    return 'User has been deleted';
  }
}
