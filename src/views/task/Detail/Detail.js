import imgPop from "cps/imgPop/imgPop.vue";
export default {
    name: 'list',
    created: function () {
        this.getType()
        if (this.selectData.status == '100') {
            this.getDetail()
        } else {
            this.getList()
        }
    },
    components: {
        'imgPop': imgPop
    },
    data() {
        return {
            loading: false,
            imgPopData: {
                url: '',
                status: false
            },
            data: {
                task_service: {},
                search: [],
                task_price: {}
            },
            pageShow: false,
            getExpressTypes: {},
            getAgeStages: {},
            getCreditLevels: {},
            //列表
            tableData: Array,
            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                status: this.$route.query.status ? this.$route.query.status : '100',
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                id: this.$route.query.id ? this.$route.query.id : '',
                tid: this.$route.query.tid ? this.$route.query.tid : '',
                sid: this.$route.query.sid ? this.$route.query.sid : '',
                oid: this.$route.query.oid ? this.$route.query.oid : '',
                member_name: this.$route.query.member_name ? this.$route.query.member_name : '',
                order_no: this.$route.query.order_no ? this.$route.query.order_no : '',
                money: this.$route.query.money ? this.$route.query.money : '',
            },
            dialogFormVisible: false,
            form: {},
            rulesBox: {
                status: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                cancel_content: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            date: '',
            status: [],
            popStatus: 2,
            pickerOptions2: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            multipleSelection: [] //选择的数组

        }
    },
    methods: {
        openImg(url) {
            this.imgPopData = {
                url: url,
                status: true
            }
        },
        closeImg(status) {
            this.imgPopData.status = status
        },
        getType() {
            this.$$api_task_getExpressTypes({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.getExpressTypes = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_task_getAgeStages({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.getAgeStages = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_task_getCreditLevels({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.getCreditLevels = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_order_getOrderStatus({
                data: {},
                fn: data => {
                    this.loading = false;
                    for (let i in data) {
                        this.status.push({
                            type: i,
                            name: data[i]
                        })
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
        },
        getList() { //获取列表数据
            this.loading = true;
            if (this.selectData.start_time && this.selectData.end_time) {
                this.date = [this.selectData.start_time, this.selectData.end_time]
            }
            this.$$api_order_getOrderList({
                data: this.selectData,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                    this.tableData.count = parseInt(this.tableData.count)
                    if (this.tableData.count > 5) {
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
        getDetail() {
            this.loading = true;
            this.$$api_task_detail({
                data: this.$route.query,
                fn: data => {
                    this.loading = false;
                    this.data = data
                    this.$set(this.data, 'task_service2', [])
                    this.data.task_service2.push(this.data.task_service);
                    this.$set(this.data, 'task_price2', [])
                    this.data.task_price2.push(this.data.task_price)
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        time(nS) {
            if (nS != '0')
                return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        Revoke() { //撤销
            this.$confirm('是否撤销任务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                this.$$api_task_cancelTask({
                    data: {
                        id: this.data.id
                    },
                    fn: data => {
                        this.loading = false;
                        this.$message.success('撤销成功!')
                        this.$router.push('/home')
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.loading = false;
                    },
                    tokenFlag: true
                });
            }).catch(() => {
                
            });
        },
        formatHuabei(item) {
            let text = ''
            switch (parseInt(item.huabei)) {
                case 1:
                    text = '不需要'
                    break;
                case 2:
                    text = '需要'
                    break;
            }
            return text

        },
        formatPhone_type(item) {
            let text = ''
            switch (parseInt(item.phone_type)) {
                case 0:
                    text = '不限'
                    break;
                case 1:
                    text = 'Android'
                    break;
                case 2:
                    text = 'Ios'
                    break;
            }
            return text
        },
        formatGrade(item, item2) {
            let text = ''
            switch (parseInt(item.grade_buyer)) {
                case 1:
                    text = '不需要'
                    break;
                case 2:
                    text = '需要'
                    break;
            }
            return text
        },
        handleClick() {
            this.$router.push({
                path: '/home/detail',
                query: {
                    tid: this.$route.query.tid,
                    status: this.selectData.status
                }
            })
            this.getList()
        },
        formatterAge(item) {
            if (item.age.length > 0) {
                let arr = item.age.split(',')
                let t = ''
                console.log(arr)
                arr.forEach((light) => {
                    t += item.age_stage[light] + ','
                })
                return t
            }
        },
        onSelectData() { //搜索
            this.selectData.p = 1;
            this.$router.push({
                path: '/home/detail',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/home/detail',
                query: this.selectData
            })
            this.getList()
        },
        setDate(item) {
            this.selectData = Object.assign({}, this.selectData, {
                start_time: item[0],
                end_time: item[1]
            })
        },
        onExport() { //导出表格
            let token = this.$store.state.user.userinfo.token
            window.open(`${this.url}/Order/getOrderList?token=${token}&status=${this.selectData.status}&export=1&tid=${this.selectData.tid}`);
        },
        created_atTime(item) {
            if (item.created_at != '0') {
                return this.timeDate(item.created_at)
            }
        },
        complete_timeTime(item) {
            if (item.complete_time != '0')
                return this.timeDate(item.complete_time)
        },
        openPop(item, status) {
            this.dialogFormVisible = true
            this.popStatus = status
            this.form = Object.assign({}, this.form, {
                id: item,
            })
        },
        sub(ref) {
            console.log(this.popStatus)
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    switch (this.popStatus) {
                        case 1:
                            this.$$api_order_batchAuditOrder({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                    this.getList()
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 2:
                            this.$$api_order_auditOrder({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                    this.getList()
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                    }
                }
            })
        },
        handleSelectionChange(val) {
            if (val.length > 0) {
                this.multipleSelection = []
                val.forEach((item) => {
                    this.multipleSelection.push(item.id)
                })
            }
        },
    },
}