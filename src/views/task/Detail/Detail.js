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
            getExpressTypes: {},
            getAgeStages: {},
            getCreditLevels: {}

        }
    },
    methods: {
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
        },
        getList() { //获取列表数据
            this.loading = true;
            this.$$api_task_detail({
                data: this.$route.query,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        Revoke() { //撤销
            this.loading = true;
            this.$$api_task_cancelTask({
                data: this.$route.query,
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
        }

    },
}