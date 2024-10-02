<template>
  <div>
    <h1>B1</h1>
    <input v-model="data" type="text" />
    <p>Giá trị {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref("");
</script>

<style></style>
