/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [{
    name: '获取订单状态选项',
    method: 'getOrderStatus',
    path: '/Order/getOrderStatus',
    type: 'post',
}, {
    name: '订单记录',
    method: 'getOrderList',
    path: '/Order/getOrderList',
    type: 'post',
}, {
    name: '订单审核',
    method: 'auditOrder',
    path: '/Order/auditOrder',
    type: 'post',
}, {
    name: '批量订单审核',
    method: 'batchAuditOrder',
    path: '/Order/batchAuditOrder',
    type: 'post',
}, {
    name: '订单详情',
    method: 'detail',
    path: '/Order/detail',
    type: 'post',
}];