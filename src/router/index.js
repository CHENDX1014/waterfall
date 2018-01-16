import Vue from 'vue'
import Router from 'vue-router'
import PictureMasonry from '@/components/PictureMasonry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PictureMasonry',
      component: PictureMasonry
    }
  ]
})
