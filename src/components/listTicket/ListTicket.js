export default {
    name: 'list',
    created: function() {
        let typeNum = this.$route.path.length - 1
        this.this_type = this.$route.path.charAt(typeNum) == 0 ? 10 : this.$route.path.charAt(typeNum);
        this.getList()
        this.getStation()
    },
    data() {
        return {
            is_online: [{
                id: '999',
                name: '全部'
            }, {
                id: '0',
                name: '下架'
            }, {
                id: '1',
                name: '上架'
            }],
            pageShow: false,
            countrys: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            categorys: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
            value: '',
            tableData: [],
            selectData: { //搜索条件
                departure: this.$route.query.departure ? this.$route.query.departure : '999',
                arrival: this.$route.query.arrival ? this.$route.query.arrival : '999',
                page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword: this.$route.query.keyword,
                is_online: this.$route.query.is_online ? this.$route.query.is_online : '999'
            },
            stationBox: [] //站台列表
        }
    },
    methods: {
        getList() { //获取列表数据
            if (this.$route.query.departure == '999') {
                delete this.$route.query.departure
            }
            if (this.$route.query.arrival == '999') {
                delete this.$route.query.arrival
            }
            if (this.$route.query.is_online == '999') {
                delete this.$route.query.is_online
            }
            this.$route.query.type = this.this_type
            this.$$api_product_ticketLists({
                data: this.$route.query,
                fn: data => {
                    this.tableData = data
                    this.loading = false;
                    this.tableData.total = parseInt(this.tableData.total)
                    if (this.tableData.total > 20) {
                        this.pageShow = true
                    }
                    this.tableData.goods.forEach((item) => {
                        let obj = [];
                        obj = this.countrys((countrysItem) => {
                            return item.currency_id == countrysItem.id
                        })
                        this.$set(item, 'countrys_name', obj.title)
                    })
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                    this.loading = false;
                },
            })
        },
        getStation() { //获取站台数据
            this.$$api_product_stationLists({
                data: { type: this.this_type, per_page: 1000 },
                fn: data => {
                    this.stationBox = data.stations
                    this.stationBox.unshift({
                        id: '999',
                        name_cn: '全部站点'
                    })
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            })
        },
        onSelectData() { //搜索
            this.selectData.page = 1;
            this.selectData.type = this.this_type
            let text = '';
            if (this.this_type == 2) {
                text = 'train'
            } else if (this.this_type == 1) {
                text = 'automobile'
            } else if (this.this_type == 3) {
                text = 'steamboat'
            }
            this.$router.push({
                path: `/product/ticket/${text}/ticketClerk${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.page = item
            this.selectData.type = this.this_type
            let text = '';
            if (this.this_type == 2) {
                text = 'train'
            } else if (this.this_type == 1) {
                text = 'automobile'
            } else if (this.this_type == 3) {
                text = 'steamboat'
            }
            this.$router.push({
                path: `/product/ticket/${text}/ticketClerk${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleEdit(item) { //编辑
            this.selectData.page = item
            this.selectData.type = this.this_type
            this.$router.push({
                path: `/product/ticket/train/editTicket`,
                query: { id: item, type: this.this_type }
            })
        },
        handleAdd() {
            this.$router.push({
                path: `/product/ticket/train/editTicket`,
                query: { type: this.this_type }
            })
        },
        handleBeing(item) { //下架
            let text = '';
            let isonline = 1;
            if (item.is_online == 1) {
                //下架
                text = '下架'
                isonline = 0
            } else {
                //上架
                text = '上架'
                isonline = 1
            }
            this.$confirm('是否' + text + '该产品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_product_ticketChange_online_status({ //获取分类
                    data: {
                        id: item.id,
                        is_online: isonline
                    },
                    fn: data => {
                        this.$message.success(text + '成功');
                        item.is_online = isonline
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            }).catch(() => {

            });
        },
        handleDel(item, index) { //删除
            this.$confirm('是否删除该票务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_product_ticketDel({ //获取分类
                    data: { id: item.id },
                    fn: data => {
                        this.$message.success('删除成功！');
                        this.tableData.goods.splice(index, 1)
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            })
        },
        /**
         * 格式化状态
         */
        formattermodeStatus(item) {
            switch (parseInt(item.is_online)) {
                case 0:
                    return '已下架'
                    break;
                case 1:
                    return '已上架'
                    break;
            }
        },
    }
}