<template>
  <div class="wrapper">
  <div class="endWrapper">
    <div class="middleLine"></div>
    <div class="title">没有更多了</div>
  </div>
  </div>
</template>

<script>
export default {
  name: "DailyEnd"
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 0.625rem;
  margin-bottom: 3rem;
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
  color: #11abff;
  background: #F5F5F5;
}
.endWrapper {
  position: relative;
  padding: 0 0.625rem;
  height: 2.1875rem;
  text-align: center; }
</style>
