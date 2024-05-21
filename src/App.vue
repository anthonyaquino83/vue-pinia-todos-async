<script setup>
import AsyncTodos from "./components/AsyncTodos.vue";
import Todos from "./components/Todos.vue";
</script>

<!-- json-server -w ./src/data/db.json  -->
<template>
  <!-- <Todos /> -->
  <AsyncTodos />
</template>

<style scoped></style>
