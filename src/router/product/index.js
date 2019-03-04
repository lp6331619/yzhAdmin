/**
 * Created by sailengsi on 2017/5/11.
 */
import { Home, Content } from 'layout/';
import { Product, HomeBox } from 'views/';

export default {
    path: '/product',
    name: '产品管理',
    child: true,
    component: Home,
    redirect: '/product/travel/list1',
    children: [{
        path: 'home',
        name: '首页',
        icon: 'lvxing',
        hidden: true,
        redirect: '/product/home',
        component: Content,
        children: [{
            path: '',
            name: '首页',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: 'travel',
        name: '旅行产品',
        type: '3',
        child: true,
        icon: 'lvxing',
        redirect: '/product/travel/list1',
        component: Content,
        children: [{
            path: 'list1',
            name: '吃',
            component: Product.Travel.List,
        }, {
            path: 'list2',
            name: '住',
            component: Product.Travel.List2,
        }, {
            path: 'list3',
            name: '行',
            component: Product.Travel.List3,
        }, {
            path: 'list4',
            name: '娱',
            component: Product.Travel.List4,
        }, {
            path: 'list5',
            name: '购',
            component: Product.Travel.List5,
        }, {
            path: 'list6',
            name: '游',
            component: Product.Travel.List6,
        }, {
            path: 'list7',
            name: '路线',
            component: Product.Travel.List7,
        }, {
            path: 'list8',
            name: '通讯',
            component: Product.Travel.List8,
        }, {
            path: 'list9',
            name: '金融',
            component: Product.Travel.List9,
        }, {
            path: 'list10',
            name: '其他',
            component: Product.Travel.List10,
        }, {
            path: 'edit',
            name: '编辑',
            hidden: true,
            component: Product.Travel.Edit,
        }]
    }, {
        path: 'ticket',
        name: '票务产品',
        type: '2',
        icon: 'f4',
        child: true,
        component: Content,
        children: [{
            path: 'train',
            name: '火车票',
            child: true,
            component: Content,
            children: [{
                path: 'ticketClerk2',
                name: '票务',
                component: Product.Ticket.ListTick,
            }, {
                path: 'safeguarding2',
                name: '站点维护',
                component: Product.Ticket.List,
            }, {
                path: 'editTicket',
                name: '编辑',
                hidden: true,
                component: Product.Ticket.EditTicket,
            }, {
                path: 'edit',
                name: '编辑',
                hidden: true,
                component: Product.Ticket.EditSafeguarding,
            }]
        }, {
            path: 'automobile',
            name: '汽车票',
            child: true,
            component: Content,
            children: [{
                path: 'ticketClerk1',
                name: '票务',
                component: Product.Ticket.ListTick2,
            }, {
                path: 'safeguarding1',
                name: '站点维护',
                component: Product.Ticket.List2,
            }]
        }, {
            path: 'steamboat',
            name: '船票',
            child: true,
            component: Content,
            children: [{
                path: 'ticketClerk3',
                name: '票务',
                component: Product.Ticket.ListTick3,
            }, {
                path: 'safeguarding3',
                name: '站点维护',
                component: Product.Ticket.List3,
            }]
        }]
    }]
};