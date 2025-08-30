import { AbstractDto } from '../../common/dto/abstract.dto';
import { UsersEntity } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UsersDto extends AbstractDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  constructor(partial: UsersEntity) {
    super(partial);
    Object.assign(this, partial);
  }
}
