<template>
  <div>
    <h1>B2</h1>
    <input v-model="data" type="color" />
    <p>Giá trị {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref("#ffffff");
</script>

<style></style>
