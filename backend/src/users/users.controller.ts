import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized access.',
})
@ApiSecurity('Authorization')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'Add details about user' })
  @ApiPreconditionFailedResponse({ description: 'User already exits' })
  @UseGuards(AuthGuard)
  @Post()
  async createDetails(@Body() user: CreateUserDto) {
    return await this.usersService.createUserDetails(user);
  }

  @ApiOkResponse({ description: 'Retrieves user details ' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(AuthGuard)
  @Get()
  async getDetails(@User('uid') userId: string) {
    return await this.usersService.getUserDetails(userId);
  }

  @ApiOkResponse({ description: 'Updates user details ' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(AuthGuard)
  @Patch()
  async updateDetails(
    @Body() user: UpdateUserDto,
    @User('uid') userId: string,
  ) {
    return await this.usersService.updateUserDetails(user, userId);
  }
}
