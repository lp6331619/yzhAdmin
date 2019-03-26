/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 资金模块
 * @type {Object}
 */
export default [
    {
        name: '资金明细列表',
        method: 'getLogList',
        path: '/AccountLog/getLogList',
        type: 'post',
    }, {
        name: '获取操作类型',
        method: 'getTypes',
        path: '/AccountLog/getTypes',
        type: 'post',
    }
];