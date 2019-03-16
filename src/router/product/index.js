/**
 * Created by sailengsi on 2017/5/11.
 */
import { Home, Content } from 'layout/';
import { Product, HomeBox,Notice } from 'views/';

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
            name: '首页1',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '订单列表',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '资金记录',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '账户信息',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '充值',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '申诉管理',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '邀请好友',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '意见建议',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/orderList',
        name: '帮助中心',
        redirect: '/orderList',
        component: Content,
        children: [{
            path: '',
            name: '',
            component: HomeBox.HomeIndex,
        }]
    },{
        path: '/notice',
        name: '公告列表',
        redirect: '/notice/list',
        component: Content,
        children: [{
            path: 'list',
            name: '公告列表',
            component: Notice.List,
        },{
            path: 'info',
            name: '公告详情',
            component: Notice.Edit,
        }]
    }],

//     任务列表。 计划列表
//        发布任务
// 订单列表   销量订单
// 资金记录。资金明细
// 账户信息（账户信息及绑定店铺）。
// 充值   
// 申诉管理   机器猫 申诉中心
// 邀请好友。 机器猫。邀请好友
// 意见建议   机器猫
// 帮助中心。 机器猫
};