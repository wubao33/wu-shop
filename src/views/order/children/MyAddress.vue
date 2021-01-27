<template>
<div id="myAddress">
  <van-nav-bar
      title="我的地址"
      left-text=返回
      left-arrow
      :fixed=true
      :border=true
      @click-left="onClickLeft"
  />
  <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      style="margin-top: 3rem"
  />
  <transition name="router-slider" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "MyAddress",
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      chosenAddressId: '1',
      list: [
        // {
        //   // id: '1',
        //   // name: this.userInfo.name,
        //   // tel: '1320000000',
        //   // address: '浙江省杭州市滨江区江南大道 15 号',
        // },
      ],
    };
  },
  mounted() {
    this.list=[{
        id: '1',
        name: this.userInfo.name,
        tel: this.userInfo.user_phone,
        address: this.userInfo.user_address,
    }]
    console.log(this.list,this.userInfo)
    },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onAdd() {
      this.$router.push({path: '/Order/myAddress/addAddress'});
    },
    onEdit(item, index) {
      this.$router.push({path: '/Order/myAddress/editAddress'});
    },
  },

}
</script>

<style lang="less" scoped>
#myAddress{
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
}
.router-slider-enter-active, .router-slider-leave-active{
  transition: all 0.5s;

}
.router-slider-enter,.router-slider-leave-active{
  transform: translate3d(2rem,0,0);
  opacity: 0;
}
</style>
