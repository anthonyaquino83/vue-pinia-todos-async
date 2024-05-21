import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useTodos = defineStore("todos", () => {
  const todos = reactive([]);
  const filter = ref("all");
  const nextId = ref(0);
  const loading = ref(false);
  const error = ref("");

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

  async function getTodos() {
    loading.value = true;
    try {
      // throw "Error getting todos";
      const res = await fetch("http://localhost:3000/todos");
      const data = await res.json();
      setTimeout(() => {
        todos.push(...data);
        loading.value = false;
      }, 2000);
    } catch (e) {
      console.log(e);
      error.value = e;
      loading.value = false;
    }
  }

  function addTodo(text) {
    todos.push({ text, id: nextId.value++, isFinished: false });
  }

  return {
    error,
    loading,
    todos,
    filter,
    nextId,
    filteredTodos,
    finishedTodos,
    unfinishedTodos,
    getTodos,
    addTodo,
  };
});
