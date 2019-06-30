import { PipeTransform, BadRequestException } from '@nestjs/common';
import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';
import { TaskStatus } from '../tasks.enum';

export class TaskStatusValidation implements PipeTransform {
    readonly allowedStatues = [ TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

    transform(value: string) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException('Invalid status value passed');
        }

        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatues.indexOf(status) > -1;
    }
}
