import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDetailsDto } from './dto/userDetails.dto';
import { User } from './schemas/user.schema';
import { Errors } from '../utils/constants/errors';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUserDetails(user: UserDetailsDto) {
    const found = this.userRepository.findOne({ userId: user.userId });

    if (found) {
      throw new HttpException(
        Errors.USER_ALREADY_EXISTS,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    await this.userRepository.create(user);
  }

  async getUserDetails(id: string): Promise<User> {
    const found = this.userRepository.findOne({ userId: id });

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return found;
  }

  async updateUserDetails(user: UserDetailsDto) {
    const found = await this.userRepository.findOneAndUpdate(
      { userId: user.userId },
      user,
    );

    if (!found) {
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
