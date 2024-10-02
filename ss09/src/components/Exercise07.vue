<template>
  <div>
    <h1>B7</h1>
    <div class="product-form">
      <h2>Thêm mới sản phẩm</h2>
      <form>
        <div class="form-group">
          <label for="productCode">Mã sản phẩm</label>
          <input
            v-model="data.id"
            type="text"
            id="productCode"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label for="productName">Tên sản phẩm</label>
          <input
            v-model="data.name"
            type="text"
            id="productName"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label for="price">Giá</label>
          <input v-model="data.price" type="number" id="price" placeholder="" />
        </div>

        <div class="form-group">
          <label for="quantity">Số lượng</label>
          <input v-model="data.quantity" type="number" id="" value="" />
        </div>

        <button @click="log" type="submit" class="btn-submit">Thêm mới</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref({
  id: "",
  name: "",
  price: "",
  quantity: "",
});
const log = (e) => {
  e.preventDefault();
  console.log(data.value);
};
</script>

<style scoped>
input {
  width: 100%;

  margin: 8px 0;
  box-sizing: border-box;
}
label {
  display: block;
  width: 150px;
}
.product-form {
  padding: 20px;
  border: 1px solid gray;
  width: 300px;
  height: auto;
}
form {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.btn-submit {
  background-color: blue;
  color: white;
  width: 100%;
}
</style>
