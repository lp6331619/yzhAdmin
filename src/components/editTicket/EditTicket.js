import axios from 'axios';
export default {
    name: 'list',
    created: function() {
        this.getList()
    },
    data() {
        return {
            loading: false,
            productRule: { //验证
                departure: [{ required: true, message: '不能为空！' }],
                arrival: [{ required: true, message: '不能为空！', }],
                depart_time: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                arrive_time: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                is_license: [{ required: true, message: '不能为空！', }],
                days: [{ required: true, message: '不能为空！', }],
                t_shop_id: [{ required: true, message: '不能为空！', }],
                refund_rule_id: [{ required: true, message: '不能为空！', }],
                change_rule_id: [{ required: true, message: '不能为空！', }],
                price: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                children_price: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                children_age_start: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                children_age_end: [{ required: true, message: '不能为空！', trigger: 'children_age_end' }],
                rate: [{ required: true, message: '不能为空！', trigger: 'children_age_end' }],
            },
            productData: {
                spec: [],
                holiday_rules: [],
                is_children: 0,
                is_holiday: 0,
                is_rate: 0,
                is_license: 0,
            },
            countrys: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            categorys: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
            categorysChild: [], //二级分类
            options: [{ //数量
                value: 1,
            }, {
                value: 2,
            }, {
                value: 3,
            }, {
                value: 4,
            }, {
                value: 5,
            }, {
                value: 6,
            }, {
                value: 7,
            }, {
                value: 8,
            }, {
                value: 9,
            }, {
                value: 10,
            }],
            ticket_shops: [], //供应商
            refund_rule: [], //退款规则
            change_rule: [], //改签规则
            stationBox: [],

        }
    },
    methods: {
        getList() { //获取详细信息
            if (this.$route.query.id) {
                this.$$api_product_ticketDetail({
                    data: this.$route.query,
                    fn: data => {
                        this.productData = data
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            }
            this.$$api_supplier_ticket_shops({
                data: {},
                fn: data => {
                    this.ticket_shops = data.shops
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
            this.$$api_admin_change_lists({
                data: { per_page: 1000, type: 1 },
                fn: data => {
                    this.refund_rule = data.change
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
            this.$$api_admin_change_lists({
                data: { per_page: 1000, type: 2 },
                fn: data => {
                    this.change_rule = data.change
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
            this.$$api_admin_countrys({
                data: {},
                fn: data => {
                    this.countrys = data
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            })

            this.$$api_product_stationLists({
                data: { type: this.$route.query.type, per_page: 1000, status: 1 },
                fn: data => {
                    this.stationBox = data.stations
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            })
        },
        //规格相关
        handleEdit(item) { //编辑
            if (!item.status) {
                this.$set(item, 'status', 1)
            }
        },
        handleOk(item) {
            let text = '';
            let status = true
            item.name = item.name.replace(/\s+/g, "");
            item.price = item.price.toString().replace(/\s+/g, "");
            if (item.name.length == 0) {
                text = '规格名称'
                status = false
            }
            if (item.price.length == 0) {
                text = '规格价格'
                status = false
            }
            if (!status) {
                this.$message.error(text + '不能为空！')
            } else {
                this.$confirm('是否确定保存?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$set(item, 'status', 0)
                }).catch(() => {});
            }
        },
        handleDel(index) { //删除
            this.$confirm('是否确定删除该条规格?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.productData.spec.splice(index, 1)
            }).catch(() => {});
        },
        addSpecification() { //添加规格
            this.productData.spec.push({
                name: '',
                children_price: '',
                price: '',
                status: 1
            })
        },
        addRuse() { //淡旺季 添加一个规则
            this.productData.holiday_rules.push({ end_date: '', rate: '', start_date: '' })
        },
        delHoliday(index) {
            this.productData.holiday_rules.splice(index, 1)
        },
        back() {
            let text = '';
            switch (parseInt(this.$route.query.type)) {
                case 1:
                    text = 'automobile';
                    break;
                case 2:
                    text = 'train'
                    break;
                case 3:
                    text = 'steamboat'
                    break;
            }
            this.$router.push({
                path: `/product/ticket/${text}/ticketClerk${this.$route.query.type}`,

            })
        },
        refund() {
            this.$confirm('是否允许该条退款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_order_ticketOrderChange_status({ //获取分类
                    data: {
                        id: item.id,
                        status: 5
                    },
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
        submit(ref) {
            let statusSub = true
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    if (this.productData.spec.length > 0) {
                        this.productData.spec.forEach((item) => {
                            if (item.name) {
                                item.name = item.name.replace(/\s+/g, "");
                            }
                            if (item.price) {
                                item.price = item.price.toString().replace(/\s+/g, "");
                            }
                            if (item.name.length == 0 || item.price.length == 0 || !item.name || !item.price) {
                                this.$message.error('产品规格未填写完整')
                                statusSub = false
                            }
                        })
                    } else {
                        this.$message.error('至少有一个产品规格！')
                        statusSub = false
                    }
                    if (this.productData.is_holiday == 1) {
                        if (this.productData.holiday_rules.length > 0) {
                            this.productData.holiday_rules.forEach((item) => {
                                if (item.start_date) {
                                    item.start_date = item.start_date.toString().replace(/\s+/g, "");
                                }
                                if (item.end_date) {
                                    item.end_date = item.end_date.toString().replace(/\s+/g, "");
                                }
                                if (item.rate) {
                                    item.rate = item.rate.toString().replace(/\s+/g, "");
                                }
                                if (item.start_date == 0 || item.end_date == 0 || item.rate == 0 || !item.start_date || !item.end_date || !item.rate) {
                                    this.$message.error('淡旺季规则未填写完整')
                                    statusSub = false
                                }
                            })
                        } else {
                            this.$message.error('至少有一个淡旺季规则！')
                            statusSub = false
                        }
                    }
                    if (this.productData.t_shop_id) {
                        let obj = [];
                        obj = this.ticket_shops.find((item) => {
                            return item.id == this.productData.t_shop_id
                        })
                        this.productData.t_shop_name = obj.name
                    }
                    if (statusSub) {
                        console.log(this.productData.is_license)
                        this.loading = true;
                        let obj = []
                        obj = this.stationBox.find((item) => {
                            return item.name_cn == this.productData.departure
                        })
                        let obj2 = []
                        obj2 = this.stationBox.find((item) => {
                            return item.name_cn == this.productData.arrival
                        })

                        this.productData = Object.assign({}, this.productData, {
                            type: this.$route.query.type,
                            depart_city_id: obj.city_id,
                            arrival_city_id: obj2.city_id,
                            depart_lat: obj.lat,
                            depart_lng: obj.lng,
                            arrive_lat: obj2.lat,
                            arrive_lng: obj2.lng,
                        })
                        let options = {
                            method: 'post',
                            url: 'http://admin-api.quitang.com/ticket/edit',
                            data: this.productData,
                            headers: {
                                'Authorization': this.$store.state.user.userinfo.token,
                                'Content-Type': "application/x-www-form-urlencoded",
                            }
                        };
                        axios(options).then((res) => {
                            if (res.data.error_code == 0) {
                                this.loading = false;
                                this.$message.success('恭喜您操作成功')
                                this.back()
                            } else {
                                this.loading = false;
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                }
            })
        },
    },
}