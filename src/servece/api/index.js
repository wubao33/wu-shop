import ajax from "@/servece/api/ajax";
const BASE_URL='http://localhost:3000';
export const getHomeData=()=>ajax(BASE_URL+'/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/sortList');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/sortList' + preParams);
// 2.1 获取短信验证码(GET)
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/phoneCode', {phone});
// 2.2 手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code},'POST');
export const postLogOut = (phone,shopCart)=> ajax(BASE_URL + '/api/logout',{phone,shopCart},'POST');

