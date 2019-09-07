import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Corps from './views/corps/Corps.vue'
import CorpsView from './views/corps/CorpsView'
import CorpsAdd from './views/corps/CorpsAdd'
import CorpsEdit from './views/corps/CorpsEdit'
import OpenInformation from './views/OpenInformation'
import War from './views/War'
import Material from './views/material/Material'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { auth: true },
      children:[{
        path:"SurveyCorps",
        component: Corps,
      },
      {
        path:"SurveyCorps/:id",
        name: "CorpsView",
        component: CorpsView
      },
      {
        path:"/SurveyCorpsAdd/:total",
        name: "CorpsAdd",
        component: CorpsAdd
      },
      {
        path:"/SurveyCorpsEdit/:id",
        name: "CorpsEdit",
        component: CorpsEdit
      },
      {
        path:"CharterCorps",
        component: Corps
      },
      {
        path:"CharterCorps/:id",
        name: "CorpsView",
        component: CorpsView
      },
      {
        path:"/CharterCorpsAdd/:total",
        name: "CorpsAdd",
        component: CorpsAdd
      },
      {
        path:"/CharterCorpsEdit/:id",
        name: "CorpsEdit",
        component: CorpsEdit
      },
      {
        path:"BeStationedCorps",
        component: Corps
      },
      {
        path:"BeStationedCorps/:id",
        name: "CorpsView",
        component: CorpsView
      },
      {
        path:"/BeStationedCorpsAdd/:total",
        name: "CorpsAdd",
        component: CorpsAdd
      },
      {
        path:"/BeStationedCorpsEdit/:id",
        name: "CorpsEdit",
        component: CorpsEdit
      },
      {
        path:"OpenInformation",
        component: OpenInformation
      },{
        path:"War",
        component: War
      },{
        path:"Material",
        component: Material
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
const asyncRouterMap = [
{
  path:'/HighInfo',
  component:() => import('./views/HighInfo.vue')
}]
router.addRoutes(asyncRouterMap)

router.beforeEach((to, from, next) => {
  console.log(to)
  if(to.matched.some( m => m.meta.auth)) {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
      console.log(token)
      if (token == null || token == '') {
        next({path:'/login',query:{Rurl: to.fullPath}});
      } else {
        next();
      }
    }
  }else{
    console.log("请登陆");
    next()
  }
})

export default router;