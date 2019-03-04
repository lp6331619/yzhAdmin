/**
 * Created by sailengsi on 2017/1/11.
 */

/**
 * 产品模块
 * @type {Object}
 */
export default [
//旅行产品
    {
        name  : '产品列表',
        method: 'lists',
        path  : '/goods/lists',
        type  : 'get',
    },{
        name  : '产品详情',
        method: 'detail',
        path  : '/goods/detail',
        type  : 'get',
    }, 
    {
        name  : '产品删除',
        method: 'goods_del',
        path  : '/goods/del',
        type  : 'post',
    }, 
    {
        name  : '产品列表修改',
        method: 'goodsEdit',
        path  : '/goods/edit',
        type  : 'post',
    },{
        name  : '产品下架',
        method: 'change_online_status',
        path  : '/goods/change_online_status',
        type  : 'post',
    },
//票务产品
    {
        name  : '票务产品列表',
        method: 'ticketLists',
        path  : '/ticket/lists',
        type  : 'get',
    },
    {
        name  : '票务产品详情',
        method: 'ticketDetail',
        path  : '/ticket/detail',
        type  : 'get',
    },
    {
        name  : '票务产品编辑',
        method: 'ticketEdit',
        path  : '/ticket/edit',
        type  : 'post',
    },{
        name  : '删除票务',
        method: 'ticketDel',
        path  : '/ticket/del',
        type  : 'post',
    },
    {
        name  : '票务产品下架',
        method: 'ticketChange_online_status',
        path  : '/ticket/change_online_status',
        type  : 'post',
    },
//站台
    {
        name  : '站台列表',
        method: 'stationLists',
        path  : '/station/lists',
        type  : 'get',
    },
    {
        name  : '添加/修改站台',
        method: 'stationEdit',
        path  : '/station/edit',
        type  : 'post',
    },
    {
        name  : '站台详情',
        method: 'stationDetail',
        path  : '/station/detail',
        type  : 'get',
    },
    {
        name  : '站台上下架',
        method: 'stationChange_online_status',
        path  : '/station/change_online_status',
        type  : 'post',
    },

];
