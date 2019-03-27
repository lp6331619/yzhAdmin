/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 资金模块
 * @type {Object}
 */
export default [
    {
        name: '获取意见类型',
        method: 'getSuggestTypes',
        path: '/Suggest/getSuggestTypes',
        type: 'post',
    }, {
        name: '获取意见状态',
        method: 'getSuggestStatus',
        path: '/Suggest/getSuggestStatus',
        type: 'post',
    },
    {
        name: '意见建议',
        method: 'getSuggestList',
        path: '/Suggest/getSuggestList',
        type: 'post',
    },
    {
        name: '提交意见',
        method: 'addSuggest',
        path: '/Suggest/addSuggest',
        type: 'post',
    },
];