export default {
    name: 'head-nav',
    data() {
        return {
            show_pass: false,
            title: '修改密码',
            user_info: this.$store.state.user.userinfo,
            passwordBox: {},
            user_info_rules: {
                new_pwd: [{
                    required: true,
                    message: '新密码不能为空！',
                    trigger: 'blur'
                }, {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else {
                            if ('' !== this.passwordBox.new_pwd) {
                                this.$refs.passwordBox.validateField('confirm_pwd');
                            }
                            callback();
                        }
                    }
                }],
                confirm_pwd: [{
                    required: true,
                    message: '确认密码不能为空！',
                    trigger: 'blur'
                }, {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.passwordBox.new_pwd) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    }
                }],
            }
        }
    },
    mounted() {
        this.getTips()
    },
    methods: {
        /**
         *
         * @param {string} cmditem 弹框类型
         */
        setDialogInfo(cmditem) {
            switch (cmditem) {
                case 'info':
                    this.$router.push({
                        path: '/order/edit',
                        query: {
                            id: this.user_info.id
                        }
                    });
                    break;
                case 'pass':
                    this.show_pass = true;
                    this.title = '修改密码';
                    break;
            }
        },
        /**
         * 修改密码
         */
        updUserPass(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.passwordBox.id = this.user_info.id
                    this.$$api_admin_user_admin_change_pwd({
                        data: this.passwordBox,
                        fn: data => {
                            this.$message.success('恭喜您修改成功，请重新登录！');
                            this.logout(1);
                        },
                        errFn: (err) => {
                            this.$message.error(err.msg);
                        },
                    });
                }
            })
        },
        getTips() {
            var myAuto = document.querySelector('#mp3');
            var time = 0
            setInterval(() => {
                this.$$api_user_order_notify({
                    data: { utime: time },
                    fn: data => {
                        time = data.utime
                        if (data.has_new == 1) {
                            myAuto.play();
                            this.$notify({
                                title: '警告',
                                message: 'new order！！',
                                type: 'warning',
                                offset: 50
                            });
                        }
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            }, 10000);
        }
    }
}