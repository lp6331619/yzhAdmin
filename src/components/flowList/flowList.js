import imgPop from "cps/imgPop/imgPop.vue";
export default {
    name: 'orderlist',
    components: {
        'imgPop': imgPop
    },
    props: {
        pageList: Boolean,//是否需要搜索
        listStatus: String,// 状态传递status
    },
    created: function () {
        this.getType()
        this.getList()
    },
    data() {
        return {
            imgPopData: {
                url: '',
                status: false
            },
            loading: false,
            tableData: Array,
            pageShow: false,
            getMyShops: {},
            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                task_type: 2,
                status: this.$route.query.status ? this.$route.query.status : this.listStatus,
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                end_time: this.$route.query.end_time ? this.$route.query.end_time : '',
                tid: this.$route.query.tid ? this.$route.query.tid : '',
                sid: this.$route.query.sid ? this.$route.query.sid : '',
                oid: this.$route.query.oid ? this.$route.query.oid : '',
                member_name: this.$route.query.member_name ? this.$route.query.member_name : '',
            },
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogVisible3: false,
            form: {},
            form2: {
                type: 1,
                pics: [],
                video: ''
            },
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
            rulesBox2: {
                type: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                pics: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                video: [{
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
            multipleSelection: [], //选择的数组
            dialogImageUrl: '', //图片列表
            fileList: [], //图片列表

            videoFlag: false, //是否显示进度条
            videoUploadPercent: "", //进度条的进度，
            isShowUploadVideo: false, //显示上传按钮
            videoBox: '', //视频容器
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
            this.$$api_order_getFlowOrderStatus({ //获取状态
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
                tokenFlag: true
            });
            this.$$api_shop_getMyShops({
                data: {
                    status: 1
                },
                fn: data => {
                    this.loading = false;
                    this.getMyShops = data
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
        onSelectData() { //搜索
            this.selectData.p = 1;
            this.$router.push({
                path: '/flow/orderList',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/flow/orderList',
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
            window.open(`${this.url}/Order/getOrderList?token=${token}&status=${this.selectData.status}&export=1&start_time=${this.selectData.start_time}&end_time=${this.selectData.end_time}&tid=${this.selectData.tid}&oid=${this.selectData.oid}&member_name=${this.selectData.member_name}&export=1`);
        },
        created_atTime(item) {
            if (item.created_at != '0')
                return this.timeDate(item.created_at)
        },
        complete_timeTime(item) {
            if (item.operate_time != '0')
                return this.timeDate(item.operate_time)
        },
        openPop(item, status) {
            this.dialogFormVisible = true
            this.popStatus = status
            this.form = Object.assign({}, this.form, {
                id: item,
            })
        },
        sub(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    switch (this.popStatus) {
                        case 1:
                            this.$$api_order_payCapital({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 2:
                            this.$$api_order_payCommision({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 3:
                            this.$$api_order_batchPayCapital({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 4:
                            this.$$api_order_batchPayCommision({
                                data: this.form,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                    }
                    this.getList()
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
    watch: {
        listStatus: function (newQuestion) {
            this.selectData.status = newQuestion
            this.getList()
        }
    }
}