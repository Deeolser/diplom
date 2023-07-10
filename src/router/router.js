import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import AddingPage from '../pages/AddingPage.vue';

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
    path: '/about',
    component: AboutPage,
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
export default router;
