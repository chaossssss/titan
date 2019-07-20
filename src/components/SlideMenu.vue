<template>
  <el-row class="tac">
    <el-col :span="24">
      <img class="menu-logo" src="../static/images/titan-logo.png">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        :background-color="bgColor"
        @select="getIndex">
        <template v-for="item in routerList">
          <el-submenu v-if="item.hasSub == 1" :index="item.link">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="item in item.subitem">
              <el-menu-item :index="item.sublink">{{item.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="item.hasSub == 0" :index="item.link">
            <i :class="item.icon"></i>
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
        link:"/Corps",
        icon: "el-icon-tickets",
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
        link:"/OpenInformation",
        icon: "el-icon-info"
      },{
        hasSub:0,
        title:"战役信息",
        link:"/War",
        icon: "el-icon-menu"
      },{
        hasSub:1,
        title:"物资情况",
        link:"/Material",
        icon: "el-icon-sort",
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
      }],
      bgColor: "#0e2d49"
    }
  },
  methods:{
    getIndex(index){
      this.$store.commit("addRouter",index)
      console.log(this.$store.state.router)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tac {
  height: 100vh;
  background: #0e2d49;
}
.menu-logo {
  width: 80%;
  margin: 0 auto;
}
</style>
