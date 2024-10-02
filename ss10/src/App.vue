<template>
  <div>
    <div class="w-[80%] m-auto mt-4 h-[100vh]">
      <main class="main">
        <header class="d-flex justify-content-between mb-3">
          <h3>Nhân viên</h3>
          <button @click="openModal" class="btn btn-primary">
            Thêm mới nhân viên
          </button>
        </header>
        <div class="d-flex align-items-center justify-content-end gap-2 mb-3">
          <input
            @input="searchEmployees"
            style="width: 350px"
            type="text"
            class="form-control"
            placeholder="Tìm kiếm theo email"
          />
          <i
            class="fa-solid fa-arrows-rotate"
            title="Refresh"
            @click="refreshList"
          ></i>
        </div>
        <!-- Danh sách nhân viên -->
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th colspan="3">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="employee.id">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.date }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.address }}</td>
              <td>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div
                    class="status"
                    :class="{
                      'status-active': employee.active,
                      'status-stop': !employee.active,
                    }"
                  ></div>
                  <span>{{
                    employee.active ? "Đang hoạt động" : "Ngừng hoạt động"
                  }}</span>
                </div>
              </td>
              <td>
                <span
                  class="button"
                  :class="employee.active ? 'button-block' : 'button-unblock'"
                  @click="toggleBlockStatus(employee)"
                >
                  {{ employee.active ? "Chặn" : "Bỏ chặn" }}
                </span>
              </td>
              <td>
                <span class="button button-edit" @click="editEmployee(employee)"
                  >Sửa</span
                >
              </td>
              <td>
                <span
                  class="button button-delete"
                  @click="deleteEmployee(employee)"
                  >Xóa</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <footer class="d-flex justify-content-end align-items-center gap-3">
          <select class="form-select">
            <option :value="10">Hiển thị 10 bản ghi trên trang</option>
            <option :value="20">Hiển thị 20 bản ghi trên trang</option>
            <option :value="50">Hiển thị 50 bản ghi trên trang</option>
            <option :value="100">Hiển thị 100 bản ghi trên trang</option>
          </select>
          <ul class="pagination">
            <li><button>1</button></li>
            <li><button>2</button></li>
            <li><button>3</button></li>
          </ul>
        </footer>
      </main>
    </div>

    <!-- Form thêm mới/sửa nhân viên -->
    <div class="overlay" v-if="isModalOpen">
      <form class="form" @submit.prevent="submitForm">
        <div class="d-flex justify-content-between align-items-center">
          <h4>
            {{ isEditing ? "Sửa thông tin nhân viên" : "Thêm mới nhân viên" }}
          </h4>
          <i class="fa-solid fa-xmark" @click="closeModal"></i>
        </div>
        <div>
          <label class="form-label" for="userName">Họ và tên</label>
          <input
            id="userName"
            v-model="newEmployee.name"
            type="text"
            class="form-control"
          />
          <div class="form-text error" v-if="errors.name">
            Họ và tên không được để trống.
          </div>
        </div>
        <div>
          <label class="form-label" for="dateOfBirth">Ngày sinh</label>
          <input
            id="dateOfBirth"
            v-model="newEmployee.dob"
            type="date"
            class="form-control"
          />
          <div class="form-text error" v-if="errors.dob">
            Ngày sinh không được lớn hơn ngày hiện tại.
          </div>
        </div>
        <div>
          <label class="form-label" for="email">Email</label>
          <input
            id="email"
            v-model="newEmployee.email"
            type="text"
            class="form-control"
          />
          <div class="form-text error" v-if="errors.email">
            Email không được để trống hoặc sai định dạng.
          </div>
        </div>
        <div>
          <label class="form-label" for="address">Địa chỉ</label>
          <textarea
            class="form-control"
            id="address"
            v-model="newEmployee.address"
            rows="3"
          ></textarea>
        </div>
        <div>
          <button class="w-100 btn btn-primary">
            {{ isEditing ? "Cập nhật" : "Thêm mới" }}
          </button>
        </div>
      </form>
    </div>

    <!-- Modal xác nhận chặn/bỏ chặn tài khoản -->
    <div class="overlay" v-if="showBlockModal">
      <div class="modal-custom">
        <div class="modal-title">
          <h4>Cảnh báo</h4>
          <i class="fa-solid fa-xmark" @click="closeBlockModal"></i>
        </div>
        <div class="modal-body-custom">
          <span
            >Bạn có chắc chắn muốn
            {{ selectedEmployee.active ? "chặn" : "bỏ chặn" }} tài khoản
            này?</span
          >
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-light" @click="closeBlockModal">Hủy</button>
          <button class="btn btn-danger" @click="confirmBlockAction">
            Xác nhận
          </button>
        </div>
      </div>
    </div>

    <!-- Modal xác nhận xóa tài khoản -->
    <div class="overlay" v-if="showDeleteModal">
      <div class="modal-custom">
        <div class="modal-title">
          <h4>Cảnh báo</h4>
          <i class="fa-solid fa-xmark" @click="closeDeleteModal"></i>
        </div>
        <div class="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-light" @click="closeDeleteModal">Hủy</button>
          <button class="btn btn-danger" @click="confirmDelete">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const employees = ref([]);
