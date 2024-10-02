<template>
  <div>
    <h1>B5</h1>
    <input v-model="data" type="radio" value="Nam" />Nam
    <input v-model="data" type="radio" value="Nữ" />Nữ
    <input v-model="data" type="radio" value="Khác" />Khác
    <p>Giá trị: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref("Nam");
</script>

<style></style>
