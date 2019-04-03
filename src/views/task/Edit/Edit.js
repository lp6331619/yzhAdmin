export default {
    name: 'list',
    created: function () {
        // this.getType()
        // this.getList()
        this.asyncData()
    },
    data() {
        return {
            loading: false,
            form: {
                type: 1,
                step_num: 1,
                search: [{
                    keyword: '',
                    num: '',
                }],
                age: [],
                delay_accept: '0',
                is_time_out_cancel: '2'
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
                product_buy_num: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                pay_person_num: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],



                reward_money: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
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
            }
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
                        let arr = this.form.task_service.remove_area.split(',');
                        let remove_area = []
                        arr.forEach((item) => {
                            remove_area.push(parseInt(item))
                        })
                        this.form = Object.assign({}, this.form, {
                            date: [this.form.release_start_time, this.form.release_end_time],
                            url2: this.form.product_pic1,
                            age: this.form.task_service.age.split(','),
                            remove_area: remove_area,
                            sex: this.form.task_service.sex,
                            age_stage: this.form.task_service.age_stage,
                            credit_level: this.form.task_service.credit_level,
                            huabei: this.form.task_service.huabei,
                            grade_buyer: this.form.task_service.grade_buyer,
                            release_start_time: parseInt(this.form.release_start_time),
                            is_time_out_cancel: this.form.is_time_out_cancel == '0' ? '2' : this.form.is_time_out_cancel

                        })
                        console.log(this.form.release_start_time)
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
            this.form = Object.assign({}, this.form, {
                release_start_time: item[0],
                release_end_time: item[1]
            })
            console.log(this.form.release_start_time, this.form.release_end_time)
        },
        handleAvatarSuccess(res, file) { //图片上传成功
            this.form = Object.assign({}, this.form, {
                product_pic1: res.data.url,
                url2: res.data.all_url
            })

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
            this.$$api_task_calculate({
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
    },
}