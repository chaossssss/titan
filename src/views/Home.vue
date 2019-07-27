<template>
	<el-container style="height:100vh;">
	  <el-aside width="200px">
			<SlideMenu></SlideMenu>
	  </el-aside>
	  <el-container>
	    <el-header>
				<el-row class="demo-avatar demo-basic">
					<el-col :span="12">
					  <div class="demo-basic--circle">
					    <div class="block">
					      <el-avatar :size="size" :src="circleUrl"></el-avatar>
					    </div>
					  </div>
					</el-col>
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
	  text-align: center;
	  line-height: 60px;
	}

	.el-aside {
	  background-color: #D3DCE6;
	  color: #333;
	  text-align: center;
	}

	.el-main {
	  background-color: #E9EEF3;
	  color: #333;
	  text-align: center;
	}

	body > .el-container {
	  margin-bottom: 40px;
	}
</style>
<script>
import SlideMenu from "@/components/SlideMenu.vue"
import TabNav from "@/components/TabNav.vue"
export default {
  name: 'home',
  data(){
  	return{
  		circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  		size: "large"
  	}
  },
  components: {
		SlideMenu,
		TabNav
  }
}
</script>
