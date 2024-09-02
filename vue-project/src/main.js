import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import ConvertPage from "./components/ConvertPage.vue"; // Import ConvertPage

const routes = [
  { path: "/convert", component: ConvertPage }, // Add route for ConvertPage
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
