<template>
<div id="addAddress">
  <van-nav-bar
      title="添加地址"
      left-arrow
      :fixed=true
      :border=true
      @click-left="onClickLeft"
  />
  <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
  />

</div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: "AddAddress",
  data() {
    return {
      areaList:{},
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast('save');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft(){
      this.$router.back();
    },
  }

}
</script>

<style scoped>
#addAddress {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>
