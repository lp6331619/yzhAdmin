/**
 * Created by sailengsi on 2017/5/11.
 */
import { Home, Content } from 'layout/';
import { Order } from 'views/';

export default {
    path: '/order',
    name: '订单管理',
    child: true,
    component: Home,
    redirect: '/order/travel/list1',
    children: [{
        path: 'travel',
        type: '3',
        name: '旅行订单',
        child: true,
        icon: 'lvxing1',
        redirect: '/order/travel/list1',
        component: Content,
        children: [{
            path: 'list0',
            name: '下单',
            component: Order.Travel.List0,
        }, {
            path: 'list1',
            name: '预定',
            component: Order.Travel.List1,
        }, {
            path: 'list2',
            name: '部分付款',
            component: Order.Travel.List2,
        }, {
            path: 'list3',
            name: '已付款',
            component: Order.Travel.List3,
        }, {
            path: 'list4',
            name: '待出行',
            component: Order.Travel.List4,
        }, {
            path: 'list6',
            name: '改签',
            component: Order.Travel.List6,
        }, {
            path: 'list7',
            name: '退款',
            component: Order.Travel.List7,
        }, {
            path: 'list8',
            name: '已取消',
            component: Order.Travel.List8,
        }, {
            path: 'list5',
            name: '已出行',
            component: Order.Travel.List5,
        }, {
            path: 'edit',
            name: '编辑',
            hidden: true,
            component: Order.Travel.Edit,
        }]
    }, {
        path: 'ticket',
        name: '票务订单',
        type: '2',
        child: true,
        icon: 'travelOrder',
        redirect: '/order/ticket/list1',
        component: Content,
        children: [{
                path: 'list1',
                name: '待处理',
                component: Order.Ticket.List1,
            }, {
                path: 'list0',
                name: '待付款',
                component: Order.Ticket.List0,
            }, {
                path: 'list2',
                name: '已出票',
                component: Order.Ticket.List2,
            }, {
                path: 'list4',
                name: '已改签',
                component: Order.Ticket.List4,
            }, {
                path: 'list5',
                name: '已退款',
                component: Order.Ticket.List5,
            }, {
                path: 'list6',
                name: '已取消',
                component: Order.Ticket.List6,
            },
            //  {
            //     path: 'list3',
            //     name: '已出行',
            //     component: Order.Ticket.List3,
            // },
            {
                path: 'edit',
                name: '编辑',
                hidden: true,
                component: Order.Ticket.Edit,
            }
        ]
    }]
};