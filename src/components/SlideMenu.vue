<template>
  <el-row class="tac">
    <el-col :span="24">
      <img class="menu-logo" src="../static/images/titan-logo.png">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router 
        :unique-opened="true"
        background-color="#0e2d49" 
        text-color="#fff" 
        style="border-right:0" 
        @select="getIndex">
        <template v-for="item in routerList">
          <el-submenu v-if="item.hasSub == 1" :index="item.link" :key="item.link">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="item in item.subitem" :key="item.sublink">
              <el-menu-item :index="item.sublink">{{item.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="item.hasSub == 0" :index="item.link" :key="item.link">
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
        icon: "el-icon-info",
        subitem:[]
      },{
        hasSub:0,
        title:"战役信息",
        link:"/War",
        icon: "el-icon-menu",
        subitem:[]
      },{
        hasSub:0,
        title:"物资情况",
        link:"/Material",
        icon: "el-icon-sort",
        subitem:[]
      }],
    }
  },
  mounted(){
    console.log(this.$store.state.level)
  },
  methods:{
    getIndex(index){
      let router = {},routerList = this.routerList
      for(let i = 0; i < routerList.length; i++){
        if(routerList[i].link == index){
          router.title = routerList[i].title
          router.link = index
          router.isCurrent = 1
          break
        }
        for(let j = 0; j < routerList[i].subitem.length; j++){
          if(routerList[i].subitem[j].sublink == index){
            router.title = routerList[i].subitem[j].title
            router.link = index
            router.isCurrent = 1
            break
          }
          
        }
      }
      
      this.$store.commit("addRouter",router)
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
  width: 76%;
  margin: 0 auto;
}
</style>
