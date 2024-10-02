<template>
  <div>
    <h1>B11</h1>
    <div class="todo-app">
      <h2>Todo List</h2>

      <div class="input-section">
        <input v-model="newTask" type="text" placeholder="Enter your job" />
        <button class="btn" @click="addTask">Add Job</button>
      </div>
      <div class="err" v-if="blank !== ''">{{ blank }}</div>
      <ul>
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          :class="{ completed: task.status }"
        >
          <input
            type="checkbox"
            v-model="task.status"
            @change="saveTasksToLocalStorage"
          />
          <span>{{ task.name }}</span>
          <div class="div">
            <p>
              <font-awesome-icon :icon="['fas', 'pen']" />
            </p>
            <p class="p" @click="showDeleteModal(task, index)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </p>
          </div>
        </li>
      </ul>
      <p>
        Số công việc hoàn thành: {{ completedTasks }} / {{ tasks.length }} công
        việc
      </p>
    </div>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <p>Xác nhận</p>
        <p>
          Bạn có xác nhận xóa công việc <b>{{ taskToDelete.name }}</b> không?
        </p>
        <button @click="deleteTask(taskToDeleteIndex)">Đồng ý</button>
        <button @click="hideModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const newTask = ref("");
const tasks = ref([]);
const blank = ref("");
const isModalVisible = ref(false);
const taskToDelete = ref(null);
const taskToDeleteIndex = ref(null);

const getJob = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

getJob();

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const addTask = () => {
  if (newTask.value === "") {
    blank.value = "Tên công việc không được để trống";
    return;
  }

  const isDuplicate = tasks.value.some((task) => task.name === newTask.value);
  if (isDuplicate) {
    alert("Tên công việc đã tồn tại");
    return;
  }

  tasks.value.push({
    id: Math.ceil(Math.random() * 9999999),
    name: newTask.value,
    status: false,
  });

  newTask.value = "";
  blank.value = "";
  saveTasksToLocalStorage();
};

const showDeleteModal = (task, index) => {
  taskToDelete.value = task;
  taskToDeleteIndex.value = index;
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
  taskToDelete.value = null;
  taskToDeleteIndex.value = null;
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  saveTasksToLocalStorage();
  hideModal();
};

const completedTasks = computed(
  () => tasks.value.filter((task) => task.status).length
);

watch(newTask, (newValue) => {
  if (newValue === "") {
    blank.value = "Tên công việc không được để trống";
  } else {
    blank.value = "";
  }
});
</script>

<style scoped>
.err {
  color: red;
}
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.input-section {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.div {
  display: flex;
  gap: 20px;
}
li span {
  flex: 1;
}

li.completed span {
  text-decoration: line-through;
}

.p:hover {
  cursor: pointer;
}
.p {
  color: red;
}

/* CSS cho Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.modal-content button:hover {
  background-color: #0056b3;
}
</style>
