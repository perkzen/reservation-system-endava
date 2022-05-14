import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Errors } from '../utils/constants/errors';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUserDetails(user: CreateUserDto) {
    const found = this.userRepository.findOne({ uid: user.uid });

    if (found) {
      throw new HttpException(
        Errors.USER_ALREADY_EXISTS,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    await this.userRepository.create(user);
  }

  async getUserDetails(id: string): Promise<User> {
    const found = this.userRepository.findOne({ uid: id });

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return found;
  }

  async updateUserDetails(user: UpdateUserDto, userId: string) {
    const found = await this.userRepository.findOneAndUpdate(
      { uid: userId },
      user,
    );

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
