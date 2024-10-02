<template>
  <div>
    <h1>B4</h1>
    <input v-model="data" type="range" min="0" max="10000000" />
    <p>Giá trị: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref(100);
</script>

<style></style>
