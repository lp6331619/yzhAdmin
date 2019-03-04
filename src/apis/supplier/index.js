/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : '供应商列表',
        method: 'shops',
        path  : '/supplier/shops',
        type  : 'get',
    },{
        name  : '供应商详情',
        method: 'shop',
        path  : '/supplier/shop',
        type  : 'get',
    }, {
        name  : '供应商修改',
        method: 'edit_shop',
        path  : '/supplier/edit_shop',
        type  : 'post',
    },
    {
        name  : '票务供应商',
        method: 'ticket_shops',
        path  : '/supplier/ticket_shops',
        type  : 'get',
    },{
        name  : '票务供应商详情',
        method: 'ticket_shop',
        path  : '/supplier/ticket_shop',
        type  : 'get',
    }, {
        name  : '审核供应商',
        method: 'shop_audit',
        path  : '/supplier/shop_audit',
        type  : 'post',
    }, 
    {
        name  : '删除票务供应商',
        method: 'ticket_shop_del',
        path  : '/supplier/ticket_shop_del',
        type  : 'post',
    }, 
    {
        name  : '编辑票务供应商信息',
        method: 'ticket_shop_edit',
        path  : '/supplier/ticket_shop_edit',
        type  : 'post',
    }, 
    //商品
     {
        name  : '供应商产品列表',
        method: 'goods_list',
        path  : '/supplier/goods_list',
        type  : 'get',
    },  {
        name  : '商品添加修改',
        method: 'goods_edit',
        path  : '/supplier/goods_edit',
        type  : 'post',
    },  {
        name  : '商品详情',
        method: 'goods_detail',
        path  : '/supplier/goods_detail',
        type  : 'get',
    },  {
        name  : '分类信息',
        method: 'categorys',
        path  : '/supplier/categorys',
        type  : 'get',
    }, 
     {
        name  : '供应商产品下架',
        method: 'goods_audit',
        path  : '/supplier/goods_audit',
        type  : 'post',
    }, 
];