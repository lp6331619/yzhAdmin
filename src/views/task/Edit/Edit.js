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
                limit: 5,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                status: this.$route.query.status ? this.$route.query.status : '',
                sid: this.$route.query.sid ? this.$route.query.sid : '',
                title: this.$route.query.title ? this.$route.query.title : '',
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                end_time: this.$route.query.end_time ? this.$route.query.end_time : '',
                order_id: this.$route.query.order_id ? this.$route.query.order_id : '',
            },
            date: '',
            status: {},
            getMyShops: {},
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
            this.$$api_task_getTaskStatus({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.status = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_shop_getMyShops({
                data: {},
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
            this.$$api_task_getTaskList({
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
                path: '/home',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/home',
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
    },
}