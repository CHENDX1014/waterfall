<template>
  <div id="app">
    <pull-refresh :refresh="refresh" :loadmore="loadmore">
      <div v-for="item in list" class="list-item">
        {{item.title}}
      </div>
    </pull-refresh>
  </div>
</template>

<script>
import pullRefresh from './components/PullRefresh'
export default {
  data () {
    return {
      list: [
        { title: '什么是伪类？作为JavaScript程序员的你知道吗?' },
        { title: 'JavaScript实现简单的双向数据绑定（Ember、Angular、Vue）' },
        { title: 'WebView性能、体验分析与优化' },
        { title: '模块化JavaScript组件开发指南' },
        { title: '前端高手教你高效管理数据：将JSON API和Redux结合使用' },
        { title: '前端每周清单第 17 期：大前端技术生命周期模型；WWDC 发布 Safari 11；面向生产环境的前端性能优化' },
        { title: '前端不为人知的一面——前端冷知识集锦' },
        { title: 'Web前端开发工程师需要掌握哪些核心技能？' },
        { title: '探讨后端选型中不同语言及对应的Web框架' },
        { title: '有一本书，适合零到十年经验的程序员看' },
        { title: 'JavaScript 的装饰器：它们是什么及如何使用' },
        { title: '移动端一个像素问题解决方案' }
      ],
      backup: [
      ]
    }
  },
  mounted () {
    this.backup = [].concat(this.list)
  },
  methods: {
    refresh () {
      console.log('pull refresh')
      this.list = [].concat(this.backup)
      console.log(this.list)
    },
    loadmore () {
      console.log('load more')
      // Array.prototype.push.apply(this.list, this.backup)
      this.list = this.list.concat(this.backup)
    }
  },
  components: {
    'pull-refresh': pullRefresh
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
</style>
