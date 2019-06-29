export default {
    name: 'list',
    created: function () {
        this.asyncData()
        this.DateToday()
    },
    data() {
        return {
            loading: false,
            form: {
                type: '1',
                step_num: 1,
                search: [{
                    keyword: '',
                    num: '',
                }],
                release_date: '',
                age: [],
                order_type: '1',
                delay_accept: '0',
                is_time_out_cancel: '2',
                release_type: '1',
                sex: '0',
                age: ['0'],
                credit_level: '0',
                huabei: '0',
                grade_buyer: '0',
                phone_type: '0',
                attgoods: [],
                limit_buy_time: '1',
                is_only_allow_browse: '0'
            },
            status: false,
            shopBox: [], //商家
            getExpressTypes: [], //快递
            getAgeStages: [], //年龄阶段
            getCreditLevels: [], //任务信用等级
            getCostPrice: {}, //增值服务价格
            calculate: [], //计算任务费用明细
            Province: [], //省份
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
            lateDay: {
                '0': '0天',
                '1': '1天',
                '2': '2天',
                '3': '3天',
                '4': '4天',
                '5': '5天',
            },
            rulesBox: {
                title: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                sid: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                product_name: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                product_url: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }, {
                    pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
                    message: "请输入正确的网址！",
                    trigger: "blur"
                }],
                date: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                product_pic1: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                product_search_price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                product_buy_price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],

                release_start_time: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                release_end_time: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                product_buy_num: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],

                limit_buy_time: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                is_only_allow_browse: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                pay_person_num: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                order_type: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                release_type: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
                express_type: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'change'
                }],
            },
            uploadArray: {},
        }
    },
    methods: {
        async asyncData() {
            await this.getType();
            await this.getList();
        },
        getType() {
            this.$$api_shop_getMyShops({
                data: {
                    status: 1
                },
                fn: data => {
                    this.loading = false;
                    for (let i in data) {
                        this.shopBox.push({
                            type: i,
                            name: data[i]
                        })
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_shop_getProvince({
                data: {},
                fn: data => {
                    this.Province = data;
                    this.loading = false;
                },
                errFn: err => {
                    this.$message.error(err.info);
                    this.loading = false;
                }
            });
            this.$$api_task_getExpressTypes({
                data: {},
                fn: data => {
                    this.loading = false;
                    for (let i in data) {
                        this.getExpressTypes.push({
                            type: i,
                            name: data[i]
                        })
                    }
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
                    for (let i in data) {
                        this.getAgeStages.push({
                            type: i,
                            name: data[i]
                        })
                    }
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
                    for (let i in data) {
                        this.getCreditLevels.push({
                            type: i,
                            name: data[i]
                        })
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_task_getCostPrice({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.getCostPrice = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
        },
        getList() { //获取列表数据
            if (this.$route.query.tid) {
                this.loading = true;
                this.$$api_task_detail({
                    data: this.$route.query,
                    fn: data => {
                        this.loading = false;
                        this.form = data
                        let remove_area = []
                        if (this.form.task_service.remove_area.typeof == 'string') {
                            let arr = this.form.task_service.remove_area.split(',');
                            arr.forEach((item) => {
                                remove_area.push(parseInt(item))
                            })
                        }
                        this.form = Object.assign({}, this.form, {
                            url2: this.form.product_pic1,
                            age: this.form.task_service.age.split(','),
                            remove_area: remove_area,
                            sex: this.form.task_service.sex,
                            age_stage: this.form.task_service.age_stage,
                            credit_level: this.form.task_service.credit_level,
                            huabei: this.form.task_service.huabei,
                            grade_buyer: this.form.task_service.grade_buyer,
                            release_start_time: this.form.release_start_time,
                            release_end_time: this.form.release_end_time,
                            is_time_out_cancel: this.form.is_time_out_cancel == '0' ? '2' : this.form.is_time_out_cancel,
                            is_only_allow_browse: this.form.task_service.is_only_allow_browse
                        })
                        this.form.attgoods.map((item) => {
                            item.product_pic2 = item.product_pic
                        })
                        this.DateToday()
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.loading = false;
                    },
                    tokenFlag: true
                });
            }
        },
        setDate(item) {
            // this.form = Object.assign({}, this.form, {
            //     release_start_time: item[0],
            //     release_end_time: item[1]
            // })
        },
        handleAvatarSuccess(res, file) { //图片上传成功
            this.form = Object.assign({}, this.form, {
                product_pic1: res.data.url,
                url2: res.data.all_url
            })

        },
        product_picSuccess(res, file) {
            this.$set(this.form.attgoods[this.uploadArray], 'product_pic', res.data.url)
            this.$set(this.form.attgoods[this.uploadArray], 'product_pic2', res.data.all_url)
        },
        uploadMat(item) {
            this.uploadArray = item;
        },
        beforeAvatarUpload(file) { //图片上传前
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            let status;
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                status = false
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return status && isLt2M
        },
        addSearch() {
            if (this.form.search && this.form.search.length >= 10) {
                this.$message.error('最多增加10条!')
            } else {
                this.form.search.push({
                    keyword: '',
                    num: ''
                })
            }
        },
        submit(ref) {
            console.log(this.form)
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.getPrice();
                }
            })
        },
        submit2() {
            this.$$api_task_addTask({
                data: this.form,
                fn: data => {
                    this.loading = false;
                    this.$message.success('恭喜您!提交成功!')
                    this.$router.push('/home');
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
        },
        del(index) {
            if (this.form.search && this.form.search.length > 1) {
                this.form.search.splice(index, 1)
            }
        },
        getPrice() {
            this.$$api_task_calculateNew({
                data: this.form,
                fn: data => {
                    this.loading = false;
                    this.calculate = data
                    this.$message.success('恭喜您!提交成功!')
                    this.status = true;
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        DateToday() {
            let time = this.getNowFormatDate()
            this.form = Object.assign({}, this.form, {
                release_date: time
            })
        },

        /**
         *  添加附加商品
         *
         */
        addAdditional() {
            this.form.attgoods.push({
                product_url: '', //产品链接',
                product_pic2: '',
                product_pic: '', //产品主图',
                product_buy_price: '', //产品成交价',
                product_buy_num: '', //`下单产品数量',
                product_format: '' //购买规格',
            })
        },

        /**
         *  删除
         *
         * @param {*} index
         */
        delItem(index) {
            this.form.attgoods.splice(index, 1)
        }
    },
}