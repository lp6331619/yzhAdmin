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
    name: '获取订单状态选项(流量管理)',
    method: 'getFlowOrderStatus',
    path: '/Order/getFlowOrderStatus',
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
}, {
    name: '修改支付金额',
    method: 'editPayMoney',
    path: '/Order/editPayMoney',
    type: 'post',
}, {
    name: '订单本金返款审核(销量管理)',
    method: 'payCapital',
    path: '/Order/payCapital',
    type: 'post',
}, {
    name: '批量订单本金返款审核(销量管理)',
    method: 'batchPayCapital',
    path: '/Order/batchPayCapital',
    type: 'post',
}, {
    name: '订单佣金返款审核',
    method: 'payCommision',
    path: '/Order/payCommision',
    type: 'post',
}, {
    name: '批量订单佣金返款审核',
    method: 'batchPayCommision',
    path: '/Order/batchPayCommision',
    type: 'post',
}, {
    name: '邀请评价(销量管理)',
    method: 'invitePraise',
    path: '/Order/invitePraise',
    type: 'post',
}, {
    name: '撤销评价任务',
    method: 'cancelPraise',
    path: '/Order/cancelPraise',
    type: 'post',
}, {
    name: '获取评价任务类型选项',
    method: 'getPraiseTypes',
    path: '/Order/getPraiseTypes',
    type: 'post',
}];