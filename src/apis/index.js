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


export default [{
    module: 'user',
    name: '用户管理',
    list: user
}, {
    module: 'customer',
    name: '商户信息',
    list: Customer
}];