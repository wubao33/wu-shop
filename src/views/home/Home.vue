<template>
<div id="home">
  <div v-show="!showLoading">
    <Header></Header>
    <Sowing :sowing_list="sowing_list"></Sowing>
    <Nav :nav_list="nav_list"></Nav>
    <Flash :flash_list="flash_list"></Flash>
    <DailyLike :daily_list="daily_list"></DailyLike>
    <GoTop v-show="showToTop" :scrollToTop="scrollToTop"></GoTop>

  </div>
  <van-loading
      v-show="showLoading"
      type="spinner"
      color="blue"
      size="24px"
     style="position: absolute;left: 50%;top: 40%;transform: translate(-50%)">
    数据加载中...
  </van-loading>
</div>
</template>

<script>
import {getHomeData} from './../../servece/api/index'
import Header from "@/views/home/components/Header/Header";
import Sowing from "@/views/home/components/Sowing/Sowing";
import Nav from "@/views/home/components/Nav/Nav";
import Flash from "@/views/home/components/Flash/Flash";
import DailyLike from "@/views/home/components/DailyLike/DailyLike";
import GoTop from "@/views/home/components/GoTop/GoTop";



import {showBack,animate} from "@/config/global";
import PubSub from 'pubsub-js';
import { Toast } from 'vant';

import {mapMutations,mapState} from 'vuex'
export default {
name: "Home",
  data() {
    return {
    sowing_list: [],

      nav_list:[],

      flash_list:[],

      daily_list:[],

      showLoading:true,
      showToTop:false,

  }
  },
  components: {
  Header,
    Sowing,
    Nav,
    Flash,
    DailyLike,
    GoTop,
  },
  created(){
  this.reqData();
   // getHomeData().then((response)=>{
   //   console.log(response);
   //   if (response.success){
   //     this.sowing_list=response.data.list[0].icon_list;
   //     this.nav_list=response.data.list[2].icon_list;
   //     this.flash_list=response.data.list[3].product_list;
   //     this.daily_list=response.data.list[12].product_list;
   //
   //     this.showLoading=false;
   //     showBack((status)=>{
   //       this.showToTop=status;
   //     });
   //
   //   }
   // }).catch(error=>{
   //
   // })

  },
  computed:{
  ...mapState(["userInfo"]),

  },
  mounted(){
  PubSub.subscribe('homeAddToCart',(msg,goods)=>{

      if (msg === 'homeAddToCart') {
         if (Object.values(this.userInfo).length===0){
           Toast({
             message: '请先登录！',
             duration: 800
           })
     } else {
        this.ADD_GOODS({
          goodsId: goods.id,
          goodsName: goods.name,
          smallImage: goods.small_image,
          goodsPrice: goods.price
        });
        Toast({
          message: '添加到购物车成功！',
          duration: 800
        });
     }}
    // console.log(Object.values(this.userInfo).length)
  });
  },
  methods:{
  //同步获取数据
  async reqData(){
    let res=await getHomeData();
     if (res.success){
        this.sowing_list=res.data.list[0].icon_list;
        this.nav_list=res.data.list[2].icon_list;
        this.flash_list=res.data.list[3].product_list;
        this.daily_list=res.data.list[12].product_list;

        this.showLoading=false;
        showBack((status)=>{
          this.showToTop=status;
        });

      }
  },
  scrollToTop(){
    let docB=document.documentElement || document.body;
    animate(docB,{scrollTop:'0'},400,'ease-out')
  },
    ...mapMutations(["ADD_GOODS","INIT_USER_INFO"]),
  },
}



</script>

<style lang="less" scoped>
#home{
  width: 100%;
  height: 100%;
  background-color:#F5F5F5;
}
</style>
