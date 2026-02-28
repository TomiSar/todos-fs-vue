<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { remult } from 'remult';
import { Task } from './shared/task';
import { TasksController } from './shared/TaskController';

const tasks = ref<Task[]>([]);
const taskRepository = remult.repo(Task);
onMounted(() =>
  onMounted(
    taskRepository
      .liveQuery({
        where: {
          completed: undefined, // Fetch all tasks
        },
        orderBy: {
          completed: 'asc', // Order by completed, ascending
          title: 'asc', // Order by title, ascending
        },
      })
      .subscribe((info) => (tasks.value = info.applyChanges(tasks.value))),
  ),
);

const newTaskTitle = ref('');
declare function alert(message?: string): void;

const addTask = async () => {
  try {
    const newTask = await taskRepository.insert({
      title: newTaskTitle.value,
    });
    newTaskTitle.value = '';
  } catch (error: unknown) {
    alert((error as { message: string }).message);
  }
};

const deleteTask = async (task: Task) => {
  try {
    await taskRepository.delete(task.id);
  } catch (error: unknown) {
    alert((error as { message: string }).message);
  }
};

const saveTask = async (task: Task) => {
  try {
    await taskRepository.save(task);
  } catch (error: unknown) {
    alert((error as { message: string }).message);
  }
};

const setAllTaskCompleted = async (completed: boolean) => {
  await TasksController.setAllTaskCompleted(completed);
};
</script>

<template>
  <h1>Todo List</h1>
  <main>
    <form @submit.prevent="() => addTask()">
      <input type="text" placeholder="New task" v-model="newTaskTitle" />
      <button>Add ToDo</button>
    </form>
    <h3 class="all-tasks">All Tasks ({{ tasks.length }})</h3>
    <div v-for="task in tasks" :key="task.id">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="saveTask(task)"
      />
      <input class="task-title" v-model="task.title" />
      <button class="save-task" @click="saveTask(task)">Save</button>
      <button class="delete-task" @click="deleteTask(task)">Delete</button>
    </div>
    <div>
      <button @click="setAllTaskCompleted(false)">Set all uncompleted</button>
      <button @click="setAllTaskCompleted(true)">Set all completed</button>
    </div>
    <h3 class="pending-tasks">
      Pending Tasks ({{ tasks.filter((task) => !task.completed).length }})
    </h3>
    <div v-for="task in tasks.filter((task) => !task.completed)" :key="task.id">
      <input type="checkbox" v-model="task.completed" />
      {{ task.title }}
    </div>
    <h3 class="completed-tasks">
      Completed Tasks ({{ tasks.filter((task) => task.completed).length }})
    </h3>
    <div v-for="task in tasks.filter((task) => task.completed)" :key="task.id">
      <input type="checkbox" v-model="task.completed" />
      {{ task.title }}
    </div>
  </main>
</template>
