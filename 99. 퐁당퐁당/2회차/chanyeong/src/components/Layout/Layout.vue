<template>
  <header>simple todo list</header>
  <div>total todo count: {{ todos.length }}</div>
  <section><slot /></section>
</template>

<script>
import { useStore } from "@nanostores/vue";

import { $todos } from "../../stores/todos.store.ts";

const todos = useStore($todos);

export default {
  setup() {
    return {
      todos,
    };
  },
};
</script>

<style scoped>
header {
  font-size: 18px;
  font-weight: 800;
}

section {
  padding: 12px 0;
}
</style>
