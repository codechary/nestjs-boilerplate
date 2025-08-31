import {BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDto } from './users.dto';
import {LoginPayloadDto} from "./dtos/login-payload.dto";

@Controller('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  getUser(
      @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.findOne(id)
  }

  @Post('register')
  createUser(@Body() payload: Partial<UsersDto>) {
    const mandatoryFields = ['firstName', 'lastName', 'email', 'password'];
    const missingFields = mandatoryFields.filter((field) => !payload[field]);
    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing mandatory fields: ${missingFields.join(', ')}`,
      );
    }
    return this.userService.createUser(payload);
  }

  @Post(':userId/update')
  async updateUser(
      @Param('userId', ParseUUIDPipe) userId: string,
      @Body() payload: Partial<UsersDto>
  ) {
    const existingUser = await  this.userService.findOne(userId);
    if (!existingUser) {
      throw new BadRequestException(`User with ID ${userId} does not exist`);
    }
    const updateFields = ['firstName', 'lastName'];
    const missingUpdateFields = updateFields.filter((field) => !payload[field]);
    if (missingUpdateFields.length > 0) {
      throw new BadRequestException(
          `At least one of the fields must be provided for update: ${updateFields.join(', ')}`
      );
    }
    await this.userService.repository.update(
        userId,
        { firstName: payload.firstName || existingUser.firstName, lastName: payload.lastName || existingUser.lastName },
    )
    return {
        ...existingUser,
        ...payload,
    }
  }

  @Post('login')
    async login(@Body() payload: LoginPayloadDto) {
        return this.userService.login(payload);
    }
}
