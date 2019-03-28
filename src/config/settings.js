var env = process.env;

var gbs={
	// host: 'http://admin-api.quitang.com',
	host: `${window.location.host.indexOf('localhost')!=-1? '/AdminApi' : 'http://yzh.jiqimao.uiping.com'}`, //接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
	// db_prefix: 'sls_admin_', //本地存储的key
	//状态码字段
	api_status_key_field:'status',
	//状态码value
	api_status_value_field:1,
	api_data_field:'data',
	api_custom:{
		'-100':function (res) {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(res.status + ',' + res.info + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		},
	}
};

var cbs={
	/**
	 * ajax请求成功，返回的状态码不是200时调用
	 * @param  {object} err 返回的对象，包含错误码和错误信息
	 */
	statusError(err) {
		if (err.status !== 404) {
			this.$message({
				showClose: true,
				message: err.info,
				type: 'error'
			});
		} else {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(err.status + ',' + err.info + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	},
	/**
	 * ajax请求网络出错时调用
	 */
	requestError(err,err2) {
		this.$message({
			showClose: true,
			message: '请求错误',
			type: 'error'
		});
	}
};

export {
	gbs,
	cbs
};
