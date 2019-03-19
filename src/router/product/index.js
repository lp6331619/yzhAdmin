/**
 * Created by sailengsi on 2017/5/11.
 */
import { Home, Content } from 'layout/';
import { Product, HomeBox, Notice, User } from 'views/';

export default {
    path: '',
    name: '首页',
    component: Home,
    // redirect: '',
    children: [{
        path: '/home',
        name: '任务列表',
        redirect: '/home',
        component: Content,
        children: [{
            path: '/home',
            name: '首页',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '订单列表',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '资金记录',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/user',
        name: '账户信息',
        redirect: '/user/list',
        component: Content,
        children: [{
            path: 'list',
            name: '账户信息',
            component: User.List,
        }, {
            path: 'detail',
            name: '商铺',
            component: User.edit,
        }]
    }, {
        path: '/orderList',
        name: '充值',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '申诉管理',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '邀请好友',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '意见建议',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/orderList',
        name: '帮助中心',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    }, {
        path: '/notice',
        name: '公告列表',
        hidden: true,
        redirect: '/notice/list',
        component: Content,
        children: [{
            path: 'list',
            name: '公告列表',
            component: Notice.List,
        }, {
            path: 'detail',
            name: '公告详情',
            component: Notice.Edit,
        }]
    }],
};