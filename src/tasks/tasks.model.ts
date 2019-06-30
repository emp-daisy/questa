import { TaskStatus } from './tasks.enum';

interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
