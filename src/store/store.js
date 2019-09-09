import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	router:[],
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    level: localStorage.getItem('level') ? localStorage.getItem('level') : 0,
  },
  mutations: {
    getRouter(state,str){
      state.router = JSON.parse(str)
    },
  	addRouter(state,url){
      state.router.push(url)
      let router = state.router

      function uniqueArray(array, key){
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
          var item = array[i];
          var repeat = false;
          for (var j = 0; j < result.length; j++) {
            result[j].isCurrent = 0
            if (item[key] == result[j][key]) {
              result[j].isCurrent = 1
              repeat = true;
            }
          }
          if (!repeat) {
            item.isCurrent = 1
            result.push(item);
          }
        }
        return result;
      }

      let newRouter = uniqueArray(router,"link")
      console.log("newRouter",newRouter)
      let routerLength = state.router.length;
      state.router.splice(0,routerLength)
      for(let i = 0; i < newRouter.length; i++){
        state.router.push(newRouter[i])
      }    
      localStorage.setItem("router",JSON.stringify(state.router))
      // console.log('stores：',state.router);

  	},
    delRouter(state,url){
      let routerLength = state.router.length;
      for(let i in state.router){
        if(state.router[i].link == url){
          if(state.router[i].isCurrent == 0){
            
          }else{
            if(i < routerLength - 1){
              state.router[parseInt(i)+1].isCurrent = 1
            }
            else if(i == routerLength - 1 && routerLength > 1){
              state.router[parseInt(i)-1].isCurrent = 1
            }
          }
          state.router.splice(i,1)
          localStorage.setItem("router",JSON.stringify(state.router)) 
        }
      }
      // console.log("delRouter:",)
    },
    changeLogin (state, user) {
      console.log(user)
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
      if(user.name == 'admin'){
        localStorage.setItem('level', 1);
        state.level = 1
      }else if(user.name == 'levi'){
        localStorage.setItem('level', 2);
        state.level = 2
      }
    }
  },
  actions: {

  }
})
