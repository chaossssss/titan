<template>
	<div class="material-con">
		<el-collapse v-model="activeNames" @change="handleChange" accordion>
		  <el-collapse-item title="刀身" name="1">

		    <div>锐利度：影响攻击力。</div>
		    <div>刀身长：影响攻击范围。</div>
		    <div>耐久度：影响消耗速度。</div>
		  </el-collapse-item>
		  <el-collapse-item title="鞘·钢瓶" name="2">
		    <div>瓦斯气量：影响瓦斯条的最大值。</div>
		    <div>瓦斯气压：影响利用瓦斯移动的速度。</div>
		    <div>可换刀刃次数：备用的刀刃数量。</div>
		  </el-collapse-item>
		  <el-collapse-item title="立体机动装置" name="3">
		    <div>卷收速度：影响立体机动的移动速度和向巨人冲刺的速度（即R1锁定后用三角键钩住部位后的自动冲刺）。</div>
		    <div>锚钩射程：表示能从多远的距离发射锚钩钩住巨人。</div>
		    <div>锚钩强度：影响锚钩钩住巨人后能固定的时间，不是很重要的属性，在快节奏的战斗中，都是锁定后立刻展开攻击。</div>
		  </el-collapse-item>
		  <el-collapse-item title="战马" name="4">
		    <div>速度：奔跑的极限速度。</div>
		    <div>耐力：可持续运动时间。</div>
		  </el-collapse-item>
		  <el-collapse-item title="雷枪" name="5">
		    <div>射程：发射距离。</div>
		    <div>爆破量：爆炸时产生的破环程度。</div>
		  </el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: []
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>
<style>
.material-con{
	width: 600px;
	padding-left: 40px;
}
</style>