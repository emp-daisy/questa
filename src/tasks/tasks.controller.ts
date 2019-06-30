import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.enum';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import {User} from './../authentication/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../authentication/decorator/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        this.logger.verbose(`Getting all task for user ${user.username} using ${JSON.stringify(filterDto)} filters`);
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getOneTasks(
        @Param('id', ParseIntPipe ) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getOneTask(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(
        @Body() createTasksDto: CreateTasksDto,
        @GetUser() user: User,
    ): Promise<Task>  {
        this.logger.verbose(`Creating a task for user ${user.username} using ${JSON.stringify(createTasksDto)} payload`);
        return this.tasksService.createTask(createTasksDto, user);
    }

    @Patch('/:id/status')
    updateTasks(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidation) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Delete('/:id')
    deleteTasks(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }
}
