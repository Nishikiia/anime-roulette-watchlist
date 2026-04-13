import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Generator from '../pages/Generator.vue'
import Bookmarks from '../pages/Bookmarks.vue'
import Watched from '../pages/Watched.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/generator', component: Generator },
  { path: '/bookmarks', component: Bookmarks },
  { path: '/watched', component: Watched }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router