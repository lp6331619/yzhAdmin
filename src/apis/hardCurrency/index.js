/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : 'banner列表',
        method: 'lists',
        path  : '/banner/lists',
        type  : 'get',
    },{
        name  : '添加/修改banner',
        method: 'edit',
        path  : '/banner/edit',
        type  : 'post',
    },{
        name  : 'banner详情',
        method: 'detail',
        path  : '/banner/detail',
        type  : 'get',
    },{
        name  : 'banner删除',
        method: 'del',
        path  : '/banner/del',
        type  : 'post',
    },


    {
        name  : '优惠卷列表',
        method: 'couponLists',
        path  : '/coupon/lists',
        type  : 'get',
    },{
        name  : '添加/修改优惠卷',
        method: 'couponEdit',
        path  : '/coupon/edit',
        type  : 'post',
    },{
        name  : '优惠卷详情',
        method: 'couponDetail',
        path  : '/coupon/detail',
        type  : 'get',
    },{
        name  : '优惠卷删除',
        method: 'couponDel',
        path  : '/coupon/del',
        type  : 'post',
    }
];