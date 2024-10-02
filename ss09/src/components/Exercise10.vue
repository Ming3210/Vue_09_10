<template>
  <div>
    <h1>B10</h1>
    <div class="product-form">
      <h2>Đăng nhập tài khoản</h2>
      <form>
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

        <button @click="save" type="submit" class="btn-submit">
          Đăng nhập
        </button>
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
  email: "",
  pass: "",
});

const error = ref({
  email: "",
  pass: "",
});

const validation = () => {
  error.value = {
    email: "",
    pass: "",
  };

  let isValid = true;

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.value.email)) {
    error.value.email = "Email không hợp lệ";
    isValid = false;
  }

  if (data.value.pass === "") {
    error.value.pass = "Mật khẩu không được để trống";
    isValid = false;
  }
  const user = students.value.find((student) => {
    return student.email === data.value.email;
  });
  console.log(user);

  if (data.value.pass != user.pass || data.value.email != user.email) {
    error.value.email = "Email hoặc mật khẩu không đúng";
    error.value.pass = "Email hoặc mật khẩu không đúng";
    isValid = false;
  }

  return isValid;
};

const save = (e) => {
  e.preventDefault();
  if (validation()) {
    students.value.push({ ...data.value });
    alert("Success");
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
