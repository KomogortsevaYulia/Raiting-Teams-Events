import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/news",
      name: "News",
      component: () => import('../views/News.vue')
    },
    {
      path: "/teams",
      name: "Teams",
      component: () => import('../views/Teams.vue')
    },
  ],
});

export default router;
