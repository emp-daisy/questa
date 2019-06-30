import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
    async signup(createUserDto: CreateUserDto): Promise<void> {
        const {username, password} = createUserDto;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            if (parseInt(error.code, 10) === 23505) {
                throw new ConflictException('Username already in-use');
             }
            throw new InternalServerErrorException();
        }
    }

    async signin(loginUserDto: LoginUserDto): Promise<string> {
        const {username, password} = loginUserDto;
        const user = await this.findOne({username});
        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
       return bcrypt.hash(password, salt);
    }
}
