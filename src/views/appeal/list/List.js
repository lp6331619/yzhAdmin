import imgPop from "cps/imgPop/imgPop.vue";
export default {
    name: 'list',
    created: function () {
        this.getType()
        this.getList()
    },
    components: {
        'imgPop': imgPop
    },
    data() {
        return {
            imgPopData: {
                url: '',
                status: false
            },
            loading: false,
            tableData: Array,
            pageShow: false,
            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                type: this.$route.query.type ? this.$route.query.type : '',
                source: this.$route.query.source ? this.$route.query.source : '',
                order_no: this.$route.query.order_no ? this.$route.query.order_no : '',
                shop_id: this.$route.query.shop_id ? this.$route.query.shop_id : '',
                wangwang: this.$route.query.wangwang ? this.$route.query.wangwang : '',
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                end_time: this.$route.query.end_time ? this.$route.query.end_time : '',
                status: this.$route.query.status ? this.$route.query.status : '',
            },
            date: '',
            type: [],
            source: [],
            status: [],
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
            addAppeal: false,
            addAppealForm: {
                pics: []
            },
            rule_addAppeal: {
                order_no: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                pics: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
        }
    },
    methods: {
        openImg(url) {
            this.imgPopData = {
                url: url,
                status: true
            }
        },
        closeImg(status) {
            this.imgPopData.status = status
        },
        getType() {
            this.$$api_appeal_getAppealSources({
                data: {},
                fn: data => {
                    this.loading = false;
                    // this.source.push({
                    //     type: '',
                    //     name: '全部种类'
                    // })
                    for (let i in data) {
                        this.source.push({
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
            this.$$api_appeal_getAppealTypes({
                data: {},
                fn: data => {
                    this.loading = false;
                    // this.type.push({
                    //     type: '',
                    //     name: '全部类型'
                    // })
                    for (let i in data) {
                        this.type.push({
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
            this.$$api_appeal_getAppealStatus({
                data: {},
                fn: data => {
                    this.loading = false;
                    // this.status.push({
                    //     type: '',
                    //     name: '全部状态'
                    // })
                    for (let i in data) {
                        this.status.push({
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
        },
        getList() { //获取列表数据
            this.loading = true;
            if (this.selectData.start_time && this.selectData.end_time) {
                this.date = [this.selectData.start_time, this.selectData.end_time]
            }
            this.$$api_appeal_getAppealList({
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
                path: '/appeal/list',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/appeal/list',
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
        handleRemove(file, fileList) {
            this.addAppealForm.pics = fileList
        },
        handleAvatarSuccess(res, file) { //图片上传成功
            this.addAppealForm.pics.push({
                url: res.data.all_url,
                url_rel: res.data.url
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
        addAppealSub(ref) {
            this.$refs[ref].validate(valid => {
                if (valid) {
                    this.$$api_appeal_addAppeal({
                        data: this.addAppealForm,
                        fn: data => {
                            this.loading = false;
                            this.$message.success('恭喜您！申诉成功！')
                            this.addAppeal = false
                        },
                        errFn: (err) => {
                            this.$message.error(err.info);
                            this.loading = false;
                        },
                    });
                }
            })
        },
        error() {
            this.$message.error('最多上传2张！')
        },
        created_atTime(item) {
            if (item.created_at != '0')
            return this.timeDate(item.created_at)
        }
    },
}