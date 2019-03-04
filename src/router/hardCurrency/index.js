/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {HardCurrency} from 'views/';

export default {
	path: '/hardCurrency',
	name: '营销管理',
    child:true,
	component: Home,
    redirect: '/hardCurrency/banner/list',
	children:[{
        path: 'banner',
        name: '首页banner',
				icon:'tupian',
        redirect: '/hardCurrency/banner/list',
        component: Content,
        children:[{
            path: 'list',
            name:'banner列表',
            component: HardCurrency.Banner.List,
        },{
            path: 'edit',
            name:'banner详情',
            hidden:true,
            component: HardCurrency.Banner.Edit,
        }],
    },{
        path: 'preferential',
        name: '优惠卷活动',
				icon:'youhuijuan',
        redirect: '/hardCurrency/preferential/list',
        component: Content,
        children:[{
            path: 'list',
            name:'优惠卷列表',
            component: HardCurrency.Preferential.List,
        },{
            path: 'edit',
            hidden:true,
            name:'优惠卷详情',
            component: HardCurrency.Preferential.Edit,
        }],
    }]
};
