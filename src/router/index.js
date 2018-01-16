import Vue from 'vue'
import Router from 'vue-router'
import PictureMasonry from '@/components/PictureMasonry'

Vue.use(Router)
// 路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PictureMasonry',
      component: PictureMasonry
    }
  ]
})
