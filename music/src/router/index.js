import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Console from "../views/Console.vue";
import Users from "../views/Users.vue";
import Articles from "../views/Articles.vue";
import Echarts from "../views/Echarts.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Car from "../views/Car.vue";
import Park from "../views/Park.vue";
import Stalls from "../views/Stalls.vue";

Vue.use(VueRouter);

const routes = [
  
  {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/stalls',
          name: 'stalls',
          component: Stalls
        },
        {
          path: '/park',
          name: 'park',
          component: Park
        },
        {
          path: '/car',
          name: 'car',
          component: Car
        },
        {
          path: '/console',
          name: 'console',
          component: Console
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/articles',
          name: 'articles',
          component: Articles
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: Echarts
        },
        {
          path: '/404',
          component: NotFound
        }
      ]
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const LOGINURL = '/login'
  let url, user

  url = to.path
  user = sessionStorage.getItem('user')

  if (url === LOGINURL) {
    sessionStorage.removeItem('user')
  }

  // 判断是否登录
  if (!user && url !== LOGINURL) {
    next({ path: LOGINURL })
  } else {
    next()
  }
})

export default router;
