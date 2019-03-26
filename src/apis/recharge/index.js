/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 充值模块
 * @type {Object}
 */
export default [
    {
        name: '获取平台账号信息',
        method: 'getSiteBankInfo',
        path: '/Recharge/getSiteBankInfo',
        type: 'post',
    }, {
        name: '充值记录列表',
        method: 'getRechargeList',
        path: '/Recharge/getRechargeList',
        type: 'post',
    }, {
        name: '获取平台收款账号更改提示',
        method: 'getChangeTips',
        path: '/Recharge/getChangeTips',
        type: 'post',
    }, {
        name: '获取最后一条充值记录的银行信息',
        method: 'getLastLog',
        path: '/Recharge/getLastLog',
        type: 'post',
    }, {
        name: '提交充值申请',
        method: 'addRecharge',
        path: '/Recharge/addRecharge',
        type: 'post',
    }, {
        name: '佣金充值',
        method: 'commisionRecharge',
        path: '/Recharge/commisionRecharge',
        type: 'post',
    }
];