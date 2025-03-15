import { createMemoryHistory, createRouter } from 'vue-router'

import IndexView from '~/index.vue'

const routes = [
  { path: '/', component: IndexView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})