import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRespository } from '../user.repository';
import { User } from '../user.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET ||  config.get('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user = await this.userRespository.findOne({username});
        if (!user) {
            throw new UnauthorizedException('You are currently not authorized to view this content!');
        }
        return user;
    }
}
