import imgPop from "cps/imgPop/imgPop.vue";
export default {
    name: 'orderlist',
    components: {
        'imgPop': imgPop
    },
    props: {
        pageList: Boolean,//是否需要搜索
        listStatus: String,// 状态传递status
    },
    created() {
        this.getType()
        this.getList()
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
            getMyShops: {},
            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                task_type: 1,
                type: this.$route.query.type ? this.$route.query.type : '',
                is_invite_praise: this.$route.query.is_invite_praise ? this.$route.query.is_invite_praise : '',
                status: this.$route.query.status ? this.$route.query.status : this.listStatus,
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                end_time: this.$route.query.end_time ? this.$route.query.end_time : '',
                tid: this.$route.query.tid ? this.$route.query.tid : '',
                sid: this.$route.query.sid ? this.$route.query.sid : '',
                oid: this.$route.query.oid ? this.$route.query.oid : '',
                member_name: this.$route.query.member_name ? this.$route.query.member_name : '',
                order_no: this.$route.query.order_no ? this.$route.query.order_no : '',
                money: this.$route.query.money ? this.$route.query.money : '',
            },
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogVisible3: false,
            form: {},
            form2: {
                type: 1,
                pics: [],
                video: ''
            },
            rulesBox: {
                status: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                cancel_content: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            rulesBox2: {
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
                video: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            date: '',
            status: [],
            popStatus: 2,
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
            multipleSelection: [], //选择的数组
            dialogImageUrl: '', //图片列表
            fileList: [], //图片列表

            videoFlag: false, //是否显示进度条
            videoUploadPercent: "", //进度条的进度，
            isShowUploadVideo: false, //显示上传按钮
            videoBox: '', //视频容器
            getPraisePrice: '',//价钱
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
            this.$$api_order_getOrderStatus({ //获取状态
                data: {},
                fn: data => {
                    this.loading = false;
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
                tokenFlag: true
            });
            this.$$api_shop_getMyShops({
                data: {
                    status: 1
                },
                fn: data => {
                    this.loading = false;
                    this.getMyShops = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
            this.$$api_order_getPraisePrice({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.getPraisePrice = data
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

            this.$$api_order_getOrderList({
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
                path: '/home/orderList',
                query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item) { //分页
            this.selectData.p = item
            this.$router.push({
                path: '/home/orderList',
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
        onExport() { //导出表格
            let token = this.$store.state.user.userinfo.token
            window.open(`${this.url}/Order/getOrderList?token=${token}&status=${this.selectData.status}&export=1&start_time=${this.selectData.start_time}&end_time=${this.selectData.end_time}&tid=${this.selectData.tid}&oid=${this.selectData.oid}&member_name=${this.selectData.member_name}&order_no=${this.selectData.order_no}&money=${this.selectData.money}&export=1`);
        },
        created_atTime(item) {
            if (item.created_at != '0')
                return this.timeDate(item.created_at)
        },
        complete_timeTime(item) {
            if (item.operate_time != '0')
                return this.timeDate(item.operate_time)
        },
        openPop(item, status) {
            this.dialogFormVisible = true
            this.popStatus = status
            this.form = Object.assign({}, this.form, {
                id: item,
            })
        },
        sub(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let data = JSON.parse(JSON.stringify(this.form))
                    switch (this.popStatus) {
                        case 1:
                            data.status = data.status == '6' ? '4' : data.status;
                            this.$$api_order_payCapital({
                                data: data,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 2:
                            this.$$api_order_payCommision({
                                data: data,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 3:
                            data.status = data.status == '6' ? '4' : data.status;
                            this.$$api_order_batchPayCapital({
                                data: data,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                        case 4:
                            this.$$api_order_batchPayCommision({
                                data: data,
                                fn: data => {
                                    this.loading = false;
                                    this.$message.success('恭喜您!审核成功!')
                                    this.dialogFormVisible = false
                                },
                                errFn: (err) => {
                                    this.$message.error(err.info);
                                    this.loading = false;
                                },
                                tokenFlag: true
                            });
                            break;
                    }
                    this.getList()
                }
            })
        },
        handleSelectionChange(val) {
            if (val.length > 0) {
                this.multipleSelection = []
                val.forEach((item) => {
                    this.multipleSelection.push(item.id)
                })
            }
        },

        /**
         *  修改支付金额
         *
         * @param {*} id
         */
        payModify(id) {
            this.$prompt('请输入修改金额', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^(-|\+)?\d+(\.\d+)?$/,
                inputErrorMessage: '不能为空并且只能是数字！'
            }).then(({
                value
            }) => {
                this.$$api_order_editPayMoney({
                    data: {
                        id: id,
                        real_buy_price: value
                    },
                    fn: data => {
                        this.loading = false;
                        this.$message.success('恭喜您!修改成功!')
                        this.getList()
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.loading = false;
                    },
                });
            }).catch(() => {

            });
        },

        /**
         *  邀请评价
         *
         * @param {*} id
         */
        openComment(id) {
            this.dialogFormVisible2 = true;
            this.videoBox = '';
            this.fileList = [];
            this.form2 = {
                id: id,
                type: 1,
                pics: [],
                video: ''
            }
        },

        /**
         *  删除
         *
         * @param {*} file
         * @param {*} fileList
         */
        handleRemove(file, fileList) {
            this.form2.pics = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible3 = true;
        },

        /**
         *  上传成功
         *
         * @param {*} response
         * @param {*} file
         * @param {*} fileList
         */
        handleSuccess(response, file, fileList) {

            this.fileList = fileList
            this.fileList.forEach((item) => {
                this.form2.pics.push(item.response.data.url)
            })

        },

        /**
         * 超过限制时
         *
         * @param {*} files
         * @param {*} fileList
         */
        exceedFunction(files, fileList) {
            this.$message.error('最多上传 5 张!')
        },
        /**
         *  图片格式化
         *
         * @param {*} file
         * @returns
         */
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
        /**
         *  邀请评价提交
         *
         * @param {*} ref
         */
        sub2(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$$api_order_invitePraise({
                        data: this.form2,
                        fn: data => {
                            this.loading = false;
                            this.$message.success('恭喜您!审核成功!')
                            this.dialogFormVisible2 = false
                            this.getList()
                        },
                        errFn: (err) => {
                            this.$message.error(err.info);
                            this.loading = false;
                        }
                    });
                }
            })
        },

        /**
         *
         *
         * @param {*} file
         * @returns
         */
        beforeUploadVideo(file) {
            const isLt20M = file.size / 1024 / 1024 < 20;
            if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message.error('请上传正确的视频格式');
                return false;
            }
            if (!isLt20M) {
                this.$message.error('上传视频大小不能超过20MB哦!');
                return false;
            }
            this.isShowUploadVideo = false;
        },

        /**
         * 进度条
         *
         * @param {*} event
         * @param {*} file
         * @param {*} fileList
         */
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },

        /**
         *  上传成功回调
         *
         * @param {*} res
         * @param {*} file
         */
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (res.status == 1) {
                this.videoBox = res.data.all_url;
                this.form2.video = res.data.url;
                // this.videoForm.showVideoPath = res.data.uploadUrl;
            } else {
                this.$message.error('视频上传失败，请重新上传！');
            }
        },
    },
    watch: {
        listStatus: function (newQuestion) {
            this.selectData.status = newQuestion
            this.getList()
        }
    }
}