export default {
    name: 'list',
    created: function() {
        let typeNum = this.$route.path.length - 1
        this.this_type = this.$route.path.charAt(typeNum);
        this.getList()
        this.getSupplier()
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
                shop_id: this.$route.query.shop_id ? parseInt(this.$route.query.shop_id) : '999',
                country_id: this.$route.query.country_id ? parseInt(this.$route.query.country_id) : '999',
                wechat: this.$route.query.wechat,
                train_num:this.$route.query.train_num
            },
            country: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            type_box: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
            supplier: []
        }
    },
    methods: {
        getList() { //获取列表数据
            this.loading = true;
            let dataBox = JSON.parse(JSON.stringify(this.$route.query))
            this.$route.query.status = this.this_type
            dataBox.status = this.this_type
            if (dataBox.shop_id == '999') {
                delete dataBox.shop_id
            }
            if (dataBox.country_id == '999') {
                delete dataBox.country_id
            }
            if (this.this_type == 1) {
                delete dataBox.status
                dataBox.processed = 0
            }
            if (this.this_type == 4 || this.this_type == 5) {
                dataBox.processed = 1
            }
            this.$$api_order_ticketorder_lists({
                data: dataBox,
                fn: data => {
                    this.loading = false;
                    this.tableData = data
                    this.tableData.total = parseInt(this.tableData.total)
                    if (this.tableData.total > 20) {
                        this.pageShow = true
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                    this.loading = false;
                },
            });
        },
        getSupplier() {
            this.$$api_supplier_ticket_shops({
                data: { all: 10000 },
                fn: data => {
                    this.loading = false;
                    this.supplier = data.shops;
                    this.supplier.unshift({ id: '999', name: '全部供应商' })
                    if (this.country[0].id != '999') {
                        this.country.unshift({ id: '999', name: '全部国家' });
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
                path: `/order/ticket/list${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.page = item
            this.selectData.status = this.this_type
            this.$router.push({
                path: `/order/ticket/list${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleEdit(item) { //编辑
            this.$router.push(`/order/ticket/edit?id=${item.id}&type=${this.this_type}`)
        },
        addList() {
            this.$router.push(`/order/ticket/edit?type=${this.this_type}`)
        },
        handleClose(item, index) { //关闭
            this.$confirm('是否关闭该订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: { id: item.id, status: 6 },
                    fn: data => {
                        this.$message.success('关闭订单成功！');
                        this.tableData.goods.splice(index, 1)
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
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: { id: item.id, status: 5 },
                    fn: data => {
                        this.$message.success('退款成功！');
                        this.tableData.goods.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
        handleGood(item, index) {
            this.$confirm('是否允许该条改签?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: { id: item.id, status: 1 },
                    fn: data => {
                        this.$message.success('改签成功！');
                        this.tableData.goods.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
        handleGood2(item, index) {
            this.$confirm('是否允许该条退款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: { id: item.id, status: 6 },
                    fn: data => {
                        this.$message.success('退款成功！');
                        this.tableData.goods.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
        handleNo(item, index) {
            this.$confirm('是否拒绝该请求?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: { id: item.id, status: 6 },
                    fn: data => {
                        this.$message.success('拒绝成功！');
                        this.tableData.goods.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {});
        },
        formatterType(item) {
            switch (parseInt(item.type)) {
                case 1:
                    return '汽车'
                    break;
                case 2:
                    return '火车'
                    break;
                case 3:
                    return '轮船'
                    break;
                case 4:
                    return '飞机'
                    break;
            }
        },
        formatterStatus(item){
            switch (parseInt(item.status)) {
                case 5:
                    if(parseInt(item.processed)== 1 ){
                        return '退款成功'
                        
                    }else{
                        return '退款中'
                    }
                    break;
            }
        },
    },
    watch: {
        this_type: {
            handler: function(val, oldval) {
                console.log(val, oldval)

            },
            deep: true //对象内部的属性监听，也叫深度监听  
        },

    }

}