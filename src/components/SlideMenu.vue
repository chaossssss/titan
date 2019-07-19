<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        @select="getIndex">
        <template v-for="item in routerList">
          <el-submenu v-if="item.hasSub == 1" :index="item.link">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="item in item.subitem">
              <el-menu-item :index="item.sublink">{{item.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="item.hasSub == 0" :index="item.link">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SlideMenu',
  data(){
    return {
      routerList: [{
        hasSub:1,
        title:"兵团详情",
        subitem:[{
          title:"调查兵团",
          sublink:"/SurveyCorps"
        },{
          title:"宪兵团",
          sublink:"/CharterCorps"
        },{
          title:"驻扎兵团",
          sublink:"/BeStationedCorps"
        }]
      },{
        hasSub:0,
        title:"公开情报",
        link:"/OpenInformation"
      },{
        hasSub:0,
        title:"战役信息",
        link:"/War"
      },{
        hasSub:1,
        title:"物资情况",
        subitem:[{
          title:"瓦斯",
          sublink:"/Gas"
        },{
          title:"刀片",
          sublink:"/Blade"
        },{
          title:"机动装置",
          sublink:"/MobileDevice"
        },{
          title:"马匹",
          sublink:"/Horse"
        },{
          title:"雷枪",
          sublink:"/Gun"
        }]
      }]
    }
  },
  methods:{
    getIndex(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tac {
  height: 100vh;
  background: #fff;
}
</style>
