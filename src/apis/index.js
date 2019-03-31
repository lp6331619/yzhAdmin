/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import user from './user/';
import Customer from './customer/';
import Shop from './shop/';
import Funds from './funds/';
import Recharge from './recharge/';
import Appeal from './appeal/';
import Suggest from './suggest/';
import Task from './task/';
import Order from './order/';

export default [{
    module: 'user',
    name: '用户管理',
    list: user
}, {
    module: 'customer',
    name: '商户信息',
    list: Customer
}, {
    module: 'shop',
    name: '店铺接口',
    list: Shop
}, {
    module: 'funds',
    name: '资金',
    list: Funds
}, {
    module: 'recharge',
    name: '充值',
    list: Recharge
}, {
    module: 'appeal',
    name: '申述',
    list: Appeal
}, {
    module: 'suggest',
    name: '建议',
    list: Suggest
}, {
    module: 'task',
    name: '任务',
    list: Task
}, {
    module: 'order',
    name: '订单',
    list: Order
}];