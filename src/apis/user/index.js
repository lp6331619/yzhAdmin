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
    {
        name: '公告列表',
        method: 'notice_list',
        path: '/Notice/index',
        type: 'post',
    },
    {
        name: '公告详情',
        method: 'notice',
        path: '/Notice/detail',
        type: 'post',
    },

    {
        name: '商户账户信息',
        method: 'accountInfo',
        path: '/Customer/accountInfo',
        type: 'post',
    },
    {
        name: '商户信息接口',
        method: 'info',
        path: '/Customer/info',
        type: 'post',
    },
    {
        name: '修改QQ信息',
        method: 'editQQ',
        path: '/Customer/editQQ',
        type: 'post',
    },
    {
        name: '修改Email信息',
        method: 'editEmail',
        path: '/Customer/editEmail',
        type: 'post',
    },

    
];