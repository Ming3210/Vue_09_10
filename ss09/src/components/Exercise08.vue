<template>
  <div>
    <h1>B8</h1>
    <div class="product-form">
      <h2>Thêm mới tài khoản</h2>
      <form>
        <div class="form-group">
          <label for="productCode">Họ và tên</label>
          <input
            v-model="data.name"
            type="text"
            id="productCode"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label for="productName">Email</label>
          <input
            v-model="data.email"
            type="text"
            id="productName"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label for="price">Mật khẩu</label>
          <input v-model="data.pass" type="number" id="price" placeholder="" />
        </div>

        <div class="form-group">
          <label for="quantity">Nhập lại mật khẩu</label>
          <input v-model="data.repass" type="number" id="" value="" />
        </div>

        <button @click="log" type="submit" class="btn-submit">Đưng kí</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref({
  name: "",
  email: "",
  pass: "",
  repass: "",
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
