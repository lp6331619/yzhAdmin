import axios from 'axios';
export default {
    name: 'user',
    created: function() {
        this.getData()
    },
    data() {
        return {
            loading: false,
            productData: {
                next_valid_time: ''
            },
            select: [{
                name: 'man',
                id: '1'
            }, {
                name: 'woman',
                id: '2'
            }],
            contact: [],
            passagers: [],
            ticket: [],
            // ticketArry: [],
            ticketVal: '',
            ticketPdf: [],
            this_type: this.$route.query.type,
            next_valid_time: '',
            refund:{},
            msg:{},
            bigImgBoo:false,
            bigImgSrc:'',

            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        getData() { //
            this.loading = true;
            //登录的用户更新用户信息
            this.$$api_order_ticketOrderDetail({
                data: { id: this.$route.query.id },
                fn: data => {
                    this.productData = data
                    this.refund.refound_money = JSON.parse(JSON.stringify(this.productData.refound_money));
                        // this.$set(this.productData, 'time', '05:30')
                    this.$set(this.productData, 'product', [])
                        //产品
                    this.productData.product[0] = Object.assign({}, this.productData.product[0], {
                        ticket_name: this.productData.ticket_name,
                        depdate: this.productData.depdate,
                        depart_time: this.productData.depart_time,
                        arrival: this.productData.arrival,
                        departure: this.productData.departure,
                        type: this.productData.type,
                        train_num: this.productData.train_num,
                        spec: this.productData.spec,
                        adult_num: this.productData.adult_num,
                        children_num: this.productData.children_num,
                        shop_name: this.productData.shop_name,
                        change_seat:this.productData.change_seat=='0' ? '不接受':'接受'
                    })
                    this.$set(this.contact, 0, {
                        phone: this.productData.phone,
                        wechat: this.productData.wechat,
                        remark: this.productData.remark,
                    })
                    this.passagers = JSON.parse(this.productData.passagers); //出行人
                    // this.passagers = Object.assign({}, this.passagers, {
                    // 	department_id: this.returnData.department_id,
                    // 	upNameAdd: this.returnData.depa_name
                    // })
                    this.$set(this.passagers[0], 'sexName', this.passagers[0].Sex =='女' ? 'woman' : 'man')
                    if (this.productData.ticket.length > 0) {
                        let ticketArry = this.productData.ticket.substring(0, this.productData.ticket.length - 1)
                        ticketArry = ticketArry.split(",")
                            // this.ticket
                        ticketArry.forEach((item) => {
                            this.ticket.push({
                                url: item
                            })
                        })
                    }
                    this.loading = false;
                },
                errFn: (err) => {
                    this.$message.error(err.message);
                    this.loading = false;
                }
            });
        },
        back() {
            this.$router.push(`/order/ticket/list${this.this_type}`)

        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
        handleEdit(item) {
            this.$set(item, 'status', 1)
        },
        handleSave(item) {
            this.$confirm('是否确认保存信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.status = 0
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            }).catch(() => {});
        },
        handleRemove(file, fileList) {
            this.ticket = fileList
        },
        handSuccess(response, file, fileList) { //上传成功
            let url = 'http://img.quitang.com/' + response.data.img
                // this.ticketArry.push(response.data.img)
            this.ticket.push({ url: url })
        },
        handleErro(item) { //超过限制张数时候
            this.$message.error('最多上传5张')
        },
        beforeAvatarUpload(file) { //图片上传
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isPDF = file.type === 'application/pdf';
            const isGIF = file.type === 'image/gif';
            if (!isJPG && !isPNG && !isPDF && !isGIF) {
                this.$message.error('上传头像图片只能是 jpg, gif, png, jpeg, pdf 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG || isPNG || isPDF || isGIF && isLt2M;
        },
        radioSelect(item) {
            this.ticket = []
                // this.ticketArry = []
            this.productData.ticket = ''
        },
        formatterSex(item) {
            switch (parseInt(item.sex)) {
                case 1:
                    return 'man'
                    break;
                case 2:
                    return 'woman'
                    break;
            }
        },
        // refund() { //退款
        //     this.$confirm('是否允许该条退款?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$$api_order_ticketOrderChange_status({ //获取分类
        //             data: {
        //                 id: this.productData.id,
        //                 status: 5
        //             },
        //             fn: data => {
        //                 this.$message.success('退款成功！');
        //                 this.$router.push('/order/ticket/list1')
        //             },
        //             errFn: (err) => {
        //                 this.$message.error(err.msg);
        //             },
        //         });

        //     }).catch(() => {});
        // },
        bigImg(src){//大图
            this.bigImgBoo=true;
            this.bigImgSrc = src
        },
        //留言通知
        sumbinMsg(){
            this.$$api_order_ticketOrder_msg({
                data: {id:this.productData.id,msg : this.msg.msg},
                fn: data => {
                    this.$message.success('提交成功！');
                    this.$router.push(`/order/ticket/list${this.this_type}`);
                },errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        sumbin(str) {
            // this.$confirm(`${str}?`, '提示', {
            //       confirmButtonText: '确定',
            //       cancelButtonText: '取消',
            //       type: 'warning'
            // }).then(() => {
            let dataBox = {}
            let ticketBox = '';
            if (this.productData.ticket_type == 1) {
                this.ticket.forEach((item) => {
                    ticketBox += item.url + ","
                })
                this.$set(this.productData, 'ticket', ticketBox)
            } else {
                ticketBox = this.productData.ticket
            }
            dataBox = Object.assign({}, dataBox, {
                id: this.productData.id,
                ticket_type: this.productData.ticket_type,
                ticket: ticketBox,
                // passagers: this.passagers,
            })
            if (this.productData.processed == '0'){
                if (this.productData.status == '1' ) {
                    dataBox.status = 2;
                    dataBox.processed = 1
                } else if (this.productData.status == '4' ) {
                    dataBox.processed = 1
                    dataBox.status = 4;

                } else if(this.productData.status == '5'){
                    dataBox.processed = 1
                    dataBox.status = 5;
                }
                // else if (this.this_type == '0') {
                //     dataBox.status = 6;
                // }
            }
            let options = {
                method: 'post',
                url: 'http://admin-api.quitang.com/ticketOrder/edit',
                data: dataBox,
                headers: {
                    'Authorization': this.$store.state.user.userinfo.token,
                    'Content-Type': "application/x-www-form-urlencoded",
                }
            };
            axios(options).then((res) => {
                if (res.data.error_code == 0) {
                    this.loading = false;
                    this.$message.success('修改成功!');
                    this.$router.push(`/order/ticket/list${this.this_type}`)

                } else {
                    this.loading = false;
                    this.$message.error(res.data.msg)
                }
            })
            // }).catch(() => {
            // });
        }
    },
    watch: {
        $route(to, from) {
            this.reset_user();
        }
    },
    components: {
        // loading
    }
}