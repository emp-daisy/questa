import {IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class LoginUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
