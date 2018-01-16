// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 自定义瀑布流组件
Vue.component('masonry', {
  props: ['item'],
  template: '<div class="pic_a">' +
             '  <img :src="item.src" alt="" />' +
             '  <div class="card-footer no-border">' +
             '    <p class="content_p_1">动画--具有无限想象...</p>' +
             '    <p class="content_p_2">' +
             '      <span class="content_p_span1">编号：{{item.numbering || 0}}</span>' +
             '      <span class="content_p_span2">' +
             '        <img src="src/assets/icon/heart.png" class="imgLink"> 收藏' +
             '        <a href="#"><img src="src/assets/icon/upcoming_work.png" class="imgLink"> 下载</a>' +
             '      </span>' +
             '    </p>' +
             '  </div>' +
             '</div>'

})

  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
