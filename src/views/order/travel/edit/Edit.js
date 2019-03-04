import axios from 'axios';
export default {
    name: 'user',
    created: function() {
        this.getData()
    },
    data() {
        return {
            loading: false,
            productData: {},
            select: [{
                name: '男',
                id: '1'
            }, {
                name: '女',
                id: '2'
            }],
            contact: [],
            passagers: [],
            ticket: [],
            // ticketArry: [],
            ticketVal: '',
            ticketPdf: [],
        }
    },
    methods: {
        getData() { //
            this.loading = true;
            //登录的用户更新用户信息
            this.$$api_order_orderId({
                data: {
                    id: this.$route.query.id
                },
                fn: data => {
                    this.productData = data
                        //产品
                    this.$set(this.productData, 'product', JSON.parse(this.productData.connect_goods))

                    this.productData.product.forEach((item) => {
                        if (item.imgs) {
                            let imgArr = item.imgs.split(',')
                            this.$set(item, 'img', imgArr[0])
                        }
                    })
                    this.$set(this.contact, 0, {
                        phone: this.productData.phone,
                        wechat: this.productData.wechat,
                        remark: this.productData.remark,
                    })
                    this.passagers = JSON.parse(this.productData.passagers); //出行人
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
            this.$router.push(`/order/travel/list${this.$route.query.type}`)
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
            this.ticket.push({
                url: url
            })
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
                    return '男'
                    break;
                case 2:
                    return '女'
                    break;
            }
        },
        sumbin() {
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
                passagers: this.passagers,
                status: 2
            })
            if (this.contact[0].wechat != '') {
                dataBox.wechat = this.contact[0].wechat
            }
            if (this.contact[0].phone != '') {
                dataBox.phone = this.contact[0].phone
            }
            if (this.contact[0].remark != '' || this.contact[0].remark != 'null') {
                dataBox.remark = this.contact[0].remark
            }
            let options = {
                method: 'post',
                url: 'http://admin-api.quitang.com/order/edit',
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
                    this.$router.push(`/order/travel/list${this.$route.query.type}`)

                } else {
                    this.loading = false;
                    this.$message.error(res.data.msg)
                }
            })

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