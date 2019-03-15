/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name: '发送短信',
        method: 'sms_code',
        path: '/Public/sms_code',
        type: 'post',
    },
    {
        name: '登录',
        method: 'login',
        path: '/Public/login',
        type: 'post',
    },
    {
        name: '验证码',
        method: 'verify',
        path: '/Public/verify',
        type: 'get',
    },
    {
        name: '注册',
        method: 'register',
        path: '/Public/register',
        type: 'post',
    },
    {
        name: '上传图片',
        method: 'upload_img',
        path: '/Public/upload_img',
        type: 'post',
    },
    {
        name: '找回密码',
        method: 'reset_passwd',
        path: '/Public/reset_passwd',
        type: 'post',
    },
];