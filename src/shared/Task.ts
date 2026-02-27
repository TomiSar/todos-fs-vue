import { Entity, Fields, Validators } from 'remult';

@Entity('tasks', { allowApiCrud: true })
export class Task {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({
    validate: (task) => {
      if (!task.title || task.title.trim().length === 0) {
        throw new Error('Title is required');
      }
      if (task.title.length < 3) {
        throw new Error('Title must be at least 3 characters long');
      }
    },
  })
  title = '';

  @Fields.boolean()
  completed = false;

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();
}
