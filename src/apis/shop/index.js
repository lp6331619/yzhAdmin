/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name: '店铺列表',
        method: 'index',
        path: '/Shop/index',
        type: 'post',
    }, {
        name: '获取平台列表',
        method: 'getShopTypes',
        path: '/Shop/getShopTypes',
        type: 'post',
    }, {
        name: '店铺详情',
        method: 'info',
        path: '/Shop/info',
        type: 'post',
    }, {
        name: '添加/编辑店铺',
        method: 'edit',
        path: '/Shop/edit',
        type: 'post',
    }, {
        name: '设置接单间隔',
        method: 'editIntervalDay',
        path: '/Shop/editIntervalDay',
        type: 'post',
    },
    {
        name: '获取省份',
        method: 'getProvince',
        path: '/Public/getProvince',
        type: 'post',
    },
    {
        name: '根据父级id获取下级地区列表',
        method: 'getAreaByParentId',
        path: '/Public/getAreaByParentId',
        type: 'post',
    },
];