<template>
<div id="order">
  <van-nav-bar
      title="填写订单"
      left-text=返回
      left-arrow
      :fixed=true
      :border=true
      @click-left="onClickLeft"
  />
  <van-contact-card
      type="add"
      add-text="选择收货地址"
      style="margin-top: 3rem"
      @click="chooseAddress"
  />
  <van-cell-group>
    <van-cell  :value="`共${goodsCount}件`" is-link :center=true>
      <template slot="title">
        <img v-for="(goods, index) in threeShopCart" :src="goods.small_image" alt="" style="width: 3rem;">
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group style="margin-top: 0.6rem">
    <van-cell title="支付方式" value="支付宝" ></van-cell>
  </van-cell-group>

  <van-cell-group style="margin-top: 0.6rem">
    <van-cell title="备注" >
        <input type="text" placeholder="选填，备注您的需求">
    </van-cell>
  </van-cell-group>
    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额" :value="`¥${totalPrice}`"></van-cell>
      <van-cell title="配送费" :value="`¥${disPrice}`"></van-cell>
    </van-cell-group>

  <van-submit-bar :price="totalPrice*100 + disPrice*100"
                  button-text="提交订单"
                  label="实付"
                  @submit="onSubmit" ></van-submit-bar>




<transition name="router-slider" mode="out-in">
  <router-view></router-view>
</transition>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Order",
  computed:{
    ...mapState(['shopCart', 'userInfo']),
    // 商品总件数
    goodsCount(){
      let selectedGoodsCount = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(goods.checked){
          selectedGoodsCount += 1;
        }
      });
      return selectedGoodsCount;
    },
    // 商品总价
    totalPrice(){
      let totalPrice = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(goods.checked){
          totalPrice += goods.price * goods.num;
        }
      });
      return totalPrice.toFixed(2);
    },
    //  取购物车中前三件选中的
    threeShopCart(){
      let shopCart = [];
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(goods.checked){
          shopCart.push(goods);
        }
      });
      return shopCart.slice(0, 3);
    },
    // 配送费
    disPrice(){
      // 商品总价 > 40 免配送费  <40 6元
      if(this.totalPrice > 40){
        return 0;
      }else {
        return 6;
      }
    }
  },
  methods:{
    onClickLeft(){
      this.$router.back();
    },
    chooseAddress(){
      this.$router.push('/Order/myAddress');
    },
    onSubmit(){

    }

  }
}
</script>

<style lang="less" scoped>
#order{
  width: 100%;
  height: 100%;
  background-color:#f5f5f5;
}
.router-slider-enter-active, .router-slider-leave-active{
  transition: all 0.5s;

}
.router-slider-enter,.router-slider-leave-active{
  transform: translate3d(2rem,0,0);
  opacity: 0;
}
</style>