const isModalOpen = ref(false);
const newEmployee = ref({
  id: null,
  name: "",
  dob: "",
  email: "",
  address: "",
  active: true,
});
const errors = ref({
  name: false,
  dob: false,
  email: false,
});
const isEditing = ref(false);
const showBlockModal = ref(false);
const showDeleteModal = ref(false);
const selectedEmployee = ref(null);

const getEmployeesFromLocalStorage = () => {
  const storedEmployees = localStorage.getItem("employees");
  if (storedEmployees) {
    employees.value = JSON.parse(storedEmployees);
  }
};
getEmployeesFromLocalStorage();

const openModal = () => {
  isModalOpen.value = true;
  isEditing.value = false;
  resetForm();
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  newEmployee.value = {
    id: null,
    name: "",
    dob: "",
    email: "",
    address: "",
    active: true,
  };
  errors.value = {
    name: false,
    dob: false,
    email: false,
  };
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = () => {
  errors.value.name = !newEmployee.value.name;
  errors.value.dob =
    !newEmployee.value.dob || new Date(newEmployee.value.dob) > new Date();
  errors.value.email = !validateEmail(newEmployee.value.email);

  if (!errors.value.name && !errors.value.dob && !errors.value.email) {
    if (isEditing.value) {
      const index = employees.value.findIndex(
        (emp) => emp.id === newEmployee.value.id
      );
      if (index !== -1) {
        employees.value[index] = { ...newEmployee.value };
      }
    } else {
      const newId = employees.value.length
        ? Math.max(...employees.value.map((e) => e.id)) + 1
        : 1;
      employees.value.push({
        ...newEmployee.value,
        id: newId,
        active: true,
      });
    }

    localStorage.setItem("employees", JSON.stringify(employees.value));

    closeModal();
  }
};

const toggleBlockStatus = (employee) => {
  selectedEmployee.value = employee;
  showBlockModal.value = true;
};

const confirmBlockAction = () => {
  const index = employees.value.findIndex(
    (emp) => emp.id === selectedEmployee.value.id
  );
  if (index !== -1) {
    employees.value[index].active = !employees.value[index].active;
    localStorage.setItem("employees", JSON.stringify(employees.value));
  }
  closeBlockModal();
};

// Function to close block modal
const closeBlockModal = () => {
  showBlockModal.value = false;
  selectedEmployee.value = null;
};

const deleteEmployee = (employee) => {
  selectedEmployee.value = employee;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  employees.value = employees.value.filter(
    (emp) => emp.id !== selectedEmployee.value.id
  );
  localStorage.setItem("employees", JSON.stringify(employees.value));
  closeDeleteModal();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedEmployee.value = null;
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  font-family: sans-serif;
}

.main {
  /* height: 100vh; */
  margin: 50px 100px;
}

.fa-arrows-rotate {
  font-size: 20px;
  cursor: pointer;
  color: gray;
}

.fa-arrows-rotate:hover {
  color: rgb(184, 180, 180);
  transform: rotate(20deg);
  transition: all 0.5s linear;
}

.button {
  padding: 4px 12px;
  line-height: 30px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.button-edit {
  background-color: orange;
}

.button-delete {
  background-color: red;
}

.button-block {
  background-color: green;
}

td:first-child,
td:nth-child(6),
td:nth-child(7) {
  text-align: center;
}

.form-select {
  width: 270px !important;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  background-color: #fff;
  width: 500px;
  padding: 20px 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-label {
  font-weight: 600;
  margin-bottom: 8px;
}

.fa-xmark {
  font-size: 20px;
  cursor: pointer;
}

.error {
  color: red !important;
}

.status-container {
  border: 1px solid #dadada;
  padding: 4px 8px;
  border-radius: 4px;
}

.status {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid transparent;
}

.status-active {
  background-color: green;
}

.status-stop {
  background-color: red;
}

.modal-custom {
  background-color: #fff;
  padding: 20px 24px;
  border-radius: 4px;
  width: 400px;
}

.modal-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body-custom {
  padding: 20px 0;
}

.modal-footer-custom {
  display: flex;
  justify-content: end;
  gap: 8px;
}

.pagination {
  margin-bottom: 0;
}
</style>
