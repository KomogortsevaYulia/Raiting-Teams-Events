import { usePermissionsStore } from "@/store/permissions_store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Авторизация
      path: "/",
      // @ts-ignore
      component: () => import('@/views/events/News.vue'),
      meta: {}
    },
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
      component: () => import('@/views/events/News.vue'),
      meta: {}
    },
    {
      // Коллективы
      path: "/teams",
      // @ts-ignore
      component: () => import('@/views/teams/Teams.vue'),
      meta: {}
    },
    {
      path: "/team/:id?",
      name: "Team",
      // @ts-ignore
      component: () => import('@/views/teams/Team.vue'),
      meta: {
        requiresAuth: true
      }
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
      component: () => import('@/views/report/Statistic.vue'),
      meta: {
        requiresAuth: true,
        permission: 'can view directions'

      }
    },
    {
      path: "/event/:id?",
      // @ts-ignore
      component: () => import('@/views/events/Event.vue'),
      meta: {}
    },
    {
      path: "/event-create",
      // @ts-ignore
      component: () => import('@/views/events/EventCreate.vue'),
      meta: {
      }
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
      path: "/personal/:username",
      name: "Personal",
      // @ts-ignore
      component: () => import('@/views/Personal.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {//различные заяки, которые формировал юзер
      path: "/user-requests",
      name: "Requests",
      props:(route)=>({userId:route.query.user_id}),
      // @ts-ignore
      component: () => import('@/views/user/Requests.vue'),
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: "/questionnaire",
    //   name: "Questionnaire",
    //   // @ts-ignore
    //   component: () => import('@/views/Questionnaire.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
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
