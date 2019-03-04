/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : '评价列表',
        method: 'lists',
        path  : '/comment/lists',
        type  : 'get',
    },{
        name  : '评价详情',
        method: 'detail',
        path  : '/comment/detail',
        type  : 'get',
    },{
        name  : '删除评价',
        method: 'del',
        path  : '/comment/del',
        type  : 'post',
    }
];