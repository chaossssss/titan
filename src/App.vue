<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'app',
  data(){
    return{
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      size: "large"
    }
  },

  beforeCreate(){
    let storageStr = localStorage.getItem("router")
    if(storageStr != null){
      this.$store.commit("getRouter",storageStr)
    }
  },
  beforeDestory(){
    localStorage.removeItem("router")
  }
}
</script>
<style>

</style>
