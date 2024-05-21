import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useTodos = defineStore("todos", () => {
  const todos = reactive([]);
  const filter = ref("all");
  const nextId = ref(0);

  const finishedTodos = computed(() => {
    return todos.filter((todo) => todo.isFinished);
  });

  const unfinishedTodos = computed(() => {
    return todos.filter((todo) => !todo.isFinished);
  });

  const filteredTodos = computed(() => {
    if (filter.value == "finished") {
      return finishedTodos.value;
    } else if (filter.value == "unfinished") {
      return unfinishedTodos.value;
    }
    return todos;
  });

  function addTodo(text) {
    todos.push({ text, id: nextId.value++, isFinished: false });
  }

  return {
    todos,
    filter,
    nextId,
    filteredTodos,
    finishedTodos,
    unfinishedTodos,
    addTodo,
  };
});
