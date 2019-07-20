import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	router:[]
  },
  mutations: {
  	addRouter(state,n){
  		state.router.push(n)
  	}
  },
  actions: {

  }
})
