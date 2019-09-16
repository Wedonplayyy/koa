import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},//用户
  },
  mutations: {
    setUser(state,data){
      state.user=data;
    }
  },
  actions: {

  },
});
