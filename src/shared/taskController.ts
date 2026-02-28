import { Allow, BackendMethod, remult } from 'remult';
import { Task } from './task';

export class TasksController {
  @BackendMethod({ allowed: Allow.authenticated })
  static async setAllTaskCompleted(completed: boolean) {
    const taskRepository = remult.repo(Task);
    const tasks = await taskRepository.find();
    for (const task of tasks) {
      task.completed = completed;
      await taskRepository.save(task);
    }
  }
}
