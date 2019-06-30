import { Repository, EntityRepository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { TaskStatus } from './tasks.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/authentication/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');
    async createTask(createTasksDto: CreateTasksDto, user: User): Promise<Task>  {
        const {title, description} = createTasksDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
            delete task.user;
            return task;
        } catch (error) {
            this.logger.error(`Failed to create task for ${user.username}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status: status.toUpperCase() });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search:   `%${search}%` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for ${user.username}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
