import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { User } from 'src/authentication/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {

    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTask(filterDto, user);
    }

    async getOneTask(id: number, user: User): Promise<Task> {
        const found =  await this.taskRepository.findOne({where: {id, userId: user.id}});

        if (!found) { throw new NotFoundException(`Task with ID: ${id} not found`); }

        return found;
    }

    async createTask(createTasksDto: CreateTasksDto, user: User): Promise<Task>  {
        return this.taskRepository.createTask(createTasksDto, user);
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>  {
        const task = await this.getOneTask(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const deleted = await this.taskRepository.delete({id, userId: user.id});
        if (deleted.affected === 0) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
    }
}
