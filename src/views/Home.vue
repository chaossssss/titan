<template>
	<el-container style="height:100vh;">
	  <el-aside width="200px">
			<SlideMenu></SlideMenu>
	  </el-aside>
	  <el-container>
	    <el-header>
	    	<NowTime/>
				<el-row class="avatar-box">
		      <el-dropdown size="small" @command="handleCommand">
			      <el-avatar :size="size" :fit="picfit" :src="circleUrl" style="margin-top:8px;"></el-avatar>
		        <el-dropdown-menu slot="dropdown">
		          <el-dropdown-item command="user">{{userName}}</el-dropdown-item>
		          <el-dropdown-item command="logout">退出</el-dropdown-item>
		        </el-dropdown-menu>
		      </el-dropdown>
				</el-row>
	    </el-header>
	    <el-main>
				<TabNav/>
	    	<router-view/>
	    	<div v-if="$route.path == '/'" style="width:800px;padding-left:40px;">
	    		<el-carousel :interval="4000" type="card" height="200px" style="overflow-y:hidden;">
	    		  <el-carousel-item v-for="item in gifs" :key="item" style="width:500px;">
		    		  <img :src="item">
	    		  </el-carousel-item>
	    		</el-carousel>
	    		<div>
		    	  <span>那一天，人类终于回想起了曾一度被它们所支配的恐怖和被囚禁于鸟笼中的那份屈辱。</span>
		    	  <el-divider content-position="right">《进击的巨人》</el-divider>
	    		</div>
	    	</div>
	    </el-main>
	  </el-container>
	</el-container>
</template>
<style>

	.el-header, .el-footer {
	  background-color: #B3C0D1;
	  color: #333;
	  line-height: 60px;
	}

	.el-aside {
	  background-color: #D3DCE6;
	  color: #333;
	  text-align: center;
	}

	.el-main {
	  background-color: #fff;
	  color: #333;
	  padding: 0;
	}

	body > .el-container {
	  margin-bottom: 40px;
	}
	.avatar-box {
		text-align: right;
	}


</style>
<script>
import SlideMenu from "@/components/SlideMenu.vue"
import TabNav from "@/components/TabNav.vue"
import NowTime from "@/components/NowTime.vue"
import HighLevelPic from "../static/images/avatar.jpg"
import gif1 from "../static/images/gif1.gif"
import gif4 from "../static/images/gif4.gif"
import gif5 from "../static/images/gif5.gif"
export default {
  name: 'home',
  data(){
  	return{
  		circleUrl: HighLevelPic,
  		size: "large",
  		picfit: "fill",
  		gifs:[gif1,gif4,gif5],
  		userName: 'Levi'
  	}
  },
  components: {
		SlideMenu,
		TabNav,
		NowTime
  },
  methods:{
  	handleCommand(command) {
  	  // this.$message('click on item ' + command);
  	  if(command == "logout"){
  	  	localStorage.removeItem('level');
  	  	localStorage.removeItem('Authorization');
  	  	this.$router.push('/login')
  	  }
  	}
  }
}
</script>
