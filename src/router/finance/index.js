/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {Finance} from 'views/';

export default {
	path: '/finance',
	name: '财务管理',
  child:true,
	component: Home,
  redirect: '/finance/supplier/withdrawing',
	children:[{
        path: 'supplier',
        name: '供应商提现',
				icon: 'tixian1',
        child:true,
        redirect: '/finance/supplier/withdrawing',
        component: Content,
        children:[{
            path: 'withdrawing',
            name:'提现审核',
            component: Finance.List,
        },{
            path: 'remittance',
            name:'汇款处理',
            component: Finance.List2,
        },{
            path: 'withdrawingEdit',
            hidden:true,
            component: Finance.Edit,
        },{
            path: 'remittanceEdit',
            hidden:true,
            component: Finance.Edit2,
        }]
    }]
};
