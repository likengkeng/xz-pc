import Vue from 'vue';
import router from './router/index'
import store from './store/index'
import App from './App.vue' // 引入 APP 页面组建
import '../../static/styles/common.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import './element.ts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../static/styles/common.css'

// import '../../static/UEditor/ueditor.config.js'
// import '../../static/UEditor/ueditor.all.min.js'
// import '../../static/UEditor/lang/zh-cn/zh-cn.js'
// import '../../static/UEditor/ueditor.parse.min.js'

// import VueUeditorWrap from 'vue-ueditor-wrap'
// const VueUeditorWrap = require('vue-ueditor-wrap')
// Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.use(ElementUI);
new Vue({
  el: "#app",
  router,
  //@ts-ignore
  store,
  render: (h) => h(App)
})
