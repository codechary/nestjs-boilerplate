import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength} from "class-validator";

export class LoginPayloadDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MaxLength(256)
    password: string;
}
