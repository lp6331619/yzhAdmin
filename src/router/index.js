/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login,HomeBox,Iframe} from 'views/';

import Order from './order/';
import Product from './product/';
import Supplier from './supplier/';
import Admin from './admin/';
import Appraisal from './appraisal/';
import HardCurrency from './hardCurrency/';
import Finance from './finance/';

export default new Router({
	routes: [
		{
			path  : '/',
			name  : 'home',
			hidden: true,
			redirect(to){
				return 'product/home';
			}
		},
		{
			path     : '/iframe',
			name     : 'iframe',
			hidden   : true,
			component: Iframe
		},
		{
			path     : '/login',
			name     : '登录',
			hidden   : true,
			component: Login
		},
		Order,
		Product,
		HardCurrency,
		Supplier,
		Appraisal,
		Finance,
		Admin
	]
})
