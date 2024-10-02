<template>
  <div>
    <h1>B9</h1>
    <div class="product-form">
      <h2>Đăng kí tài khoản</h2>
      <form>
        <div class="form-group">
          <label for="productCode">Tên sinh viên</label>
          <input
            v-model="data.name"
            type="text"
            id="productCode"
            placeholder=""
          />
          <p v-if="error.name" class="error-message">{{ error.name }}</p>
        </div>

        <div class="form-group">
          <label for="productName">Email</label>
          <input
            v-model="data.email"
            type="text"
            id="productName"
            placeholder=""
          />
          <p v-if="error.email" class="error-message">{{ error.email }}</p>
          <p v-if="error.emailDuplicate" class="error-message">
            {{ error.emailDuplicate }}
          </p>
        </div>

        <div class="form-group">
          <label for="price">Mật khẩu</label>
          <input
            v-model="data.pass"
            type="password"
            id="price"
            placeholder=""
          />
          <p v-if="error.pass" class="error-message">{{ error.pass }}</p>
        </div>

        <div class="form-group">
          <label for="quantity">Số điện thoại</label>
          <input v-model="data.phoneNum" type="number" id="" value="" />
          <p v-if="error.phoneNum" class="error-message">
            {{ error.phoneNum }}
          </p>
        </div>

        <button @click="save" type="submit" class="btn-submit">Đăng kí</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const students = ref([]);

const takeData = () => {
  const saveStudents = localStorage.getItem("students");
  if (saveStudents) {
    const parsedStudent = JSON.parse(saveStudents);
    students.value = parsedStudent;
  }
};

takeData();

const data = ref({
  name: "",
  email: "",
  pass: "",
  phoneNum: "",
});

const error = ref({
  name: "",
  email: "",
  emailDuplicate: "",
  pass: "",
  phoneNum: "",
});

const validation = () => {
  error.value = {
    name: "",
    email: "",
    pass: "",
    phoneNum: "",
  };

  let isValid = true;

  if (data.value.name === "") {
    error.value.name = "Tên sinh viên không được để trống";
    isValid = false;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.value.email)) {
    error.value.email = "Email không hợp lệ";
    isValid = false;
  }
  const emailDuplicate = students.value.find((e) => {
    e.email == data.value.email;
    return true;
  });

  console.log(111111, emailDuplicate);

  if (emailDuplicate) {
    error.value.emailDuplicate = "Email đã tồn tại";
    isValid = false;
  }

  if (data.value.pass === "") {
    error.value.pass = "Mật khẩu không được để trống";
    isValid = false;
  }
  if (data.value.phoneNum === "") {
    error.value.phoneNum = "Số điện thoại không được để trống";
    isValid = false;
  }

  return isValid;
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem("students", JSON.stringify(students.value));
};

const save = (e) => {
  e.preventDefault();
  if (validation()) {
    students.value.push({ ...data.value });
    console.log(students);
    saveTasksToLocalStorage();
  }
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
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
