<template>
  <div>
    <h1>B6</h1>
    <input v-model="data" type="checkbox" value="đá bóng" />Đá bóng
    <input v-model="data" type="checkbox" value="bóng chuyền" />Bóng chuyền
    <input v-model="data" type="checkbox" value="code" />Code
    <input v-model="data" type="checkbox" value="bơi lội" />Bơi lội
    <p>Giá trị: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref([]);
</script>

<style></style>
