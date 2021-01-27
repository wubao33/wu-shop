<template>
  <div id="mine" v-if="userInfo.token">
    <van-nav-bar
        title="我的"
        :fixed=true
        :border=false
    ></van-nav-bar>

    <van-cell-group style="margin-top: 2.6rem;">
      <van-cell
          style="background-color: #3bba63;color:#FFF;"
          is-link
          :center=true
          @click="$router.push({path:'/all/mine/userCenter'})"
      >
        <template slot="title">
          <div class="personMsg">
            <img class="iconImage" src="./images/favicon.png" alt="">
            <div class="personInfo">
              <span>用户：{{ userInfo.name }}</span>
              <span>手机号：{{userInfo.user_phone}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="label" title="我的订单" value="查看所有订单" ></van-cell>
      <van-grid>
        <van-grid-item
            v-for="(order, index) in orderData"
            :key="index"
            :icon="order.icon"
            :text="order.title">
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem;">
      <van-cell icon="label" title="我的收货地址" is-link @click="$router.push({path:'/Order/myAddress/editAddress'})"></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem;">
      <van-cell icon="phone" title="联系客服" value="客服QQ：1501876492" is-link ></van-cell>
      <van-cell icon="smile-comment" title="反馈意见"  is-link ></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem;">
      <van-cell icon="gift-card" title="关于" is-link ></van-cell>
    </van-cell-group>
    <!--路由的出口-->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <SelectLogin v-else/>
</template>

<script>
import SelectLogin from "@/views/login/SelectLogin";
import {mapState} from "vuex";
export default {
  name: "Mine",
  data(){
    return{
      orderData:[
        {icon:'cart-circle-o',title:'待支付'},
        {icon:'gift-o',title:'待收货'},
        {icon:'smile-comment-o',title:'待评价'},
        {icon:'cash-back-record',title:'售后/退款'},
      ]
    }
  },
  computed: {
    ...mapState(["userInfo"]),},
  methods:{

  },
  components:{
    SelectLogin
  }
}
</script>

<style lang="less" scoped>
#mine{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.van-nav-bar{
  background-color: #3bba63;
}
.van-nav-bar__title {
  color: #fff;
  font-size: 1rem;
}
.personMsg{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.personMsg>img{
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: 0.15rem solid #ffffff;
}
.personInfo {
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
}
.van-cell__left-icon {
  color: orangered;
  font-size: 1.2rem;
}
</style>
