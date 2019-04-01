export default {
    name: 'list',
    created: function () {
        this.getType()
        this.getList()
    },
    data() {
        return {
            loading: false,
            tableData: Array,
            pageShow: false,
            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                type: this.$route.query.type ? this.$route.query.type : '',
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                end_time: this.$route.query.end_time ? this.$route.query.end_time : '',
            },
            date: '',
            type: [],
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
        }
    },
    methods: {
        getType() {
            this.$$api_funds_getTypes({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.type.push({
                        type: '',
                        name: '全部'
                    })
                    for (let i in data) {
                        this.type.push({
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
        },
        getList() { //获取列表数据
            this.loading = true;
            if (this.selectData.start_time && this.selectData.end_time) {
                this.date = [this.selectData.start_time, this.selectData.end_time]
            }
            this.$$api_funds_getLogList({
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
                path: '/fundRecord/list',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/fundRecord/list',
                query: this.selectData
            })
            this.getList()
        },
        formatterAccount(item) { //格式化类型
            let text = '';
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
        setDate(item) {
            this.selectData = Object.assign({}, this.selectData, {
                start_time: item[0],
                end_time: item[1]
            })
        },
        onExport() { //导出表格
            let token = this.$store.state.user.userinfo.token
            window.open(`${this.url}/AccountLog/getLogList?token=${token}&type=${this.selectData.type}&export=1&start_time=${this.selectData.start_time}&end_time=${this.selectData.end_time}&export=1`);
        },
        created_atTime(item) {
            if (item.created_at != '0')
                return new Date(parseInt(item.created_at) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
    },
}