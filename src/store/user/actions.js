/**
 * Created by sailengsi on 2017/5/10.
 */

import * as types from './mutations_types.js';

export default {
	update_userinfo: ({
		commit
	}, {
		userinfo
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_USERINFO, {
				userinfo
			});
			resolve()
		});
	},

	remove_userinfo: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.REMOVE_USERINFO);
			resolve()
		});
	},


	update_remumber: ({
		commit
	}, {
		remumber
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_REMUMBER, {
				remumber
			});
			resolve()
		});
	},

	remove_remumber: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.REMOVE_REMUMBER);
			resolve()
		});
	}
};