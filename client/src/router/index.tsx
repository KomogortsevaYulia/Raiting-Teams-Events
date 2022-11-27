import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import('../views/Login.vue')
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: "/news",
      name: "News",
      component: () => import('../views/News.vue'),
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: "/teams",
      name: "Teams",
      component: () => import('../views/Teams.vue')
      // meta: {
      //   requiresAuth: true
      // }
    },
  ],
});

export default router;
