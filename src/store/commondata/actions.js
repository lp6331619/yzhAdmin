import axios from 'axios'
import * as types from './mutations_types';
import store from 'store';
import Vue from 'vue';
import Router from 'vue-router';

export default {
	get_categorys: ({
		commit
	}, {
		categorys
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SET_LANG, {
				categorys
			});
			resolve()
		});
	},
	get_countrys: ({
		commit
	}, {
		countrys
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SET_CATEGORY, {
				countrys
			});
			resolve()
		});
	},
};
