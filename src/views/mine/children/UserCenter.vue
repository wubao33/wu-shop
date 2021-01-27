<template>
   <div id="userCenter">
       <!--导航栏-->
       <van-nav-bar
               title="用户中心"
               left-arrow
               :fixed=true
               :border=true
               @click-left="$router.go(-1)"
       ></van-nav-bar>
       <div class="logout">
           <button @click="logOut">退出登录</button>
       </div>
   </div>
</template>

<script>
import {postLogOut} from './../../../servece/api/index'
import {mapMutations, mapState} from 'vuex'
    import {Toast} from 'vant'
import {RESET_CART_INFO} from "@/store/mutations-type";
    export default {
        name: "UserCenter",
      computed:{
        ...mapState(["userInfo","shopCart"]),

      },
        methods: {
            ...mapMutations(["RESET_USER_INFO", "RESET_CART_INFO","INIT_SGOP_CART"]),
         async logOut(){
              // this.INIT_SGOP_CART();
              console.log(this.userInfo);
           console.log(this.userInfo.user_phone);
           console.log(Object.values(this.shopCart));
                 let result=await postLogOut(this.userInfo.user_phone,this.shopCart);
                if(result[0].success_code) {
                    // 清空本地的数据
                    this.RESET_USER_INFO();
                    // 清空本地的购物车
                    this.RESET_CART_INFO();
                    Toast({
                       message: '退出登录成功！',
                       duration: 500
                    });
                  this.$router.push({path: '/all/mine'});
                }
            }
        }
    }
</script>

<style scoped>
   #userCenter{
       position: fixed;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       background-color: #f5f5f5;
       z-index: 200;
   }

   .logout{
       margin-top: 4rem;
       height: 2.5rem;
       width: 100%;
       background-color: #fff;
       display: flex;
       justify-content: center;
       align-items: center;
   }

   .logout button{
       background-color: transparent;
   }
</style>
