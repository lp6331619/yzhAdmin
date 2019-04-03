import axios from 'axios'
import * as types from './mutations_types';
import store from 'store';
import Vue from 'vue';
import Router from 'vue-router';

export default {
	get_imgPopData: ({
		commit
	}, {
		imgPopData
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SET_IMGPOP, {
				imgPopData
			});
			resolve()
		});
	},
};