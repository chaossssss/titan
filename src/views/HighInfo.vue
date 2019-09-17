<template>
	<el-row>
	  <el-col :span="8" v-for="(item, index) in pics" :key="index" :offset="1" style="margin-bottom:20px;">
	    <el-card :body-style="{ padding: '0px' }">
	      <img :src="item.src" class="image">
	      <div style="padding: 14px;">
	        <span>{{item.name}}</span>
	        <div class="bottom clearfix">
	          <el-button type="text" @click="preview(index)" class="button">查看</el-button>
	        </div>
	      </div>
	    </el-card>
	  </el-col>
	</el-row>
</template>
<script>
	import news1 from '../static/images/hnews1.jpg'
	import news2 from '../static/images/hnews2.jpg'
	import news3 from '../static/images/hnews3.jpg'
	import news4 from '../static/images/hnews4.jpg'
	import news5 from '../static/images/hnews5.jpg'
	export default{
		name:'HighInfo',
		data(){
			return{
				pics:[{
					name:'和巨人战斗的历史②',
					src:news1
				},{
					name:'调查兵团的马①',
					src:news2
				},{
					name:'和巨人战斗的历史①',
					src:news3
				},{
					name:'巨树的森林②',
					src:news4
				},{
					name:'信烟弹②',
					src:news5
				}],
				picArr:[news1,news2,news3,news4,news5]
			}
		},
		methods:{
			preview(index) {
			  this.$imagePreview({
			    images: this.picArr,
			    index: index,
			  })
			}
		}
	}
</script>
<style>
	.bottom {
	  margin-top: 13px;
	  line-height: 12px;
	}

	.button {
	  padding: 0;
	  float: right;
	}

	.image {
	  width: 100%;
	  display: block;
	}

	.clearfix:before,
	.clearfix:after {
	    display: table;
	    content: "";
	}
	
	.clearfix:after {
	    clear: both
	}
</style>