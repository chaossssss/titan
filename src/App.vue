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

    }
  },

  beforeCreate(){
    let storageStr = localStorage.getItem("router")
    if(storageStr != null){
      this.$store.commit("getRouter",storageStr)
    }
  },
  mounted(){
    window.onload = function(){
      if(!window.localStorage["tempFlag"]){

      }else{
        window.localStorage.removeItem("tempFlag");
        localStorage.removeItem("router")
      }
    }
    window.onunload = function (){
      window.localStorage["tempFlag"] = true;
    }
    window.onbeforeunload = function (){
      window.localStorage["tempFlag"] = true;
    }
  },
  beforeDestory(){
    
  }
}
</script>
<style>

</style>
