/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name: '商户账户信息',
        method: 'accountInfo',
        path: '/Customer/accountInfo',
        type: 'post',
    }, {
        name: '修改密码',
        method: 'editPsw',
        path: '/Customer/editPsw',
        type: 'post',
    }, {
        name: '修改QQ信息',
        method: 'editQQ',
        path: '/Customer/editQQ',
        type: 'post',
    }, {
        name: '修改Email信息',
        method: 'editEmail',
        path: '/Customer/editEmail',
        type: 'post',
    }
];