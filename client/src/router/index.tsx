import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: "/",
      name: "Login",
      // @ts-ignore
      component: () => import('@/views/Login.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/news",
      name: "News",
      // @ts-ignore
      component: () => import('@/views/News.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/teams",
      name: "Teams",
      // @ts-ignore
      component: () => import('@/views/Teams.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/directions",
      name: "Directions",
      // @ts-ignore
      component: () => import('@/views/Directions.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/event",
      name: "Event",
      // @ts-ignore
      component: () => import('@/views/Event.vue'),
      meta: {
        requiresAuth: true
      }
    },{
      path: "/questionnaire",
      name: "Questionnaire",
      // @ts-ignore
      component: () => import('@/views/Questionnaire.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ],
});

export default router;
