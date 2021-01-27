import {
    ADD_GOODS,
    INIT_SGOP_CART,
    DELECT_CART,
    SINGER_SELECT,
    ALL_SELECT,
    CLEAR_CART,

    USER_INFO,
    INIT_USER_INFO,
    IS_LOGIN,
    RESET_USER_INFO,
    CART_INFO,
    RESET_CART_INFO,
    INSERT_GOODS

} from './mutations-type'
import {getStore,setStore,removeStore} from '@/config/global'
import Vue from 'vue'

export default {
    [IS_LOGIN] (state){
        let userInfo = state.userInfo;
        if(userInfo.token){
            return true
        }

    },
    [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}){

            let shopCart = state.shopCart;
            console.log(typeof shopCart);
        console.log(shopCart);
        //   Object.keys(shopCart).forEach(function (key) {
        //       console.log(key)
        //       console.log(shopCart[key].name)
        //
        //   })
        // console.log(goodsName)
            if (shopCart[goodsId]) {
                shopCart[goodsId]['num']++;
            } else {
                shopCart[goodsId] = {
                    "checked": true,
                    "id": goodsId,
                    "name": goodsName,
                    "num": 1,
                    "price": goodsPrice,
                    "small_image": smallImage,
                }
            }
            state.shopCart = {...shopCart};
        setStore('shopCart', state.shopCart)

    },
    [INSERT_GOODS](state,{goodsCheck,goodsId,goodsName,goodsNum,smallImage,goodsPrice}){

        let shopCart = state.shopCart;

            shopCart[goodsId] = {
                "checked": goodsCheck,
                "id": goodsId,
                "name": goodsName,
                "num": goodsNum,
                "price": goodsPrice,
                "small_image": smallImage,
            }
        console.log(shopCart);
        state.shopCart = {...shopCart};
        setStore('shopCart', state.shopCart)

    },
    [INIT_SGOP_CART](state){
        let initCart=getStore('shopCart')
        if (initCart){
            state.shopCart=JSON.parse(initCart)
        }
    },
    [DELECT_CART](state,{goodsId}){
        let shopCart=state.shopCart;
        let goods=shopCart[goodsId];
        if (goods){
            if (goods['num']>0){
                goods['num']--;
                if (goods['num']===0){
                    delete shopCart[goodsId]
                }
            }else {
                goods=null
            }
            // console.log(goods);
            state.shopCart={...shopCart}
            setStore('shopCart',state.shopCart)
        }
    },

    [SINGER_SELECT](state,{goodsId}){
        let shopCart=state.shopCart;
        console.log(typeof shopCart);
        console.log(shopCart);
        console.log(Object.values(shopCart));
        let goods=shopCart[goodsId];
        // console.log(goods);
            if(goods){
                if (goods.checked) {
                    goods.checked = !goods.checked
                } else {
                    Vue.set(goods, 'checked', true);
                }
                state.shopCart = {...shopCart}
                setStore('shopCart', state.shopCart)
            }
    },
    [ALL_SELECT](state,{isSelected}){
        let shopCart=state.shopCart;
        Object.values(shopCart).forEach((goods, index)=>{
            if(goods.checked){ // 存在该属性
                goods.checked = !isSelected;
            } else {
                Vue.set(goods, 'checked', !isSelected);
            }
            state.shopCart = {...shopCart}
        });
    },
    [CLEAR_CART](state){
        let shopCart=state.shopCart;
        shopCart=null;
        state.shopCart = {...shopCart};
        setStore('shopCart', state.shopCart)
    },


    // 7. 保存用户信息报本地
    [USER_INFO](state, {userInfo}){
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo);
    },
    //  保存购物车信息报本地
    [CART_INFO](state, {shopCart}){
        state.shopCart = shopCart;
        setStore('shopCart', state.shopCart);
    },


    // 8. 获取用户信息
    [INIT_USER_INFO](state){
        // 8.1 获取用户信息
        let userInfo = getStore('userInfo');
        // 8.2 判断
        if(userInfo){
            state.userInfo = JSON.parse(userInfo);
        }
    },
    // 9. 退出登录
    [RESET_USER_INFO](state){
        state.userInfo = {};
        removeStore('userInfo');
    },
    [RESET_CART_INFO](state){
        state.shopCart = {};
        removeStore('shopCart');
    }
}
