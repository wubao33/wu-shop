<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/login.png" alt="" width="150">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current:loginMode}" @click="dealLoginMode(true)">手机登录</a>
          <a href="javascript:;" :class="{current:!loginMode}" @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:loginMode}">
            <section class="login-message">
              <input type="text" maxlength="11" placeholder="手机号" v-model.trim="phone">
              <button v-if="!countDown"  class="get-verification" :class="{phone_right:phoneRight}" @click.prevent="getVerifyCode()">获取验证码</button>
              <button v-else disabled="disabled" class="get-verification">
                  已发送({{ countDown }}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model.trim="code"/>
            </section>
            <section class="login-hint">
              温馨提示：未注册的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="user_name">
              </section>
              <section class="login-verification">
                <input v-if="pwdMode"  type="password" maxlength="20" placeholder="密码" autocomplete="off" v-model="pwd"/>
                <input v-else type="text" maxlength="20" placeholder="密码" autocomplete="off" v-model="pwd"/>
                <div class="switch-show">
                  <img src="./images/hide_pwd.png" @click.prevent="dealPwdMode(false)" :class="{on:pwdMode}" alt="" width="20">
                  <img src="./images/show_pwd.png" @click.prevent="dealPwdMode(true)" :class="{on:!pwdMode}" alt="" width="20">
                </div>
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login">登录</button>
        </form>
        <button class="login-back" @click.prevent="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhoneCode, phoneCodeLogin} from './../../servece/api/index'
import {mapActions, mapMutations, mapState} from 'vuex'
import {Toast} from 'vant'
import {Dialog} from 'vant'
import {INIT_SGOP_CART} from "@/store/mutations-type";
export default {
name: "Login",
  data(){
   return{
     //登录模式
     loginMode:true,
     phone:null,
     countDown:0,
     code:null,
     // userInfo: null,


     user_name:'',
     pwd:'',
     pwdMode:true,
     captcha:null
   }
  },
  computed:{
    phoneRight(){
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
    },
    ...mapState(["userInfo","shopCart"])
  },
  methods:{
     ...mapActions(['syncUserInfo','syncCartInfo']),
    ...mapMutations(['INIT_SGOP_CART','INSERT_GOODS']),

    dealLoginMode(flag){
      this.loginMode=flag
    },
    async getVerifyCode(){
      if (this.phoneRight){
        this.countDown=60;
        this.intervalId=setInterval(()=>{
          this.countDown--;
          if (this.countDown===0){
            clearInterval(this.intervalId)
          }
        },1000);

        let result=await getPhoneCode(this.phone)
        console.log(result)
        Dialog.alert({
          message: '验证码为：'+result.code,
        }).then(() => {
          // on close
        });

      }
    },
    async login(){
      if(this.loginMode){//手机登录
        if(!this.phone){
          Toast({
            message:'请输入手机号码',
            duration:500,
          })
          return ;
        }else if (!this.phoneRight){
          Toast({
            message:'请输入正确的手机号码',
            duration:500
          });
          return;
        }
          if(!this.code){
            Toast({
              message:'请输入验证码',
              duration:500
            })
            return;
          }else if (!(/^\d{6}$/gi.test(this.code))){
            Toast({
              message:'请输入正确的验证码',
              duration:500
            });
            return;
          }

          let result=await phoneCodeLogin(this.phone,this.code)
         console.log(result);
          if(result[0].success_code){
              this.syncUserInfo(result[0]);
              if(result[0].data!==null){
              console.log(result[0].data);
                let data=JSON.parse(result[0].data)
                // console.log(typeof Object.values(this.shopCart));
                for (let i in data){
                  let data1=data[i];
                  let goodsCheck=Object.values(data1)[0]
                    let goodsId=Object.values(data1)[1]
                    let goodsName=Object.values(data1)[2]
                    let goodsNum=Object.values(data1)[3]
                    let goodsPrice=Object.values(data1)[4]
                    let smallImage =Object.values(data1)[5]
                  // console.log(a,b,c,d,e,f)
                  this.INSERT_GOODS({
                    goodsCheck,
                    goodsId,
                    goodsName,
                    goodsNum,
                    smallImage,
                    goodsPrice
                  })
                }
             // Object.keys(data).forEach(function (key) {
             //   let data1=data[key];
             //   console.log(Object.values(data1)[0])
             //   let a=Object.values(data1)[0]
             //   let b=Object.values(data1)[1]
             //   let c=Object.values(data1)[2]
             //   let d=Object.values(data1)[3]
             //   let e=Object.values(data1)[4]
             //   let f=Object.values(data1)[5]
             //   const shop={
             //     "checked": a,
             //     "id": b,
             //     "name": c,
             //     "num": d,
             //     "price": e,
             //     "small_image": f,
             //
             //   }
             //   return shop;
             //   // this.shopCart.push(shop);
             //   // console.log(this.shopCart)
             //   // Object.keys(data1).forEach(function (key1) {
             //   //   arr.push({key:data1[key1]})
             //   // })
             // })
                // console.log(Object.values(this.shopCart))


                // this.INIT_SGOP_CART();
                // console.log(this.shopCart)
              }

              this.$router.back();

          }else {
            this.userInfo={
              message:'登录失败，手机号码不正确或验证码不正确'
            }
          }
      }else {
      //   //用户登录
      //   let userInfo=JSON.parse(localStorage.getItem("userInfo"))
      //   console.log(userInfo.phone);
      //   console.log(Number(this.user_name));
      //   if (!this.user_name) {
      //     Toast({
      //       message: '请输入用户名',
      //       duration: 500
      //     });
      //     return;
      //   } else if (!this.pwd) {
      //     Toast({
      //       message: '请输入密码',
      //       duration: 500
      //     });
      //     return;
      //   } else if (!this.captcha) {
      //     Toast({
      //       message: '请输入验证码',
      //       duration: 500
      //     });
      //     return;
      //   }
      //   let name=Number(this.user_name)
      //   let pwd=Number(this.pwd)
      //   if(name===userInfo.phone && pwd===userInfo.pwd){
      //     this.$router.push({path:'/all/home'});
      //
      //   }else {
      //     this.userInfo={
      //       message:'登录失败，用户名不正确或密码不正确'
      //     }
      //   }
      }
    },
    //  处理密码的显示
    dealPwdMode(flag){
      this.pwdMode = flag;
    },
    //  获取随机图形验证码
    // getCaptcha(){
    //   // 1.获取验证码的标签
    //   let captchaEle = this.$refs.captcha;
    //   this.$set(captchaEle, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date());
    //   // console.log(captchaEle);
    // }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
}

.login-container .login-inner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.login-container .login-inner .login-header .login-logo {
  font-size: 40px;
  font-weight: bold;
  color: #75a342;
  text-align: center
}

.login-container .login-inner .login-header .login-header-title {
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
}

.login-container .login-inner .login-header .login-header-title > a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
  text-decoration: none;
}

.login-container .login-inner .login-header .login-header-title > a:first-child {
  margin-right: 40px
}

.login-container .login-inner .login-header .login-header-title > a.current {
  color: #75a342;
  font-weight: 700;
  border-bottom: 2px solid #75a342
}

.login-container .login-inner .login-content > form > div {
  display: none;
}

.login-container .login-inner .login-content > form > div.current {
  display: block
}

.login-container .login-inner .login-content > form > div input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}

.login-container .login-inner .login-content > form > div input:focus {
  border: 1px solid #75a342
}

.login-container .login-inner .login-content > form > div .login-message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container .login-inner .login-content > form > div .login-message .get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.login-container .login-inner .login-content > form > div .login-message .get-verification.phone_right {
  color: #75a342
}

.login-container .login-inner .login-content > form > div .login-verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show {
  position: absolute;
  right: 10px;
  top: 12px;
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show img {
  display: none
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show img.on {
  display: block
}

.login-container .login-inner .login-content > form > div .login-hint {
  margin-top: 12px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.login-container .login-inner .login-content > form > div .login-hint > a {
  color: #75a342
}

.login-container .login-inner .login-content > form .login-submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #75a342;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0
}

.login-container .login-inner .login-content .login-back {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 15px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #75a342;
  color: #75a342;
  text-align: center;
  font-size: 16px;
  line-height: 42px
}
</style>
