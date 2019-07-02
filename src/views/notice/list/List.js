export default {
    name: 'list',
    created: function () {
        this.getList()
    },
    data() {
        return {
            loading: false,
            tableData: [],
            pageShow: false,
            notice: require("../../../assets/logo-sm.png"),
            selectData: {//搜索条件
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
            },
            childData: {}
        }
    },
    methods: {
        getList() {//获取列表数据
            this.loading = true;
            let data = {
                limit: 10,
                p: 1
            }
            this.$$api_user_notice_list({
                data: data,
                fn: data => {
                    this.loading = false;
                    this.tableData = data;
                    this.$$api_user_notice({
                        data: { id: this.tableData.list[0].id },
                        fn: data => {
                            this.childData = data;
                            this.loading = false;
                        },
                        errFn: err => {
                            this.$message.error(err.info);
                            this.loading = false;
                        }
                    });
                },
                errFn: (err) => {
                    this.$message.error(err.info);

                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        handleCurrentChange(item) {//分页
            this.selectData.page = item
            this.$router.push({
                path: '/notice/list',
                query: this.selectData
            })
            this.getList()
        },
        handleEdit(item) {//编辑
            this.$router.push(`/notice/detail?id=${item.id}`)
        },
        timeFormat(item) {//格式化类型
            // let date = item.created_at
            let date = new Date(item.created_at * 1000)
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
    },
}