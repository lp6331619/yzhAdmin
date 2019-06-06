/**
 * Created by sailengsi on 2017/5/11.
 */
import {
    Home,
    Content
} from 'layout/';
import {
    HomeBox,
    Notice,
    User,
    FundRecord,
    Recharge,
    Appeal,
    Suggest,
    PriceInfo,
    Invite,
    Task,
    Order
} from 'views/';
export default {

    path: '',
    name: '首页',
    component: Home,
    // redirect: '',
    children: [{
            path: 'home',
            name: '销量管理',
            redirect: '/home',
            child: true,
            component: Content,
            children: [{
                path: '',
                name: '计划列表',
                component: Task.List,
            }, {
                path: 'detail',
                hidden: true,
                name: '任务详情',
                component: Task.Detail,
            }, {
                path: 'edit',
                hidden: true,
                name: '编辑',
                component: Task.Edit,
            }, {
                path: 'orderList',
                name: '销量订单',
                component: Task.OrderList,
            }]
        }, {
            path: 'order',
            name: '订单列表',
            redirect: '/order/list',
            component: Content,
            children: [{
                path: 'list',
                name: '订单列表',
                component: Order.List,
            }, {
                path: 'detail',
                name: '详情页',
                component: Order.Detail,
            }]
        }, {
            path: 'fundRecord',
            name: '资金记录',
            redirect: '/fundRecord/list',
            component: Content,
            children: [{
                path: 'list',
                name: '资金记录',
                component: FundRecord.List,
            }]
        }, {
            path: 'user',
            name: '账户信息',
            redirect: '/user/list',
            component: Content,
            children: [{
                path: 'list',
                name: '账户信息',
                component: User.List,
            }, {
                path: 'edit',
                name: '商铺',
                component: User.Edit,
            }]
        }, {
            path: 'recharge',
            name: '充值/提现',
            redirect: '/recharge/home',
            component: Content,
            children: [{
                path: 'home',
                name: '充值',
                component: Recharge.Home,
            }]
        }, {
            path: 'appeal',
            name: '申诉管理',
            redirect: '/appeal/list',
            component: Content,
            children: [{
                path: 'list',
                name: '申诉管理',
                component: Appeal.List,
            }]
        }, {
            path: 'invite',
            name: '邀请好友',
            redirect: '/invite/list',
            component: Content,
            children: [{
                path: 'list',
                name: '邀请好友',
                component: Invite.List,
            }]
        }, {
            path: 'suggest',
            name: '意见建议',
            redirect: '/suggest/list',
            component: Content,
            children: [{
                path: 'list',
                name: '意见建议',
                component: Suggest.List,
            }]
        },
        // {
        //     path: '/orderList',
        //     name: '帮助中心',
        //     redirect: '/orderList',
        //     component: Content,
        //     children: [{
        //         path: '',
        //         name: '',
        //         component: HomeBox.HomeIndex,
        //     }]
        // }, 
        {
            path: 'priceInfo',
            name: '价格明细',
            redirect: '/priceInfo/list',
            component: Content,
            children: [{
                path: 'list',
                name: '价格明细',
                component: PriceInfo.List,
            }]
        }, {
            path: 'notice',
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
        }
    ],
};