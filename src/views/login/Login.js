/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
    name: 'login',
    created() {
        // if (this.$store.state.user.userinfo.status) {
        //     this.$router.push('/product/travel/list1'); //登录状态
        // }
        this.codeBox(1)
    },
    data() {
        return {
            backgroundImage: { //背景图片
                backgroundImage: "url(" + require("../../assets/images/loginBg.jpg") + ")",
            },
            loading: false,
            status: 1,
            code: '',
            sms: '发送短信',
            disabled: false,
            registStaus: false,
            resetStaus: false,
            loginData: {
                phone: '18888888882',
                password: '123456',
                verify_code: '',
                code_key: ''
            },
            rule_data: {
                phone: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                verify_code: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            registerData: {
                phone: '',
                password: '',
                verify_code: '',
                password_check: '',
                invite_no: '',
                phone_code: '',
                qq: '',
            },
            registerRule: {
                phone: '',
                password: '',
                password_check: '',
                phone_code: '',
            },
            resetData: {
                phone: '',
                password: '',
                verify_code: '',
                password_check: '',
                phone_code: '',
            },
            resetRule: {
                phone: '',
                password: '',
                password_check: '',
                phone_code: '',
            },
        }
    },
    methods: {
        codeBox(status) {
            let math = Math.random()
            this.loginData.code_key = math
            let type = '';
            switch (status) {
                case 1:
                    type = 'login'
                    break;
                case 2:
                    type = 'register'
                    break;
                case 3:
                    type = 'resetPasswd'
                    break;
            }
            this.code = `http://yzh.jiqimao.uiping.com/Public/verify?type=${type}&code_key=${math}`
        },
        onLogin(ref, type) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$$api_user_login({
                        data: this[ref],
                        fn: data => {
                            this.$store.dispatch('update_userinfo', {
                                userinfo: data,
                            }).then(() => {
                                this.$router.push('/home');
                            });
                        },
                        errFn: (err) => {
                            this.$message.error(err.info);
                            this.codeBox(1)
                        },
                        tokenFlag: true
                    });
                }
            });
        },
        // 短信验证码
        onMessage(status) {
            let smsStatus = true;
            let data = {};
            data.type = status;
            data.code_key = this.loginData.code_key;
            console.log(status)
            switch (status) {
                case 1:
                    if (this.registerData.phone === '') {
                        this.registerRule = Object.assign({}, this.registerRule, {
                            phone: '不能为空'
                        })
                        smsStatus = false;
                    } else {
                        data.phone = this.registerData.phone;
                        this.registerRule = Object.assign({}, this.registerRule, {
                            phone: ''
                        })
                    }
                    if (this.registerData.verify_code === '') {
                        this.registerRule = Object.assign({}, this.registerRule, {
                            verify_code: '不能为空'
                        })
                        smsStatus = false;
                    } else {
                        data.verify_code = this.registerData.verify_code;
                        this.registerRule = Object.assign({}, this.registerRule, {
                            verify_code: ''
                        })
                    }
                    break;
                case 2:
                    if (this.resetData.phone === '') {
                        this.restRule = Object.assign({}, this.restRule, {
                            phone: '不能为空'
                        })
                        smsStatus = false;
                    } else {
                        data.phone = this.resetData.phone;
                        this.restRule = Object.assign({}, this.restRule, {
                            phone: ''
                        })
                    }
                    if (this.resetData.verify_code === '') {
                        this.restRule = Object.assign({}, this.restRule, {
                            verify_code: '不能为空'
                        })
                        smsStatus = false;
                    } else {
                        data.verify_code = this.resetData.verify_code;
                        this.restRule = Object.assign({}, this.restRule, {
                            verify_code: ''
                        })
                    }
                    break;
            }
            if (smsStatus) {
                this.$$api_user_sms_code({
                    data: data,
                    fn: data => {
                        this.codeBox(2)
                        this.$message.success('发送短信成功');
                        this.disabled = true
                        let i = 60;
                        let time = setInterval(() => {
                            if (i >= 0) {
                                i--
                                this.sms = `${i}秒`
                            } else {
                                this.sms = '发送短信'
                                clearInterval(time)
                                this.disabled = false
                            }
                        }, 1000);
                        switch (status) {
                            case 1:
                                this.registStaus = true
                                break;
                            case 2:
                                this.resetStaus = true
                                break;
                        }
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                    tokenFlag: true
                });
            }
        },
        //注册
        onRegister() {
            let smsStatus = true;
            let data = {};
            if (this.registerData.password === '') {
                this.registerRule = Object.assign({}, this.registerRule, {
                    verify_code: '不能为空'
                })
                smsStatus = false;
            } else {
                this.registerRule = Object.assign({}, this.registerRule, {
                    verify_code: ''
                })
            }
            if (this.registerData.password_check === '' || this.registerData.password !== this.registerData.password_check) {
                this.registerRule = Object.assign({}, this.registerRule, {
                    password_check: '两次输入不一致'
                })
                smsStatus = false;
            } else {
                this.registerRule = Object.assign({}, this.registerRule, {
                    password_check: ''
                })
            }
            if (smsStatus) {
                this.$$api_user_register({
                    data: this.registerData,
                    fn: data => {
                        this.codeBox(1)
                        this.$message.success('恭喜您注册成功！请登录！');
                        this.stauts = 1;
                        this.$router.push('/home');
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.codeBox(2)
                    },
                    tokenFlag: true
                });
            }

        },

        //忘记密码
        onReset() {
            let smsStatus = true;
            let data = {};
            if (this.resetData.password === '') {
                this.resetRule = Object.assign({}, this.resetRule, {
                    verify_code: '不能为空'
                })
                smsStatus = false;
            } else {
                this.resetRule = Object.assign({}, this.resetRule, {
                    verify_code: ''
                })
            }
            if (this.resetData.password_check === '' || this.resetData.password !== this.resetData.password_check) {
                this.resetRule = Object.assign({}, this.resetRule, {
                    password_check: '两次输入不一致'
                })
                smsStatus = false;
            } else {
                this.resetRule = Object.assign({}, this.resetRule, {
                    password_check: ''
                })
            }
            if (smsStatus) {
                this.$$api_user_reset_passwd({
                    data: this.resetData,
                    fn: data => {
                        this.codeBox(1)
                        this.$message.success('恭喜您注册成功！请登录！');
                        this.stauts = 1;
                        this.$router.push('/home');
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.codeBox(3)
                    },
                    tokenFlag: true
                });
            }

        }
    },
    mounted() { }
}