/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
    name: 'login',
    created() {
        if (this.$store.state.user.userinfo.status) {
            this.$router.push('/product/travel/list1'); //登录状态
        }
    },
    data() {
        return {
            backgroundImage: { //背景图片
                backgroundImage: "url(" + require("../../assets/images/loginBg.jpg") + ")",
            },
            loading: false,
            loginData: {
                username: '123@123.com',
                password: '123123'
            },
            rule_data: {
                username: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            }
        }
    },
    methods: {
        onLogin(ref, type) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$$api_user_login({
                        data: this[ref],
                        fn: data => {
                            this.$store.dispatch('update_userinfo', {
                                userinfo: data,
                            }).then(() => {
                                this.$$api_supplier_categorys({
                                    data: {},
                                    fn: data => {
                                        var categorys = data
                                        this.$$api_admin_countrys({
                                            data: {},
                                            fn: data => {
                                                var countrys = data
                                                this.$store.dispatch('update_remumber', {
                                                    remumber_login_info: {
                                                        categorys: categorys,
                                                        countrys: countrys
                                                    }
                                                }).then(() => {
                                                    if (this.$store.state.user.userinfo.type == '2') {
                                                        this.$router.push('/product/ticket/train/ticketClerk2');
                                                    } else {
                                                        this.$router.push('/product/travel/list1');
                                                    }
                                                    this.$message.success('恭喜您登录成功！');
                                                })
                                            },
                                            errFn: (err) => {
                                                this.$message.error(err.msg);
                                            },
                                        });

                                    },
                                    errFn: (err) => {
                                        this.$message.error(err.msg);
                                    },
                                });


                            });
                        },
                        errFn: (err) => {
                            this.$message.error(err.msg);
                        },
                        tokenFlag: true
                    });
                }
            });
        },
    },
    mounted() {}
}