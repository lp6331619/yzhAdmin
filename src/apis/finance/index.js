/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : '提现列表',
        method: 'audits',
        path  : '/withdraw/audits',
        type  : 'get',
    },{
        name  : '提现详情',
        method: 'detail',
        path  : '/withdraw/detail',
        type  : 'get',
    },{
        name  : '汇款列表',
        method: 'withdraws',
        path  : '/withdraw/withdraws',
        type  : 'get',
    },{
        name  : '提现审核/汇款',
        method: 'withdraw_change_status',
        path  : '/withdraw/withdraw_change_status',
        type  : 'post',
    }
];