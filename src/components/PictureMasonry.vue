<template>
  <div id="waterfalls" ref="container" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)">
      <!-- 下拉刷新样式 -->
      <div class="vue-pull-refresh-msg">
         <div v-if="down_loading">
            <img src="src/assets/images/loading.gif" class="vue-pull-refresh-loading"/>
            正在加载
         </div>
         <div v-else>
            <img src="src/assets/images/arrow.JPG" :class="{'icon-reverse': flag}"
             style="width: 1rem; height: 1rem; vertical-align: middle;overflow: hidden;" />
            {{msg}}
         </div>
      </div>

      <!-- 显示的内容 -->
      <div>
          <!-- 导入自定义的组件masonry，创建左边瀑布流 -->
          <div class="column" id = 'pic_left'>
              <masonry v-for="photo in photos_left" v-bind:item="photo"></masonry>
          </div>
          <!-- 导入自定义的组件masonry，创建右边瀑布流 -->
          <div class="column" id = 'pic_right'>
              <masonry v-for="photo in photos_right" v-bind:item="photo"></masonry>
          </div>
      </div>

      <!-- 上拉加载更多样式 -->
      <div class="loadmore_footer">
          <div v-if="up_loading">
             正在加载中
          </div>
          <div v-else-if="loadable">
             上拉加载更多
          </div>
          <div v-else>
             全部加载完毕
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'waterfalls',
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
      down_loading: false,  // 下拉更新加载中
      up_loading: false,  // 上拉加载加载中
      loadable: true,   // 是否加载完成
      reverse: 0,    // 左右两列图片添加顺序反转，避免出现某一列太长
      msg: '',  // 下拉刷新的提示消息
      flag: 0,   // 下拉刷新的箭头向上还是向下
      touchStart: 0,  // 手指触摸屏幕的起点
      distance: 0     // 手指滑动的距离
    }
  },
  mounted () {
    // 保存当前的this指向
    var that = this
    // 初始的时候，先添加图片，传入的参数为false代表非刷新状态，true代表刷新状态
    this.append(false)
    // 监听滑动事件
    window.onscroll = function () {
      // 判断是否到达底部，且所有图片是否超过90
      if (that.check_scroll() && that.photos_left.length + that.photos_right.length <= 75) {
        // 显示正在加载中
        that.up_loading = true
        // 一次加载15张图片
        that.append(false)
        // 隐藏正在加载中
        that.up_loading = false
      }
      if (that.photos_left.length + that.photos_right.length === 90) {
        // 当超过90张，则隐藏可以加载更多
        that.loadable = false
      }
    }
  },
  methods: {
    // 下拉刷新调用的函数
    refresh () {
      setTimeout(() => {
        // 重新刷新，又可以加载更多了
        this.down_loading = false
        // 获取container元素
        const container = this.$refs.container
        container.scrollTop = 0
        container.style.overflow = 'auto'
        container.style.transform = 'translate3D(0px, 0px, 0px)'
        this.loadable = true
        this.append(true)
      }, 2000)
    },
    // 判断是否滚到到底部
    check_scroll () {
      // 获取文档的高度
      var lastContentHeight = this.$refs.container.getBoundingClientRect().height
      // 获取滚动条高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(this.$refs.container.getBoundingClientRect().height)
      // 获取窗口高度
      var pageHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 窗口高度 + 滚动条高度 = 文档高度 （就到达底部了），  这里 + 50 是因为一开始margin-top:-50px
      if (lastContentHeight < scrollTop + pageHeight + 50) {
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
      // 左右两边进行反转，避免有某一列长度过长
      if (this.reverse === 0 && !isRefresh) {
        this.reverse = 1
      } else {
        this.reverse = 0
      }
      // 往左右列表新增元素
      for (var i = 0; i < this.photos.length; i++) {
        if (i % 2 === this.reverse) {
          this.photos_left.push(this.photos[i])
        } else {
          this.photos_right.push(this.photos[i])
        }
      }
    },
    // 手指点击事件
    touchstart (e) {
      // 如果loading为true就代表刷新函数正在进行，此时阻止操作，返回
      if (this.up_loading || this.down_loading) {
        e.preventDefault()
        return
      }
      // 取第一个手指的触摸点作为起始点
      this.touchStart = e.targetTouches[0].clientY
    },
    // 手指拖动事件
    touchmove (e) {
      const container = this.$refs.container
      // 如果没有触摸起始点，返回
      if (!this.touchStart) {
        return
      }
      // 如果loading为true就代表刷新函数正在进行，此时阻止操作，返回
      if (this.up_loading || this.down_loading) {
        e.preventDefault()
        return
      }
      const touch = e.targetTouches[0]
      // 计算滑动的距离
      this.distance = touch.clientY - this.touchStart
      if (this.distance > 0) {
        e.preventDefault()
        // 80为允许下拉的高度
        if (this.distance < 80) {
          container.style.overflow = 'inherit'
          container.style.transform = 'translate3D(0px, ' + this.distance + 'px, 0px)'
          if (this.distance > 55) {
            this.msg = '释放刷新'
            // flag=1代表是释放刷新的状态 flag=0 代表下拉刷新状态
            this.flag = 1
          } else {
            this.msg = '下拉刷新'
          }
        }
      }
    },
    // 手指放开事件
    touchend (e) {
      const container = this.$refs.container
      // 如果没有滑动，则不处理，直接返回
      if (this.distance === 0) {
        return
      }
      // 如果loading为true就代表刷新函数正在进行，此时阻止操作，返回
      if (this.up_loading || this.down_loading) {
        e.preventDefault()
        return
      }
      // flag=1代表是释放刷新的状态
      if (this.flag && this.distance > 0) {
        container.style.transform = 'translate3D(0px, 50px, 0px)'
        this.down_loading = true
        this.flag = 0
        // 调用刷新函数
        this.refresh()
        return
      }
      // 重置变量
      this.flag = 0
      container.style.overflow = 'auto'
      container.style.transform = 'translate3D(0px, 0px, 0px)'
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
.vue-pull-refresh-msg {
  margin-top: -50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.vue-pull-refresh-msg .icon-reverse {
  transform: rotate(180deg);
  transition: all .3s ease;
}
.vue-pull-refresh-loading {
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
  overflow: hidden;
  -webkit-animation:loadRotate 1s linear infinite;
  animation:loadRotate 1s linear infinite;
}
@-webkit-keyframes loadRotate{
  from{
    -webkit-transform: rotate(0deg);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
}
@keyframes loadRotate{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
