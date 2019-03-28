export default {
    name: 'list',
    created: function () {
        this.getList()
        this.getBank()
        // console.log(this.$store.state.user)
    },
    data() {
        return {
            loading: false,
            tableData: Array,
            pageShow: false,
            bankList: [],//银行列表
            bankInfo: {},//平台信息
            selectData: {//搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
            },
            form: {
                bank_id: '',
                name: '',
                bank_no: '',
                cost_money: '',
                transfer_pic: ''
            },
            rule_data: {
                bank_id: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                bank_no: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                cost_money: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                url: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
            },
        }
    },
    methods: {
        getBank() { //获得平台账号信息
            this.loading = true;
            this.$$api_recharge_getSiteBankInfo({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.bankInfo = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
            this.$$api_user_getBanks({//获得银行列表
                data: {},
                fn: data => {
                    this.loading = false;
                    for (let i in data) {
                        this.bankList.push({
                            id: i,
                            name: data[i]
                        })
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
            this.$$api_recharge_getChangeTips({//获取账户是否改变
                data: {},
                fn: data => {
                    this.loading = false;
                    if (data.is_change == 1)
                        this.$confirm('收款账号已发生变更，请知悉！', '通知！', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '我已知道!'
                            });
                        }).catch(() => {
                        })
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
            this.$$api_recharge_getLastLog({//上一条充值记录
                data: {},
                fn: data => {
                    this.loading = false;
                    let box = data
                    this.form = Object.assign({}, this.form, {
                        bank_id: box.bank_id,
                        bank_no: box.bank_no,
                        name: box.name,
                    })
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        getList() {//获取列表数据
            this.loading = true;
            this.$$api_recharge_getRechargeList({
                data: this.selectData,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                    this.tableData.count = parseInt(this.tableData.count)
                    if (this.tableData.count > 10) {
                        this.pageShow = true
                    } else {
                        this.pageShow = false
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        handleCurrentChange(item) {//分页
            this.selectData.p = item
            this.$router.push({
                path: '/recharge/home',
                query: this.selectData
            })
            this.getList()
        },
        onExport() {//导出表格
            let token = this.$store.state.user.userinfo.token
            window.open(`/AdminApi/Recharge/getRechargeList?token=${token}&export=1`);
        },
        formatterAccount(item) {
            let text = ''
            switch (parseInt(item.account_type)) {
                case 1:
                    text = '本金账户'
                    break;
                case 2:
                    text = '佣金账户'
                    break;
            }
            return text
        },
        formatterStatus(item) {
            let text = ''
            switch (parseInt(item.status)) {
                case 1:
                    text = '成功'
                    break;
                case 2:
                    text = '待审 '
                    break;
                case 3:
                    text = '驳回 '
                    break;
            }
            return text
        },
        handleAvatarSuccess(res, file) {//图片上传成功
            this.form = Object.assign({}, this.form, {
                transfer_pic: res.data.url,
                url: res.data.all_url
            })

        },
        beforeAvatarUpload(file) {//图片上传前
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            let status;
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                status = false
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return status && isLt2M
        },
        getMoney() {//获取钱
            this.$$api_customer_accountInfo({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.$store.dispatch('update_remumber', {
                        remumber: data,
                    }).then(() => {
                        this.balance_money = data.balance_money
                        this.balance_commision_money = data.balance_commision_money
                    });
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        subRecharge(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$$api_recharge_addRecharge({
                        data: this.form,
                        fn: data => {
                            this.loading = false;
                            this.$message.success('恭喜您提交成功！');
                            this.form = Object.assign({}, this.form, {
                                transfer_pic: '',
                                url: '',
                                cost_money: ''
                            });
                            this.getMoney()
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
        yjSub() {//佣金充值
            let text = `<p class="text-indent:22px">佣金充值方式：<br/>
            1.输入充入金额，自动从本金扣除相应金额得到对应佣金（提前保持本金有足够本金余额），佣金不予退还。</p>`
            this.$prompt(text, '佣金充值', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                inputPattern: /^(-|\+)?\d+(\.\d+)?$/,
                inputErrorMessage: '不能为空并且只能是数字！'
            }).then(({ value }) => {
                this.$$api_recharge_commisionRecharge({
                    data: { money: value },
                    fn: data => {
                        this.$message({
                            type: 'success',
                            message: '修改成功！你的接单间隔是: ' + value
                        });
                        this.getMoney()
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                });
            }).catch(() => {
            });
        }
    },
    computed: {
        balance_money_com() {
            return this.$store.state.user.remumber.balance_money
        },
        balance_commision_money_com() {
            return this.$store.state.user.remumber.balance_commision_money
        }
    }
}