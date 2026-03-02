import dotenv from 'dotenv';
dotenv.config();

import { remultApi } from 'remult/remult-express';
import { Task } from '../shared/task';
import { TasksController } from '../shared/taskController';
import { createKnexDataProvider } from 'remult/remult-knex';

export const api = remultApi({
  entities: [Task],
  controllers: [TasksController],
  getUser: (req) => req.session!['user'],
  admin: true, // Enable the Admin UI
  dataProvider: createKnexDataProvider({
    client: 'mysql2',
    connection: {
      host: process.env['DB_HOST'],
      database: process.env['DB_NAME'],
      user: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
    },
  }),
});
