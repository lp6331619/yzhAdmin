/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 资金模块
 * @type {Object}
 */
export default [{
        name: '获取任务状态选项',
        method: 'getTaskStatus',
        path: '/Task/getTaskStatus',
        type: 'post',
    }, {
        name: '任务记录接口',
        method: 'getTaskList',
        path: '/Task/getTaskList',
        type: 'post',
    },
    {
        name: '任务详情',
        method: 'detail',
        path: '/Task/detail',
        type: 'post',
    },
    {
        name: '撤销任务',
        method: 'cancelTask',
        path: '/Task/cancelTask',
        type: 'post',
    },
    {
        name: '获取任务快递选项',
        method: 'getExpressTypes',
        path: '/Task/getExpressTypes',
        type: 'post',
    }, {
        name: '获取年龄阶段选项',
        method: 'getAgeStages',
        path: '/Task/getAgeStages',
        type: 'post',
    }, {
        name: '获取任务信用等级选项',
        method: 'getCreditLevels',
        path: '/Task/getCreditLevels',
        type: 'post',
    },
    {
        name: '获取增值服务价格（销量管理）',
        method: 'getCostPrice',
        path: '/Task/getCostPrice',
        type: 'post',
    }, {
        name: '计算任务费用明细',
        method: 'calculate',
        path: '/Task/calculate',
        type: 'post',
    }, {
        name: '计算任务费用明细(new)',
        method: 'calculateNew',
        path: '/Task/calculateNew',
        type: 'post',
    }, {
        name: '发布任务',
        method: 'addTask',
        path: '/Task/addTask',
        type: 'post',
    }, {
        name: '支付任务费用',
        method: 'payTask',
        path: '/Task/payTask',
        type: 'post',
    }, {
        name: '资金明细列表',
        method: 'getLogList',
        path: '/AccountLog/getLogList',
        type: 'post',
    }, {
        name: '获取操作类型',
        method: 'getTypes',
        path: '/AccountLog/getTypes',
        type: 'post',
    }, {
        name: '获取增值服务价格（流量管理）',
        method: 'getFlowCostPrice',
        path: '/Task/getFlowCostPrice',
        type: 'post',
    },


];