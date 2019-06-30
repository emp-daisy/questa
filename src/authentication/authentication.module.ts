import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserRespository } from './user.repository';
import { JwtStrategy } from './passport/jwt.strategy';
import * as config from 'config';

const jwt = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwt.secret,
      signOptions: {
        expiresIn: jwt.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRespository]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticationModule {}
