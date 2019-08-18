<template>
  <div class="tab-nav">

    <el-tabs type="card" v-model="editableTabsValue" closable @edit="handleTabsEdit" @tab-click="currentTab">
      <el-tab-pane
        :key="item.link"
        v-for="item in routerLink"
        :label="item.title"
        :name="item.title"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'TanNav',
  props: {

  },

  data(){
    return{
      routerLink: this.$store.state.router,
      editableTabsValue:""
    }
  },
  watch:{
    "routerLink":function(newVals){
      newVals.forEach((newVal,index)=>{
        if(newVal.isCurrent == 1){
          this.editableTabsValue = newVal.title
        }
      })
    }
  },
  mounted(){
    this.checkRouter()
  },
  methods:{
    checkRouter(){
      let tabs = this.$store.state.router
      if(tabs.length == 0){
        this.$router.push({path:'/'})
      }else{      
        tabs.forEach((tab,index)=>{
          if(tab.isCurrent == 1){
            this.editableTabsValue = tab.title
            this.routerLink = this.$store.state.router
          }
        })
      }
    },
    closeTab(e){
      if(e.target.tagName == "SPAN"){
        let url = e.target.getAttribute('link')
        this.$store.commit("delRouter",url)
      }
    },
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let tabs = this.$store.state.router
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            this.$store.commit("delRouter",tab.link)
          }
        });
        this.checkRouter()
      }
    },
    currentTab(tabnav){
      console.log(tabnav)
      let tabs = this.$store.state.router
      tabs.forEach((tab,index) => {
        console.log('tab',tab)
        if(tab.title === tabnav.name){
          tab.isCurrent = 1
          this.$store.commit("addRouter",tab)
        }
      })
      this.checkRouter()
    }
  }
}
</script>

<style scoped>

</style>
