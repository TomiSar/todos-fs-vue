import { remultApi } from 'remult/remult-express';
import { Task } from '../shared/task';
import { TasksController } from '../shared/TaskController';

export const api = remultApi({
  entities: [Task],
  controllers: [TasksController],
  getUser: (req) => req.session!['user'],
  admin: true, // Enable the Admin UI
});
