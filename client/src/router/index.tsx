import { usePermissionsStore } from "@/store/permissions_store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Авторизация
      path: "/login",
      name: "Login",
      // @ts-ignore
      component: () => import('@/views/Login.vue'),
      meta: {
        requiresAuth: true,
        title: 'Авторизация'
      }
    },
    {
      // Страница с мероприятиями (кто её news назвал??)
      path: "/news",
      name: "News",
      // @ts-ignore
      component: () => import('@/views/News.vue'),
      meta: {
        requiresAuth: true,
        title: 'Мероприятия'
      }
    },
    {
      // Коллективы
      path: "/teams",
      name: "Teams",
      // @ts-ignore
      component: () => import('@/views/Teams.vue'),
      meta: {
        requiresAuth: true,
        title: 'Коллективы'
      }
    },
    {
      // !Ответственный за направления
      path: "/directions",
      name: "Directions",
      // @ts-ignore
      component: () => import('@/views/Directions.vue'),
      meta: {
        requiresAuth: true,
        title: 'Направления',
        permission: 'can view directions'
      }
    },
    {
      // Конкретная страница мероприятия
      path: "/event",
      name: "Event",
      // @ts-ignore
      component: () => import('@/views/Event.vue'),
      meta: {
        requiresAuth: true,
        title: 'Измените название когда руки дойдут, чтоб автоматически делалось'
      }
    },
    {
      // Страница с личным кабинетом
      path: "/account",
      name: "Account",
      // @ts-ignore
      component: () => import('@/views/Account.vue'),
      meta: {
        requiresAuth: true,
        title: 'Личный кабинет'
      }
    },
    {
      // Страница с отчетами
      path: "/reports",
      name: "Reports",
      // @ts-ignore
      component: () => import('@/views/Reports.vue'),
      meta: {
        requiresAuth: true,
        title: 'Отчеты',
        permission: 'can view reports'
      }
    },
  ],
});

// Редирект на логин, если роут защищен 
router.beforeEach((to) => {
  const useStore = usePermissionsStore();
  // @ts-ignore
  if (to.meta.permission && !useStore.can(to.meta.permission)) {
    return {
      path: '/login',
      query: { next: to.fullPath }
    }
  }

  return true;
})

export default router;
