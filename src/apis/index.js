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
import admin from './admin/';
import supplier from './supplier/';
import appraisal from './appraisal/';
import hardCurrency from './hardCurrency/';
import finance from './finance/';
import product from './product/';
import order from './order/';

export default [{
    module:'user',
    name:'用户管理',
    list:user
},{
    module:'admin',
    name:'系统管理',
    list:admin
},{
    module:'supplier',
    name:'供应商',
    list:supplier
},{
    module:'appraisal',
    name:'评价',
    list:appraisal
},{
    module:'hardCurrency',
    name:'营销管理',
    list:hardCurrency
},{
    module:'finance',
    name:'财务管理',
    list:finance
},{
    module:'product',
    name:'产品管理',
    list:product
},{
    module:'order',
    name:'订单管理',
    list:order
}];