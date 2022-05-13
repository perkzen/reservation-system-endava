import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDetailsDto } from './dto/userDetails.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'Add details about user' })
  @ApiPreconditionFailedResponse({ description: 'User already exits' })
  @Post()
  async userDetails(@Body() user: UserDetailsDto) {
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
  @Put()
  async updateDetails(@Body() user: UserDetailsDto) {
    return await this.usersService.updateUserDetails(user);
  }
}
