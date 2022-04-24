import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/community',
  },
  {
    path: '/admin',
    redirect: '/admin/user',
  },
  {
    path: '/admin',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin/user',
        name: 'user',
        meta: {
          title: '用户管理',
        },
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User.vue'),
      },
      {
        path: '/admin/community',
        name: 'community',
        meta: {
          title: '小区管理',
        },
        component: () =>
          import(/* webpackChunkName: "community" */ '../views/Community.vue'),
      },
      {
        path: '/admin/door',
        name: 'door',
        meta: {
          title: '门禁管理',
        },
        component: () =>
          import(/* webpackChunkName: "door" */ '../views/Door.vue'),
      },
      {
        path: '/admin/log',
        name: 'log',
        meta: {
          title: '日志管理',
        },
        component: () =>
          import(/* webpackChunkName: "log" */ '../views/Log.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/community',
    name: 'my_community',
    meta: {
      title: '社区',
    },
    component: () =>
      import(/* webpackChunkName: "community" */ '../views/UserCommunity.vue'),
  },
  {
    path: '/door',
    name: 'my_door',
    meta: {
      title: '门禁',
    },
    component: () =>
      import(/* webpackChunkName: "door" */ '../views/UserDoor.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('token');
  console.log('to', to);
  if (!role && to.path.includes('/admin') && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    next();
  }
});

export default router;
