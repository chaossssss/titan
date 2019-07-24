import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SurveyCorps from './views/corps/SurveyCorps'
import CharterCorps from './views/corps/CharterCorps'
import BeStationedCorps from './views/corps/BeStationedCorps'
import OpenInformation from './views/OpenInformation'
import War from './views/War'
import Gas from './views/material/Gas'
import Blade from './views/material/Blade'
import MobileDevice from './views/material/MobileDevice'
import Horse from './views/material/Horse'
import Gun from './views/material/Gun'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[{
        path:"SurveyCorps",
        component: SurveyCorps
      },{
        path:"CharterCorps",
        component: CharterCorps
      },{
        path:"BeStationedCorps",
        component: BeStationedCorps
      },{
        path:"OpenInformation",
        component: OpenInformation
      },{
        path:"War",
        component: War
      },{
        path:"Gas",
        component: Gas
      },{
        path:"Blade",
        component: Blade
      },{
        path:"MobileDevice",
        component: MobileDevice
      },{
        path:"Horse",
        component: Horse
      },{
        path:"Gun",
        component: Gun
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
