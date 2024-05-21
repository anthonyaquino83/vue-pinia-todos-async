<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTodos } from "../setupasynctodos.js";
import Spinner from "./Spinner.vue"; // Import the spinner component

const todosStore = useTodos();
const { filter, filteredTodos, loading, error } = storeToRefs(todosStore);

const newTodoText = ref("");

onMounted(async () => {
  await todosStore.getTodos();
  console.log(filteredTodos);
});

function addTodo() {
  if (!newTodoText.value) {
    return;
  }

  todosStore.addTodo(newTodoText.value);
  newTodoText.value = "";
}
</script>

<template>
  <!-- <div v-if="loading">Loading todos...</div> -->
  <Spinner v-if="loading" />

  <div v-if="error">{{ error }}</div>

  <div v-if="filteredTodos.length > 0">
    <div class="div">
      <label>Async Todos</label>
    </div>
    <label><input v-model="filter" type="radio" value="all" /> All</label>
    <label
      ><input v-model="filter" type="radio" value="finished" /> Finished</label
    >
    <label
      ><input v-model="filter" type="radio" value="unfinished" />
      Unfinished</label
    >
    <hr />

    <label>
      New Todo:
      <input v-model="newTodoText" type="text" @keypress.enter="addTodo" />
    </label>
    <button :disabled="!newTodoText" @click="addTodo">Add</button>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input v-model="todo.isFinished" type="checkbox" />
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>
