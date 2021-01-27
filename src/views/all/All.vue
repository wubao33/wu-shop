<template>
  <div id="all">
    <van-tabbar v-model="active" active-color="skyblue">
      <van-tabbar-item replace to="/all/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/all/sort">
        <span>分类</span>
        <template #icon="props" >
          <img :src="props.active ? sort_icon.active : sort_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/all/cart" :badge="goodsNum>0? goodsNum:''">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? cart_icon.active : cart_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/all/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine_icon.active : mine_icon.inactive" />
        </template>
      </van-tabbar-item>

    </van-tabbar>

    <keep-alive>

       <router-view v-if="$route.meta.keepalive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"/>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      msg1:'',
      active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
      home_icon: {
        active:require('@/images/tabbar/home_selected.png'),
        inactive:require('@/images/tabbar/home_default.png')
      },
      sort_icon: {
        active:require('@/images/tabbar/sort_selected.png'),
        inactive:require('@/images/tabbar/sort.png')
      },
      cart_icon: {
        active:require('@/images/tabbar/shoppingcart_selected.png'),
        inactive:require('@/images/tabbar/shoppingcart_default.png')
      },
      mine_icon: {
        active:require('@/images/tabbar/mine_selected.png'),
        inactive:require('@/images/tabbar/mine_default.png')
      },
    };
  },
  created() {


    },
  watch:{

      active(value){
        // console.log(value);
        let tabBarActiveIndex = value > 0 ? value : 0;
        // 缓存到本地
        sessionStorage.setItem('tabBarActiveIndex', value);
    }
  },
  computed:{
    ...mapState(['shopCart','userInfo']),
    goodsNum(){
      if (this.shopCart){
        let num=0;
        Object.values(this.shopCart).forEach((goods)=>{
          num+=goods.num
        });
        return num
      }else {
        return 0;
      }
    }
  },

  //页面加载完获取购物车数据
  mounted(){

    this.INIT_SGOP_CART();
    this.INIT_USER_INFO();
    // console.log(this.shopCart,this.userInfo)
  },
  methods:{
    ...mapMutations(['INIT_SGOP_CART','INIT_USER_INFO'])
  }
}
</script>

<style lang="less" scoped>
#all{
  width: 100%;
  height: 100%;
  background-color: gold;
}
</style>

