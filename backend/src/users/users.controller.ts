import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'Add details about user' })
  @ApiPreconditionFailedResponse({ description: 'User already exits' })
  @Post()
  async userDetails(@Body() user: CreateUserDto) {
    return await this.usersService.createUserDetails(user);
  }

  @ApiOkResponse({ description: 'Retrieves user details ' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':userId')
  async getDetails(@Param('userId') userId: string) {
    return await this.usersService.getUserDetails(userId);
  }

  @ApiOkResponse({ description: 'Updates user details ' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Put(':userId')
  async updateDetails(
    @Body() user: UpdateUserDto,
    @Param('userId') userId: string,
  ) {
    return await this.usersService.updateUserDetails(user, userId);
  }
}
