<template>
  <div id="sort" >
  <Header></Header>
    <div class="listWrapper" v-if="!showLoading">
    <div class="leftWrapper">
      <ul class="wrapper">
        <li class="categoryItem"
            v-for="(left,index) in getDataleft"
            :class="{selected:currentIndex===index}"
            @click.stop="clickLeft(index)"
            :key="left.id"
            ref="menuList"
        >
          <span class="textWrapper">{{ left.name }}</span>
        </li>
      </ul>
    </div>
      <ConterRight :getDataright="getDataright"/>

    </div>
    <van-loading
        v-else type="spinner"
        color="blue"
        size="24px"
        style="position: absolute;left: 50%;top: 40%;transform: translate(-50%)">
      数据加载中...
    </van-loading>
  </div>
</template>

<script>
import Header from "@/views/sort/components/Header";
import ConterRight from "@/views/sort/components/ConterRight";
import BScroll from 'better-scroll'
import {getCategories, getCategoriesDetail} from "@/servece/api";

import PubSub from 'pubsub-js';
import { Toast } from 'vant';
import {mapMutations} from 'vuex'


export default {
  name: "Sort",
  data(){
    return{
      showLoading:false,
      getDataleft:[],
      getDataright:[],

      currentIndex:0,

    }
  },
  created() {
    this.initData();
  },
  mounted(){
    PubSub.unsubscribe('sortAddToCart');
    PubSub.subscribe('sortAddToCart',(msg,goods)=>{
      if (msg==='sortAddToCart'){
        this.ADD_GOODS({
          goodsId:goods.id,
          goodsName:goods.name,
          smallImage:goods.small_image,
          goodsPrice:goods.price
        });
        console.log(111)
        Toast({
          message:'添加到购物车成功！',
          duration:800
        })
      }
    })
  },
  components:{
    Header,
    ConterRight,
  },
  methods: {
    // 1. 初始化操作(数据和界面)
    async initData() {
      // 1. 获取左边的数据
      let leftRes = await getCategories();
      if (leftRes.success) {
        this.getDataleft = leftRes.data.cate;
      }

      // 2. 获取右边的数据
      let rightRes = await getCategoriesDetail('/001');
      if (rightRes.success) {
        this.getDataright = rightRes.data.cate;
      }

      // 3. 隐藏loading框
      this.showLoading = false;

      // 4. 初始化滚动框架
      this.$nextTick(() => {
        this.leftScroll = new BScroll('.leftWrapper', {
          probeType: 3,
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: true
        })
      });
    },

    async clickLeft(index){
      this.currentIndex=index;
      let menuLists = this.$refs.menuList;
      let el = menuLists[index];

      // 2.3 滚动到对应元素上
      this.leftScroll.scrollToElement(el, 300);

      let rightRes = await getCategoriesDetail(`/00${index + 1}`);
      if (rightRes.success) {
        this.getDataright = rightRes.data.cate;
      }
    },
    ...mapMutations(["ADD_GOODS"]),

}

}
</script>

<style lang="less" scoped>
#sort{
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  overflow: hidden;
}
.listWrapper{
  display: flex;
  position: absolute;
  top: 2.7rem;
  bottom: 3rem;
  overflow: hidden;
}
.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #F4F4F4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 1px #E8E9E8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #FFF;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 1px solid #E8E9E8;
  }

  .wrapper .categoryItem {
    background: #F5F5F5;
  }
}
</style>
