import Vue from 'vue';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools      = true;

import router from 'router/';
import 'register/';
import store from 'store/';

import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'cn'})
//插件封装
import common from './assets/js/common'
Vue.use(common);
//公用scss
import './assets/less/common.less'
//颜色配置
import './assets/less/color.less'

import App from './App';

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
//路由钩子之前
router.beforeEach((to, from, next) => {
    document.title = to.name;
    next()
    if(store.state.user.userinfo.state){
        next('/login')
    }
})
