/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name: '获取申诉种类',
        method: 'getAppealSources',
        path: '/Appeal/getAppealSources',
        type: 'post',
    }, {
        name: '获取申诉类型',
        method: 'getAppealTypes',
        path: '/Appeal/getAppealTypes',
        type: 'post',
    }, {
        name: '获取申诉状态',
        method: 'getAppealStatus',
        path: '/Appeal/getAppealStatus',
        type: 'post',
    }, {
        name: '申诉记录',
        method: 'getAppealList',
        path: '/Appeal/getAppealList',
        type: 'post',
    }, {
        name: '提交申诉',
        method: 'addAppeal',
        path: '/Appeal/addAppeal',
        type: 'post',
    }
];