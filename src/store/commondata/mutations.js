import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default {// 可设置根据父类获取子类方法
    [types.SET_LANG](state, result) {
        state.categorys = result.categorys;
		store.set('categorys', result.categorys);
    },
	[types.SET_CATEGORY](state, result) {
        state.countrys = result.countrys;
        store.set('countrys', result.countrys);
    },
    [types.SET_REGEX_ARRAY](state, result) {
        state.regex_array = result;
        store.set('regex_array', result);
    },

};
