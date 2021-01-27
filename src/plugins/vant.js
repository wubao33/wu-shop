import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { Notify } from 'vant';
Vue.use(Notify);
//loading
import { Loading } from 'vant';
Vue.use(Loading);
//懒加载
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
//提示
import { Toast } from 'vant';
Vue.use(Toast);
import { Dialog } from 'vant';
Vue.use(Dialog);


//购物车支付面板
import { NavBar } from 'vant';
Vue.use(NavBar);
import { ContactCard, ContactList, ContactEdit } from 'vant';

Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);

import { AddressList } from 'vant';
Vue.use(AddressList);
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);


//我的页面
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
import { Icon } from 'vant';

Vue.use(Icon);
