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
	import news1 from '../static/images/news1.jpg'
	import news2 from '../static/images/news2.jpg'
	import news3 from '../static/images/news3.jpg'
	import news4 from '../static/images/news4.jpg'
	import news5 from '../static/images/news5.jpg'
	export default{
		name:'OpenInformation',
		data(){
			return{
				pics:[{
					name:'巨人体格差的图解',
					src:news1
				},{
					name:'宪兵团②',
					src:news2
				},{
					name:'立体机动装置的体重转移装置②',
					src:news3
				},{
					name:'立体机动装置的构造②',
					src:news4
				},{
					name:'巨壁教②',
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