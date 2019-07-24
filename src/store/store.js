import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	router:[]
  },
  mutations: {
  	addRouter(state,router){
      if(state.router.length == 0){
        state.router.push(router)
      }else if(state.router.length > 0){
        let k = state.router.length
        
        for(var i in state.router){
          state.router[i].isCurrent = false
          if(state.router[i].link == router.link){
            state.router[i].isCurrent = true
          }else{
            console.log(2222)
            state.router.push(router)
          }
        }
      }
      console.log('stores：',state.router);
  	}
  },
  actions: {

  }
})
