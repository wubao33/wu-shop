<template>
  <swiper id="swiper" ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(sowing,index) in sowing_list" :key="sowing.public_id">
      <img :src="sowing.icon_url" :alt="sowing.public_name">
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide,} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/core'
SwiperClass.use([Pagination, Mousewheel, Autoplay])

export default {
  name: 'Sowing',
  props:{
    sowing_list:Array
  },
  data() {
    return {

      swiperOptions: {
        notNextTick:true,
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        loop:true,
        autoplay: {
          disableOnInteraction: false,
          delay: 1000,
          },
        speed:600,
        on: {
          slideChangeTransitionEnd: function () {
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          },

        },


      }
    }
  },
  computed:{
    swiper(){
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    //this.swiper.slideTo(3, 1000, false);
  },
  components: {
    Swiper,
    SwiperSlide,
  },
}
</script>

<style scoped>
#swiper{
  width: 100%;
  height: 14em;
}
#swiper img{
  width: 100%;
  height: 100%;
}
</style>
