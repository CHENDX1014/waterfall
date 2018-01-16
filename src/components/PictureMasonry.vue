<template>
  <div id="waterfalls" ref="waterfalls">
      <header> 动 漫 之 家 </header>
      <pull-to :top-load-method="refresh"  >
          <!-- 导入自定义的组件masonry，创建左边瀑布流 -->
          <div class="column" id = 'pic_left'>
              <masonry v-for="photo in photos_left" v-bind:item="photo"></masonry>
          </div>
          <!-- 导入自定义的组件masonry，创建右边瀑布流 -->
          <div class="column" id = 'pic_right'>
              <masonry v-for="photo in photos_right" v-bind:item="photo"></masonry>
          </div>
          <!-- 上拉加载更多样式 -->
          <div class="loadmore_footer">
              <span v-if="loading">
                <i class="tc-loading"></i>
                <span><------正在加载中------></span>
              </span>
              <span v-else-if="loadable"><------上拉加载更多------></span>
              <span v-else><------全部加载完毕------></span>
          </div>
      </pull-to>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'

export default {
  name: 'waterfalls',
  components: {
    PullTo
  },
  data () {
    return {
      photos:
      [
        { 'numbering': 'a', 'src': 'src/assets/images/a.jpg' },
        { 'numbering': 'b', 'src': 'src/assets/images/b.jpg' },
        { 'numbering': 'c', 'src': 'src/assets/images/c.jpg' },
        { 'numbering': 'd', 'src': 'src/assets/images/d.jpg' },
        { 'numbering': 'e', 'src': 'src/assets/images/e.jpg' },
        { 'numbering': 'f', 'src': 'src/assets/images/f.jpg' },
        { 'numbering': 'g', 'src': 'src/assets/images/g.jpg' },
        { 'numbering': 'h', 'src': 'src/assets/images/h.jpg' },
        { 'numbering': 'i', 'src': 'src/assets/images/i.jpg' },
        { 'numbering': 'j', 'src': 'src/assets/images/j.jpg' },
        { 'numbering': 'k', 'src': 'src/assets/images/k.jpg' },
        { 'numbering': 'l', 'src': 'src/assets/images/l.jpg' },
        { 'numbering': 'm', 'src': 'src/assets/images/m.jpg' },
        { 'numbering': 'n', 'src': 'src/assets/images/n.jpg' },
        { 'numbering': 'o', 'src': 'src/assets/images/o.jpg' }
      ],
      photos_left: [],
      photos_right: [],
      iconLink: '',
      loading: false,
      loadable: true
    }
  },
  mounted () {
    var that = this
    this.append(false)
    // 获取滑动事件
    window.onscroll = function () {
      // 判断是否到达底部，且所有图片是否超过90张
      if (that.check_scroll() && that.photos_left.length + that.photos_right.length <= 75) {
        // 显示正在加载中
        that.loading = true
        // 一次加载15张图片
        that.append(false)
        // 隐藏正在加载中
        that.loading = false
      }
      if (that.photos_left.length + that.photos_right.length === 90) {
        // 当超过90张，则隐藏可以加载更多
        that.loadable = false
      }
    }
  },
  methods: {
    refresh (loaded) {
      setTimeout(() => {
        // 重新刷新，又可以加载更多了
        this.loadable = true
        this.append(true)
        loaded('done')
      }, 2000)
    },
    // 判断是否滚到到底部
    check_scroll () {
      // 获取文档的高度
      var lastContentHeight = this.$refs.waterfalls.getBoundingClientRect().height
      // 获取滚动条高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(this.$refs.waterfalls.getBoundingClientRect().height)
      // 获取窗口高度
      var pageHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 窗口高度 + 滚动条高度 = 文档高度 （就到达底部了）
      if (lastContentHeight < scrollTop + pageHeight) {
        return true
      }
    },
    // 往图片数组追加元素
    append (isRefresh) {
      // 如果是下拉更新，则清空左右列表
      if (isRefresh) {
        this.photos_left = []
        this.photos_right = []
      }
      // 往左右列表新增元素
      for (var i = 0; i < this.photos.length; i++) {
        if (i % 2 === 0) {
          this.photos_left.push(this.photos[i])
        } else {
          this.photos_right.push(this.photos[i])
        }
      }
    }
  }
}
</script>

<style>
a {
  color: #42b983;
  text-decoration: none;
}
.column {
	display: inline-block;
	vertical-align: top;
	width: 45%;
}
header{
  position: absolute;
  left: 0;
  top: 2%;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  color: black;
  font-size: 20px;
  z-index: 10;
}
.pic_a {
	display: block;
	padding: 1px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	background-color: #fff;
	text-decoration: none;
  box-shadow:0 0 5px #ccc;
  border-radius: 5px;
}
.pic_a img {
	width: 95%;
	margin: 0 auto 1px;
	border: 0;
	vertical-align: bottom;
}
.pic_a .content_p_1{
  margin:0 0 -10px 0;
  font-size:14px;
  color:black;
}
.pic_a .content_p_2{
  margin:15px 0 5px -80p;
  font-size:14px;
}
.pic_a .content_p_span1{
  display: inline-block;
}
.pic_a .content_p_span2{
  display: inline-block;
}
.pic_a .content_p_2 .imgLink{
  width:13px;
}
</style>
