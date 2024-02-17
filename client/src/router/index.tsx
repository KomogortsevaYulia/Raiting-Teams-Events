import { usePermissionsStore } from "@/store/permissions_store";
import { createRouter, createWebHistory } from "vue-router";
import type {Permission} from "@/types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Авторизация
      path: "/",
      component: () => import("@/views/events/NewsMain.vue"),
      meta: {},
    },
    {
      // Авторизация
      path: "/login",
      component: () => import("@/views/LoginForm.vue"),
      meta: {},
    },
    {
      // Страница с мероприятиями (кто её news назвал??)
      path: "/news",
      component: () => import("@/views/events/NewsMain.vue"),
      meta: {},
    },
    {
      // Коллективы
      path: "/teams",
      component: () => import("@/views/teams/TeamsPage.vue"),
      meta: {},
    },
    {
      path: "/team/:id?",
      name: "Team",
      component: () => import("@/views/teams/TeamPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      // !Ответственный за направления
      path: "/directions",

      component: () => import("@/views/DirectionsPage.vue"),
      meta: {
        permission: "can view directions",
      },
    },
    {
      path: "/statistic",
      name: "Statistic",

      component: () => import("@/views/report/StatisticPage.vue"),
      meta: {
        requiresAuth: true,
        permission: "can view directions",
      },
    },
    {
      path: "/event/:id?",

      component: () => import("@/views/events/EventMain.vue"),
      meta: {},
    },
    {
      path: "/event-create",

      component: () => import("@/views/events/EventCreate.vue"),
      meta: {},
    },
    {
      path: "/personal/:username",
      name: "Personal",
      component: () => import("@/views/user/UserProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      //различные заяки, которые формировал юзер
      path: "/user-requests",
      name: "Requests",
      props: (route) => ({ userId: route.query.user_id }),

      component: () => import("@/views/user/UserRequests.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
          //различные заяки, которые формировал юзер
          path: "/bitrix-auth",
          name: "BitrixAuth",
          props: (route) => ({ code: route.query.code }),

          component: () => import("@/views/user/BitrixAuth.vue"),
          meta: {
            requiresAuth: true
          },
        },
    {
      //различные заяки, которые формировал юзер
      path: "/admin-panel",
      name: "AdminMain",
      props: (route) => ({ userId: route.query.user_id }),

      component: () => import("@/views/admin_panel/AdminMain.vue"),
      meta: {
        requiresAuth: true,
        permission: "can all",
      },
    },
  ],
});

// Редирект на логин, если роут защищен
router.beforeEach((to) => {
  const useStore = usePermissionsStore();

  const permission = to.meta.permission as Permission
  if (permission && !useStore.can(permission)) {
    return {
      path: "/login",
      query: { next: to.fullPath },
    };
  }

  return true;
});

export default router;
