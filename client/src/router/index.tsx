import { usePermissionsStore } from "@/store/permissions_store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Авторизация
      path: "/login",
      // @ts-ignore
      component: () => import('@/views/Login.vue'),
      meta: {}
    },
    {
      // Страница с мероприятиями (кто её news назвал??)
      path: "/news",
      // @ts-ignore
      component: () => import('@/views/News.vue'),
      meta: {}
    },
    {
      // Коллективы
      path: "/teams",
      // @ts-ignore
      component: () => import('@/views/Teams.vue'),
      meta: {}
    },

    {
      // Какой то конкретный коллектив
      path: "/team-page",
      // @ts-ignore
      component: () => import('@/views/team.vue'),
      meta: {}
    },

    {
      // !Ответственный за направления
      path: "/directions",
      // @ts-ignore
      component: () => import('@/views/Directions.vue'),
      meta: {
        permission: 'can view directions'
      }
    },
    {
      path: "/statistic",
      name: "Statistic",
      // @ts-ignore
      component: () => import('@/views/Statistic.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/event",
      // @ts-ignore
      component: () => import('@/views/Event.vue'),
      meta: {}
    },
    {
      // Страница с личным кабинетом
      path: "/account",
      // @ts-ignore
      component: () => import('@/views/Account.vue'),
      meta: {
        // isLoged: true
      }
    },
    {
      // Отвественный ИРНИТУ
      path: "/reports-university",
      // @ts-ignore
      component: () => import('@/views/reportsView/University_reports.vue'),
      meta: {
        permission: 'can view reports directions'
      }
    },
    {
      // Отвественный НАПРАВЛЕНИЯ
      path: "/reports-directions",
      // @ts-ignore
      component: () => import('@/views/reportsView/Directions_reports.vue'),
      meta: {
        permission: 'can view reports teams'
      }
    },
  ],
});

// Редирект на логин, если роут защищен 
router.beforeEach((to) => {
  const useStore = usePermissionsStore();
  // @ts-ignore
  console.log(to.meta.permission);
  console.log(useStore.can(to.meta.permission));
  console.log(useStore.isLogged);
  console.log();
  // @ts-ignore
  if (to.meta.permission && !useStore.can(to.meta.permission)) {
    return {
      path: '/login',
      query: { next: to.fullPath }
    }
  }

  // if (to.meta.isLoged && !useStore.isLogged) {
  //   console.log('omg see here!');
  //   console.log(useStore.isLogged);
  //   return {
  //     path: '/login',
  //     query: { next: to.fullPath }
  //   }
  // }

  return true;
})

export default router;
