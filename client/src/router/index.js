// import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '../page/home/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../page/login/index.vue')
  }
]
})
router.beforeEach((to, from, next) => {
  let token = store.state.user.token
  if (to.meta.requiresAuth) {
    if (token) {
      if( to.path == '/login' ) {
        next({
          path: '/home'
        })
      }
      if (from.query.redirect) {
        if (to.path === from.query.redirect) {
          next()
        } else {
          next({
            path: from.query.redirect
          })
        }
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router;