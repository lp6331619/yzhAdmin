export default {
    name: 'list',
    created: function() {
        let typeNum = this.$route.path.length - 1
        this.this_type = this.$route.path.charAt(typeNum) == 0 ? 10 : this.$route.path.charAt(typeNum);
        this.getList()
    },
    data() {
        return {
            status: [{
                id: '999',
                name: '全部'
            }, {
                id: '0',
                name: '停用'
            }, {
                id: '1',
                name: '正常'
            }],
            this_type: '',
            pageShow: false,
            countrys: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            categorys: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
            tableData: [],
            selectData: { //搜索条件
                page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword: this.$route.query.keyword,
                status: this.$route.query.status ? this.$route.query.status : '999'
            },
            stationBox: [], //站台列表
            dialogFormVisible: false,
            formData: {},
            formRules: {
                name_cn: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                name_en: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                lat: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                lng: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                country_id: [{
                    required: true,
                    message: '不能为空！',
                }],
                city_id: [{
                    required: true,
                    message: '不能为空！',
                }],
            },
            cityData: [],

        }
    },
    methods: {
        getList() { //获取列表数据
            if (this.$route.query.status == 999) {
                delete this.$route.query.status
            }
            this.$route.query.type = this.this_type
            this.$$api_product_stationLists({
                data: this.$route.query,
                fn: data => {
                    this.tableData = data
                    this.loading = false;
                    this.tableData.total = parseInt(this.tableData.total)
                    if (this.tableData.total > 20) {
                        this.pageShow = true
                    }
                    this.tableData.stations.forEach((item) => {
                        let obj = []
                        obj = this.countrys.find((value) => {
                            return value.id == item.country_id
                        })
                        this.$set(item, 'country_name', obj.name)
                        this.$set(item, 'country_code', obj.abbr)
                    })
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                    this.loading = false;
                },
            })
        },
        getCity(id) {
            this.$$api_admin_ctys({ //获取分类
                data: {
                    country_id: id,
                },
                fn: data => {
                    this.cityData = data.citys
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        onSelectData() { //搜索
            this.selectData.page = 1;
            this.selectData.type = this.this_type
            let text = '';
            if (this.this_type == 1) {
                text = 'automobile'
            } else if (this.this_type == 2) {
                text = 'train'
            } else if (this.this_type == 3) {
                text = 'steamboat'
            }
            this.$router.push({
                path: `/product/ticket/${text}/safeguarding${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.page = item
            this.selectData.type = this.this_type
            let text = '';
            if (this.this_type == 1) {
                text = 'automobile'
            } else if (this.this_type == 2) {
                text = 'train'
            } else if (this.this_type == 3) {
                text = 'steamboat'
            }
            this.$router.push({
                path: `/product/ticket/${text}/safeguarding${this.this_type}`,
                query: this.selectData
            })
            this.getList()
        },
        handleEdit(item) { //编辑
            item.type = item.type.toString()
            this.formData = item
            this.dialogFormVisible = true
            this.getCity(this.formData.country_id)
        },
        handleAdd() { //新增
            this.dialogFormVisible = true
            this.formData = {}
        },
        handleBeing(item) { //下架
            let text = '';
            let status = 1;
            if (item.status == 1) {
                //下架
                text = '停用'
                status = 0
            } else {
                //上架
                text = '启用'
                status = 1
            }
            this.$confirm('是否' + text + '该产品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_product_stationChange_online_status({ //获取分类
                    data: {
                        id: item.id,
                        status: status
                    },
                    fn: data => {
                        this.$message.success(text + '成功');
                        item.status = status
                        this.getList()
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            })
        },
        submit(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let obj = []
                    obj = this.cityData.find((item) => {
                        return item.id == this.formData.city_id
                    })
                    this.formData.city_name_cn = obj.name_cn
                    this.formData.city_name_en = obj.name_en
                    this.formData.type = this.this_type
                    if (this.formData.status) {
                        delete this.formData.status
                    }
                    this.$$api_product_stationEdit({ //获取分类
                        data: this.formData,
                        fn: data => {
                            this.dialogFormVisible = false
                            this.$message.success('操作成功');
                            this.getList()
                        },
                        errFn: (err) => {
                            this.$message.error(err.msg);
                        },
                    });
                }
            })
        },
        countySelect(item) {
            this.getCity(item)
                // this.formData.city_id=''
        },
        // handleDel(item,index){//删除
        // 	this.$confirm('是否删除该票务?', '提示', {
        // 		confirmButtonText: '确定',
        // 		cancelButtonText: '取消',
        // 		type: 'warning'
        // 	}).then(() => {
        // 		this.$$api_product_ticketDel({ //获取分类
        // 			data: { id: item.id },
        // 			fn: data => {
        // 				this.$message.success('删除成功！');
        // 				this.tableData.goods.splice(index,1)
        // 			},
        // 			errFn: (err) => {
        // 				this.$message.error(err.msg);
        // 			},
        // 		});
        // 	})
        // },
        /**
         * 格式化状态
         */
        formattermodeStatus(item) {
            switch (parseInt(item.status)) {
                case 0:
                    return '停用'
                    break;
                case 1:
                    return '正常'
                    break;
            }
        },
    }
}