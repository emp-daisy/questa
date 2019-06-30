import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
