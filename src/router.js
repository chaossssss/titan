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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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
    }
  ]
})
