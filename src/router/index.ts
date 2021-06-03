import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Favorite from '../views/Favorite.vue';
import Card from '../views/Card.vue';
import compoHome from '../views/compoHome.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  },
  {
    path: '/card',
    name: 'Card',
    component: Card
  },
  {
    path: '/compoHome',
    name: 'compoHome',
    component: compoHome
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
