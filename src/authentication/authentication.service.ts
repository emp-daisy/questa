import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRespository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './passport/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
    private logger = new Logger('UserService');
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        this.logger.verbose(`Creating user ${createUserDto.username}`);
        return this.userRespository.signup(createUserDto);
    }

    async signin(loginUserDto: LoginUserDto): Promise<{token: string}> {
        const username = await this.userRespository.signin(loginUserDto);
        if (!username) {
            throw new UnauthorizedException('Invalid username or password!');
        }

        const payload: JwtPayload = { username};
        const token = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT token with payload ${payload}`);
        return {token};
    }
}
