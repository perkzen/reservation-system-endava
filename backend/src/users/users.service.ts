import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(user: UserDto): Promise<User> {
    return this.userRepository.create(user);
  }
}
