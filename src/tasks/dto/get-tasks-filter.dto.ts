import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskStatus } from '../tasks.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @Transform(value => value.toUpperCase())
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
