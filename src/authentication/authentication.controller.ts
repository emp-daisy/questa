import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.authService.signup(createUserDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return this.authService.signin(loginUserDto);
    }

}
