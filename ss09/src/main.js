// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone, faTrash, faPen);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
