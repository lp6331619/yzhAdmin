/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [{
    name: '旅行产品订单',
    method: 'lists',
    path: '/order/lists',
    type: 'get',
}, {
    name: '旅行产品订单详情',
    method: 'orderId',
    path: '/order/detail',
    type: 'get',
}, {
    name: '旅行产品订单处理',
    method: 'edit',
    path: '/order/edit',
    type: 'post',
}, {
    name: '票务产品订单详情',
    method: 'ticketOrderDetail',
    path: '/ticketOrder/detail',
    type: 'get',
}, {
    name: '票务产品订单详情修改',
    method: 'ticketOrder_edit',
    path: '/ticketOrder/edit',
    type: 'post',
}, {
    name: '票务产品订单',
    method: 'ticketorder_lists',
    path: '/ticketOrder/lists',
    type: 'get',
}, {
    name: '退款／关闭',
    method: 'orderChange_status',
    path: '/order/change_status',
    type: 'post',
}, {
    name: '提交通知',
    method: 'ticketOrder_msg',
    path: '/ticketOrder/msg',
    type: 'post',
}
];