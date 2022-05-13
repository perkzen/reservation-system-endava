import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDetailsDto } from './dto/userDetails.dto';
import { User } from './schemas/user.schema';
import { Errors } from '../utils/constants/errors';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUserDetails(user: UserDetailsDto) {
    const found = this.userRepository.findOne({ id: user.id });

    if (found) {
      throw new HttpException(
        Errors.USER_ALREADY_EXISTS,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    await this.userRepository.create(user);
  }

  async getUserDetails(id: string): Promise<User> {
    const found = this.userRepository.findOne({ id: id });

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.findOne({ id: id });
  }

  async updateUserDetails(user: UserDetailsDto) {
    const found = this.userRepository.findOne({ id: user.id });

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.findOneAndUpdate({ id: user.id }, user);
  }
}
