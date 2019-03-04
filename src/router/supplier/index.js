/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {Supplier} from 'views/';

export default {
	path: '/supplier',
	name: '供应商管理',
    child:true,
	component: Home,
    redirect: '/supplier/shop/list',
	children:[{
        path: 'shop',
        name: '供应商店铺',
				icon: 'dianpu',
        redirect: '/supplier/shop/list',
        component: Content,
        children:[{
            path: 'list',
            component: Supplier.Shop.List,
        },{
            path: 'edit',
            component: Supplier.Shop.Edit,
        }]
    },{
        path: 'product',
        name: '供应商产品',
				icon: 'chanpin-copy',
        redirect: '/supplier/product/list',
        component: Content,
        children:[{
            path: 'list',
            component: Supplier.Product.List,
        },{
            path: 'edit',
            component: Supplier.Product.Edit,
        }]
    },{
        path: 'ticket',
        name: '票务供应商',
				icon: 'gongkaobei',
        redirect: '/supplier/ticket/list',
        component: Content,
        children:[{
            path: 'list',
            component: Supplier.Ticket.List,
        },{
            path: 'edit',
            component: Supplier.Ticket.Edit,
        }]
    }]
};
