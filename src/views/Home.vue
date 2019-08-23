<template>
	<el-container style="height:100vh;">
	  <el-aside width="200px">
			<SlideMenu></SlideMenu>
	  </el-aside>
	  <el-container>
	    <el-header>
	    	<NowTime/>
				<el-row class="avatar-box">
		      <el-dropdown size="small">
			      <el-avatar :size="size" :fit="picfit" :src="circleUrl" style="margin-top:8px;"></el-avatar>
		        <el-dropdown-menu slot="dropdown">
		          <el-dropdown-item>Levi</el-dropdown-item>
		        </el-dropdown-menu>
		      </el-dropdown>
				</el-row>
	    </el-header>
	    <el-main>
				<TabNav/>
	    	<router-view/>
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
export default {
  name: 'home',
  data(){
  	return{
  		circleUrl: HighLevelPic,
  		size: "large",
  		picfit: "fill"
  	}
  },
  components: {
		SlideMenu,
		TabNav,
		NowTime
  }
}
</script>
