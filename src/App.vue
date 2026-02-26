<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { remult } from 'remult';
import { Task } from './shared/Task';

const taskRepository = remult.repo(Task);
const tasks = ref<Task[]>([]);
onMounted(() =>
  taskRepository
    .find({
      where: {
        completed: undefined, // Fetch all tasks regardless of completion status
      },
      orderBy: {
        title: 'asc', // Order by title, ascending
        createdAt: 'desc', // Order by createdAt, descending
      },
    })
    .then((items) => (tasks.value = items)),
);

const newTaskTitle = ref('');

const addTask = async () => {
  try {
    const newTask = await taskRepository.insert({
      title: newTaskTitle.value,
    });
    tasks.value.push(newTask);
    newTaskTitle.value = '';
  } catch (error: any) {
    alert(`Error adding task: ${error.message}`);
  }
};

const deleteTask = async (task: Task) => {
  try {
    await taskRepository.delete(task);
    tasks.value = tasks.value.filter((t) => t !== task);
  } catch (error: any) {
    alert(`Error deleting task: ${error.message}`);
  }
};

const saveTask = async (task: Task) => {
  try {
    await taskRepository.save(task);
  } catch (error: any) {
    alert(`Error saving task: ${error.message}`);
  }
};
</script>

<template>
  <h1>Todo List</h1>
  <main>
    <form @submit.prevent="($event) => addTask()">
      <input type="text" placeholder="New task" v-model="newTaskTitle" />
      <button>Add ToDo</button>
    </form>

    <h3 class="all-tasks">All Tasks ({{ tasks.length }})</h3>
    <div v-for="task in tasks">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="() => saveTask(task)"
      />
      {{ task.title }}
      <button @click="deleteTask(task)">Delete</button>
    </div>

    <h3 class="pending-tasks">
      Pending Tasks ({{ tasks.filter((task) => !task.completed).length }})
    </h3>
    <div v-for="task in tasks.filter((task) => !task.completed)">
      <input type="checkbox" v-model="task.completed" />
      {{ task.title }}
    </div>

    <h3 class="completed-tasks">
      Completed Tasks ({{ tasks.filter((task) => task.completed).length }})
    </h3>
    <div v-for="task in tasks.filter((task) => task.completed)">
      <input type="checkbox" v-model="task.completed" />
      {{ task.title }}
    </div>
  </main>
</template>
