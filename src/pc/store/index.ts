import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  state: {
    content: {
      articleVO: {
        articleSuperUrl: '',
        articleTitle: '',
        articleContent: '',
        articleCanDiscuss: '',
        articleType: 1
      }
    }
  },
  modules: {
  },
})
