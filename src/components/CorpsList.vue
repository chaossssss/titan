<template>
  <div>222</div>
</template>

<script>
export default {
  name: 'CorpsList',
  mounted(){
    this.$get("/users").then((res)=>{
        console.log(res)
    })
  }
}
</script>
<style scoped>

</style>
