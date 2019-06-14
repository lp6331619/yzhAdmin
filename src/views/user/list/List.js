export default {
    name: 'list',
    created: function () {
        this.getList()
        // console.log(this.$store.state.user.userinfo)
    },
    data() {
        return {
            loading: false,
            tableData: [],
            pageShow: false,
            user_info: this.$store.state.user.userinfo,
            selectData: {//搜索条件
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
            },
            pingt: [],
            passwordStatus: false,
            passwordForm: {
                old_password: '',
                password: '',
                password_check: '',
            },
            rule_password: {
                old_password: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '新密码不能为空！',
                    trigger: 'blur'
                }],
                password_check: [{
                    required: true,
                    message: '确认密码不能为空！',
                    trigger: 'blur'
                }, {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.passwordForm.password) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    }
                }],
            }
        }
    },
    methods: {
        getList() {//获取列表数据
            this.loading = true;
            let data = {
                limit: 10,
                p: 1
            }
            this.$$api_shop_index({
                data: data,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_shop_getShopTypes({
                //获取平台
                data: {},
                fn: data => {
                    for (let i in data) {
                        this.pingt.push({
                            label: data[i],
                            value: i
                        });
                    }
                    this.loading = false;
                },
                errFn: err => {
                    this.$message.error(err.info);
                    this.loading = false;
                }
            });
        },
        handleCurrentChange(item) {//分页
            this.selectData.page = item
            this.$router.push({
                path: '/user/list',
                query: this.selectData
            })
            this.getList()
        },
        statusFormat(item) {//格式化
            let text = ' '
            // console.log(item)
            switch (parseInt(item.status)) {
                case 1:
                    text = '审核通过'
                    break;
                case 2:
                    text = '待审'
                    break;
                case 3:
                    text = '审核拒绝'
                    break;
            }
            return text
        },
        passwordSub(ref) {//修改密码
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$$api_user_editPsw({
                        data: this.passwordForm,
                        fn: data => {
                            this.loading = false;
                            this.$message.success('修改成功！')
                            this.passwordStatus = false
                        },
                        errFn: (err) => {
                            this.$message.error(err.info);
                            this.loading = false;
                        },
                        tokenFlag: true
                    });
                }
            })
        },
        // 修改qq
        editQQ() {
            this.$prompt('请输入QQ号码', '修改QQ号码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: this.user_info.qq,
                inputPattern: /^(-|\+)?\d+(\.\d+)?$/,
                inputErrorMessage: 'QQ不正确'
            }).then(({ value }) => {
                this.$$api_user_editQQ({
                    data: { qq: value },
                    fn: data => {
                        let box = this.$store.state.user.userinfo;
                        box.qq = value
                        // console.log(box)
                        this.$store.dispatch('update_userinfo', {
                            userinfo: box,
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '修改成功！你的QQ是: ' + value
                            });
                        });
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                    tokenFlag: true
                });

            }).catch(() => {
            });
        },
        editEmail() {//修改email
            this.$prompt('请输入email号码', '修改email号码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: this.user_info.email,
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: 'email格式不正确'
            }).then(({ value }) => {
                this.$$api_user_editEmail({
                    data: { email: value },
                    fn: data => {
                        let box = this.$store.state.user.userinfo;
                        box.email = value
                        // console.log(box)
                        this.$store.dispatch('update_userinfo', {
                            userinfo: box,
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '修改成功！你的email是: ' + value
                            });
                        });
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                    tokenFlag: true
                });

            }).catch(() => {
            });
        },
        // 设置间隔
        setInterval(item) {
            let text = `<p class="text-indent:22px">限制时间指用户第一次接任务与第二次接任务之间的时间间隔，不同类目的商家，用户的平均回购时间都不同，适当比例的用户回购对店铺和商品权重有很大好处，所以我们开放了商家店铺对用户的间隔时间设置，大家可以根据自己类目和店铺的需要在规定区间内设置：</p><br/>
                <p class="text-indent:22px">间隔设置区间要求“大于等于15天，小于等于9999天”，系统默认是33天。</p><br/>
                <p class="text-indent:22px">（注意：商家一定要根据自己的类目特点来设置，比如食品类正常回购时间就很短，大家电类就会很长。如果设置了过短且不符合类目特性间隔时间，可能会触发淘宝“重复购买”的降权处罚，大家慎重设置！）</p>`
            this.$prompt(text, '接单间隔时间限制设置', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                inputValue: item.interval_day,
                inputPattern: /^(-|\+)?\d+(\.\d+)?$/,
                inputErrorMessage: '不能为空并且只能是数字！'
            }).then(({ value }) => {
                this.$$api_shop_editIntervalDay({
                    data: { interval_day: value, id: item.id },
                    fn: data => {
                        this.$message({
                            type: 'success',
                            message: '修改成功！你的接单间隔是: ' + value
                        });
                        item.interval_day = value;
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                    tokenFlag: true
                });

            }).catch(() => {
            });
        }
    },
}