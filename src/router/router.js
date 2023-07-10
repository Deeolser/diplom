import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import AddingPage from '../pages/AddingPage.vue';
import TranslatePage from '../pages/TranslatePage.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/adding',
    component: AddingPage,
  },
  {
    path: '/phrases',
    component: TranslatePage,
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
export default router;
