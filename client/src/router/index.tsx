import { usePermissionsStore } from "@/store/permissions_store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Авторизация
      path: "/",
      component: () => import("@/views/events/News.vue"),
      meta: {},
    },
    {
      // Авторизация
      path: "/login",
      name:"Login",
      component: () => import("@/views/Login.vue"),
      meta: {},
    },
    {
      // Страница с мероприятиями (кто её news назвал??)
      path: "/news",
      name:"News",
      component: () => import("@/views/events/News.vue"),
      meta: {},
    },
    {
      // Коллективы
      path: "/teams",
      component: () => import("@/views/teams/Teams.vue"),
      meta: {},
    },
    {
      path: "/team/:id?",
      name: "Team",
      component: () => import("@/views/teams/Team.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      // !Ответственный за направления
      path: "/directions",

      component: () => import("@/views/Directions.vue"),
      meta: {
        permission: "can view directions",
      },
    },
    {
      path: "/statistic",
      name: "Statistic",

      component: () => import("@/views/report/Statistic.vue"),
      meta: {
        requiresAuth: true,
        permission: "can view directions",
      },
    },
    {
      path: "/event/:id?",

      component: () => import("@/views/events/Event.vue"),
      meta: {},
    },
    {
      path: "/event-create",

      component: () => import("@/views/events/EventCreate.vue"),
      meta: {},
    },
    {
      // Страница с личным кабинетом
      path: "/account",

      component: () => import("@/views/Account.vue"),
      meta: {
        // isLoged: true
      },
    },
    {
      path: "/personal/:username",
      name: "Personal",
      component: () => import("@/views/Personal.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      //различные заяки, которые формировал юзер
      path: "/user-requests",
      name: "Requests",
      props: (route) => ({ userId: route.query.user_id }),

      component: () => import("@/views/user/Requests.vue"),
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

  // @ts-ignore
  if (to.meta.permission && !useStore.can(to.meta.permission)) {
    return {
      path: "/login",
      query: { next: to.fullPath },
    };
  }

  return true;
});

export default router;
