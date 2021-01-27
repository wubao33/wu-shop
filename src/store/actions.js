import {USER_INFO} from './mutations-type'
import {CART_INFO} from './mutations-type'
export default {
    syncUserInfo({commit},userInfo){
        commit(USER_INFO, {userInfo})
    },
    syncCartInfo({commit},shopCart){
        commit(CART_INFO, {shopCart})
    },
    // async reqUserInfo({commit}){
    //     // 2.1 从本地获取数据
    //     let userInfo = JSON.parse(getStore('userInfo'));
    //     if(userInfo){
    //         commit(USER_INFO, {userInfo});
    //     }else {
    //
    //     }
    // }
}
