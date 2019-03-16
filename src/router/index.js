/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login,HomeBox} from 'views/';
import Product from './product/';

export default new Router({
	routes: [
		{
			path  : '/',
			name  : 'home',
			hidden: true,
			redirect(to){
				return '/home';
			}
		},
		{
			path     : '/login',
			name     : '登录',
			hidden   : true,
			component: Login
		},
		Product,
	]
})
