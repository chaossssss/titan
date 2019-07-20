<template>
	<el-container style="height:100vh;">
	  <el-aside width="200px">
			<SlideMenu></SlideMenu>
	  </el-aside>
	  <el-container>
	    <el-header>Header

	    </el-header>
	    <el-main>main
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
	  line-height: 160px;
	}

	body > .el-container {
	  margin-bottom: 40px;
	}
</style>
<script>
import SlideMenu from "@/components/SlideMenu.vue"
export default {
  name: 'home',
  components: {
		SlideMenu
  }
}
</script>
