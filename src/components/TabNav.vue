<template>
  <div class="tab-nav">
    <ul @click="closeTab($event)">
      <li v-for="(item,index) in routerLink" :key="index">{{item.title}}{{item.isCurrent}}
        <span :link="item.link">×</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TanNav',
  props: {

  },

  data(){
    return{
      routerLink: this.$store.state.router
    }
  },
  methods:{
    closeTab(e){
      if(e.target.tagName == "SPAN"){
        let url = e.target.getAttribute('link')
        this.$store.commit("delRouter",url)
      }
    }
  }
}
</script>

<style scoped>

</style>
