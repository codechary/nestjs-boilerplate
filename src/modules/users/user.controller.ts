import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDto } from './users.dto';

@Controller('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll()
  }

  @Post()
  createUser(@Body() payload: Partial<UsersDto>) {
    return this.userService.createUser(payload);
  }
}
