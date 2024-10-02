<template>
  <div>
    <input type="text" v-model="inputValue" />
    <p>Giá trị inputValue : {{ inputValue }}</p>
    <button @click="handleClick">click</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("Rikkei");

const handleClick = () => {
  inputValue.value = "PTIT";
};
</script>

<style></style>
