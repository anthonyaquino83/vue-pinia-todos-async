<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTodos } from "../setuptodos.js";

const todosStore = useTodos();
const { filter, filteredTodos } = storeToRefs(todosStore);

const newTodoText = ref("");

function addTodo() {
  if (!newTodoText.value) {
    return;
  }

  todosStore.addTodo(newTodoText.value);
  newTodoText.value = "";
}
</script>

<template>
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
</template>
