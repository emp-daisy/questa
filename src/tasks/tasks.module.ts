import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthenticationModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
