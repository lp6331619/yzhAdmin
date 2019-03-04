/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [{
        name: '登录',
        method: 'login',
        path: '/public/login',
        type: 'post',
    },
    {
        name: '获取提示',
        method: 'order_notify',
        path: '/order/notify',
        type: 'post',
    },

];