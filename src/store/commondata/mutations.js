import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default { // 可设置根据父类获取子类方法
    [types.SET_IMGPOP](state, result) {
        state.imgPopData = result.imgPopData;
        store.set('imgPopData', result.imgPopData);
    },

};