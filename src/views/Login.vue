<template>
	<div class="login">
		<div class="login-con">
			<img class="login-pic" src="../static/images/login-bg.jpg">
			<div class="login-box">
				<el-form ref="form" :model="form" label-width="80px">
				  <el-form-item label="用户名">
				    <el-input v-model="form.name"></el-input>
				  </el-form-item>
				  <el-form-item label="密码">
				    <el-input type="password" v-model="form.password"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">登录</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  name: 'login',
	  data(){
	  	return {
	  		form: {
	  			name: '',
	  			password: ''
	  		}
	  	}
	  },
	  components: {

	  },
	  methods: {
	  	onSubmit(){

	  	},
	  }
	}
</script>
<style lang="less">
	.login {
		width: 100wh;
		height: 100vh;
		background: #0f2e4b;
		position: relative;
		.login-con {
			width: 40%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			.login-pic {
				width: 80%;
				margin: 0 auto 40px;
				display: block;
			}
			.login-box {
				width: 80%;
				background: #fff;
				border-radius: 10px;
				padding: 40px 60px 10px 20px;
			}
		}
	}
</style>