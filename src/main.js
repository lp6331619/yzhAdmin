import Vue from 'vue';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools = true;

let url = ''
if (window.location.host.indexOf('user.youzihui.net') != -1) {
    url = 'http://yzh.youzihui.net'
} else if (window.location.host.indexOf('userbeta.youzihui.net') != -1) {
    url = 'http://yzhbeta.youzihui.net'
} else if (window.location.host.indexOf('localhost') != -1) {
    url = '/AdminApi'
}

Vue.prototype.url = url

import router from 'router/';
import 'register/';
import store from 'store/';

import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {
    locale: 'cn'
})
// //插件封装
import common from './assets/js/common'
Vue.use(common);

//插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//公用scss
import './assets/less/common.less'
//颜色配置
import './assets/less/color.less'

import 'swiper/dist/css/swiper.css';

import App from './App';
//路由钩子之前
router.beforeEach((to, from, next) => {
    document.title = `柚子汇-${to.name}`;
    next()
    if (store.state.user.userinfo.token == undefined) {
        if (to.path != '/login')
            next('/login')
    }
})
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
