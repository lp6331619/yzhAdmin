export default {
    name: 'list',
    created: function() {
        let typeNum = this.$route.path.length - 1
        this.this_type = this.$route.path.charAt(typeNum);
        this.getList()
    },
    data() {
        return {
            loading: false,
            tableData: [],
            this_type: 1,
            pageShow: false,
            selectData: { //搜索条件
                status: this.$route.query.status ? parseInt(this.$route.query.status) : 1,
                page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                order_sn: this.$route.query.order_sn,
                country_id: this.$route.query.country_id ? this.$route.query.country_id : '999',
                wechat: this.$route.query.wechat,
            },
            country: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            type_box: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
        }
    },
    methods: {
        getList() { //获取列表数据
            this.loading = true;
            this.$route.query.status = this.this_type
            if (this.$route.query.country_id == 999) {
                delete this.$route.query.country_id
            }
            this.$$api_order_lists({
                data: this.$route.query,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                    this.tableData.total = parseInt(this.tableData.total)
                    if (this.tableData.total > 20) {
                        this.pageShow = true
                    }
                    if (this.country[0].id != '999') {
                        this.country.unshift({
                            id: '999',
                            name: '全部国家'
                        })
                    }

                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                    this.loading = false;
                },
            });
        },
        onSelectData() { //搜索
            this.selectData.page = 1;
            this.selectData.status = this.this_type
            this.$router.push({
                path: `/order/travel/list${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.page = item
            this.selectData.status = this.this_type
            this.$router.push({
                path: `/order/travel/list${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleEdit(item) { //编辑
            this.$router.push(`/order/travel/edit?id=${item.id}&type=${this.this_type}`)
        },
        addList() {
            this.$router.push(`/order/travel/edit?type=${this.this_type}`)
        },
        handleClose(item, index) { //关闭
            this.$confirm('是否关闭该订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_orderChange_status({ //获取分类
                    data: { id: item.id, status: 8 },
                    fn: data => {
                        this.$message.success('关闭订单成功！');
                        this.tableData.orders.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
        handleBeing(item, index) { //退款
            this.$confirm('是否允许该条退款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_orderChange_status({ //获取分类
                    data: { id: item.id, status: 7 },
                    fn: data => {
                        this.$message.success('允许退款成功！');
                        this.tableData.orders.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
    },
}