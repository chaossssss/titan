<template>
  <div class="tab-nav">
    <ul @click="closeTab($event)">
      <li v-for="(item,index) in routerLink" :key="index">{{item.title}}{{item.isCurrent}}
        <span :link="item.link">×</span>
      </li>
    </ul>
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
  mounted(){
    let tabs = this.routerLink
    tabs.forEach((tab,index)=>{
      console.log(tab)
      if(tab.isCurrent == 1){
        this.editableTabsValue = tab.title
      }
    })
  },
  methods:{
    closeTab(e){
      if(e.target.tagName == "SPAN"){
        let url = e.target.getAttribute('link')
        this.$store.commit("delRouter",url)
      }
    },
    handleTabsEdit(targetName, action) {
      console.log("targetName",targetName)
      if (action === 'remove') {
        let tabs = this.routerLink;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        // this.editableTabsValue = activeName;
        // this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    currentTab(targetName){
      console.log(targetName.index)
    }
  }
}
</script>

<style scoped>

</style>
