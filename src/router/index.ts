import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import AppTop from '@/views/AppTop.vue';

const routeSettings: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'AppTop',
    component: AppTop,
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: () => {
      return import('@/views/auth/LoginForm.vue');
    }
  },
  {
    path: '/project/projectlist',
    name: 'ProjectList',
    component: () => {
      return import('@/views/project/ProjectList.vue');
    },
  },
  {
    path: '/project/detail/:id',
    name: 'ProjectDetail',
    component: () => {
      return import('@/views/project/ProjectDetail.vue')
    },
    props: (routes) => {
      const idNum = Number(routes.params.id);
      return {
        id: idNum
      };
    }
  },
  {
    path: '/project/add',
    name: 'ProjectAdd',
    component: () => {
      return import('@/views/project/ProjectAdd.vue');
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => {
      return import('@/views/NotFound.vue')
    }
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router
