<template>
  <div class="wrapper">
    <div class="titleWrapper">
      <div class="middleLine"></div>
      <div class="title">每日优惠</div>
    </div>
    <div>
      <div class="contentWrapper" >
    <DailyLikeItem
        v-for="(daily,index) in daily_list"
        :key="daily.id"
        :daily="daily"
    ></DailyLikeItem>
      </div>
    </div>
    <div>
      <div class="endWrapper" >
    <DailyEnd></DailyEnd>
      </div>
    </div>
  </div>
</template>

<script>
import DailyLikeItem from "@/views/home/components/DailyLike/DailyLikeItem";
import DailyEnd from "@/views/home/components/DailyLike/DailyEnd";
export default {
name: "DailyLike",
  props:{
  daily_list:Array
  },
  components:{
  DailyLikeItem,
    DailyEnd,
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 0.625rem;
}

.titleWrapper {
  position: relative;
  padding: 0 0.625rem;
  height: 2.1875rem;
  text-align: center; }

.middleLine {
  padding-top: 1.09375rem;
  border-bottom: solid 1px #D8D8D8;
}

.title {
  position: relative;
  display: inline-block;
  top: -1.09375rem;
  padding: 0 1.25rem;
  line-height: 2.1875rem;
  font-size: 1rem;
  background: #F5F5F5;
}
.titleWrapper {
  position: relative;
  padding: 0 0.625rem;
  height: 2.1875rem;
  text-align: center; }
</style>
