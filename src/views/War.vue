<template>
	<div class="war-con">
		<div class="transfer-con">
			<el-transfer
			  filterable
			  :filter-method="filterMethod"
			  :titles="['待选人员', '出征人员']"
			  filter-placeholder="请输入姓名"
			  v-model="value"
			  :data="data">
			</el-transfer>
		</div>
		<div class="slider-con">
		  	<div class="block">
			  	<span class="demonstration">刀身</span>
				<el-slider
				  v-model="gas"
				  show-input>
				</el-slider>
			</div>
			<div class="block">
			  	<span class="demonstration">鞘·钢瓶</span>
				<el-slider
				  v-model="blade"
				  show-input>
				</el-slider>
			</div>
			<div class="block">
			  	<span class="demonstration">立体机动装置</span>
				<el-slider
				  v-model="mobileDevice"
				  show-input>
				</el-slider>
			</div>
			<div class="block">
			  	<span class="demonstration">战马</span>
				<el-slider
				  v-model="horse"
				  show-input>
				</el-slider>
			</div>
			<div class="block">
			  	<span class="demonstration">雷枪</span>
				<el-slider
				  v-model="gun"
				  show-input>
				</el-slider>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  data() {
	    const generateData = _ => {
	      const data = [];
	      const cities = ['艾伦·耶格尔', '三笠·阿克曼', '阿明·阿诺德', '埃尔文·史密斯', '利威尔·阿克曼', '韩吉·佐耶', '让·基尔希斯坦', '康尼·斯普林格', '萨莎·布劳斯', '尤弥尔'];
	      const pinyin = ['艾伦·耶格尔', '三笠·阿克曼', '阿明·阿诺德', '埃尔文·史密斯', '利威尔·阿克曼', '韩吉·佐耶', '让·基尔希斯坦', '康尼·斯普林格', '萨莎·布劳斯', '尤弥尔'];
	      cities.forEach((city, index) => {
	        data.push({
	          label: city,
	          key: index,
	          pinyin: pinyin[index]
	        });
	      });
	      return data;
	    };
	    return {
	      data: generateData(),
	      gas: 0,
	      blade: 0,
	      mobileDevice: 0,
	      horse: 0,
	      gun: 0,
	      value: [],
	      filterMethod(query, item) {
	        return item.pinyin.indexOf(query) > -1;
	      }
	    };
	  }
	};
</script>
<style>
	.war-con {
		width: 600px;
		padding-left: 50px;
	}
	.transfer-con .el-input{
		width: 160px;
	}
	.slider-con .demonstration {
		padding: 10px 0 4px 0;
		display: block;
	}
</style>