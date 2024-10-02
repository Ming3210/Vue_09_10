<template>
  <div>
    <h1>B3</h1>
    <input v-model="data" type="date" />
    <p>Ngày Sinh: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref("");
</script>

<style></style>
