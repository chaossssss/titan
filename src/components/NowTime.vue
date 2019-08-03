<template>
  <div class="time-box">
    {{realTime}}
  </div>
</template>

<script>
export default {
  name: 'TimeBox',
  data(){
    return {
      realTime:""
    }
  },
  mounted(){
    this.realTime = this.dealWithTime(new Date())
    let that = this
    this.timer = setInterval(function () {
      that.realTime = that.dealWithTime(new Date()) // 修改数据date
    }, 1000)
  },
  destroyed () {
    if (this.timer) { 
      clearInterval(this.timer)
    }
  },
  methods:{
    dealWithTime (data) {
      let formatDateTime
      let Y = data.getFullYear()
      let M = data.getMonth() + 1
      let D = data.getDate()
      let H = data.getHours()
      let Min = data.getMinutes()
      let S = data.getSeconds()
      let W = data.getDay()
      H = H < 10 ? ('0' + H) : H
      Min = Min < 10 ? ('0' + Min) : Min
      S = S < 10 ? ('0' + S) : S
      switch (W) {
        case 0:
          W = '天'
          break
        case 1:
          W = '一'
          break
        case 2:
          W = '二'
          break
        case 3:
          W = '三'
          break
        case 4:
          W = '四'
          break
        case 5:
          W = '五'
          break
        case 6:
          W = '六'
          break
        default:
          break
      }
      formatDateTime = Y + '年' + M + '月' + D + '日 ' + H + ':' + Min + ':' + S + ' 星期' + W
      return formatDateTime
    }
  }
}
</script>
<style scoped>
.time-box {
  margin-top: 15px;
  float: left;
  font-size: 14px;
  padding: 0 20px;
  background: rgba(0,0,0,0.2);
  height: 28px;
  border-radius: 14px;
  line-height: 28px;
}
</style>
