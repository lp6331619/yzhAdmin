/**
 * Created by sailengsi on 2017/5/10.
 */
import {
	store
} from 'utils/';


import * as types from './mutations_types'


export default {
	[types.UPDATE_USERINFO](state, user_db) {
		state.userinfo = user_db.userinfo || {};
		store.set('userinfo', state.userinfo);
	},

	[types.REMOVE_USERINFO](state) {
		store.remove('userinfo');
		state.userinfo = {};
	},

	[types.UPDATE_REMUMBER](state, user_db) {
		state.remumber = user_db.remumber;
		store.set('remumber', state.remumber);
	},

	[types.REMOVE_REMUMBER](state) {
		store.remove('remumber');
		state.remumber = {};
	},
};