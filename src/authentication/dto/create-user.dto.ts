import {IsNotEmpty, MinLength, MaxLength, Matches} from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
        message: 'Password too weak. Aleast six characters with one uppercase, one lowercase and one digit is required!',
    })
    password: string;
}
