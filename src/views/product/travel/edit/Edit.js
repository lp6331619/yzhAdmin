import {
    VueEditor
} from 'vue2-editor'
import axios from 'axios';
export default {
    name: 'list',
    created: function() {
        this.getList()
        this.getProduct({
            type: 1,
            all: 8
        })
    },
    data() {
        return {
            loading: false,
            specSuccess: false,
            productData: {
                connect_goods: [],
                spec: [{
                    name: '',
                    child: [],
                    is_status: false
                }],
                spec_price: {},
                holiday_rules: [],
                passager_type: 2,
                is_passport: 0,
                is_children_price: 0,
                is_vip_price: 0,
                is_holiday: 0,
                is_calendar: 0,
                is_team_price: 0,
                is_photo: 0
            },
            widthStyle: {
                'width': '820px'
            },
            productRule: {
                name: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                imgs: [{
                    required: true,
                    message: '不能为空！'
                }],
                country_id: [{
                    required: true,
                    message: '不能为空！'
                }],
                type: [{
                    required: true,
                    message: '不能为空！'
                }],
                sub_type: [{
                    required: true,
                    message: '不能为空！'
                }],
                connect_goods: [{
                    required: true,
                    message: '不能为空！'
                }],
                is_passport: [{
                    required: true,
                    message: '不能为空！'
                }],
                passager_type: [{
                    required: true,
                    message: '不能为空！'
                }],
                price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                children_price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                children_age_start: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                children_age_end: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                vip_discount: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                spec: [{
                    required: true,
                    message: '不能为空！'
                }],
                is_holiday: [{
                    required: true,
                    message: '不能为空！'
                }],
                refund_rule_id: [{
                    required: true,
                    message: '不能为空！'
                }],
                change_rule_id: [{
                    required: true,
                    message: '不能为空！'
                }],
                is_calendar: [{
                    required: true,
                    message: '不能为空！'
                }],
                book_months: [{
                    required: true,
                    message: '不能为空！'
                }],
                book_days: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                highlight_desc: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                highlight_img: [{
                    required: true,
                    message: '不能为空！'
                }],
                desc: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                detail: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                buy_desc: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                highlight_desc: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                team_price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                is_photo: [{
                    required: true,
                    message: '不能为空！'
                }],
                team_children_price: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            }, //验证
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [], //产品图片
            fileList2: [], //亮点图片
            countrys: this.$store.state.user.remumber.remumber_login_info.countrys, //国家数据
            categorys: this.$store.state.user.remumber.remumber_login_info.categorys, //分类数据
            categorysChild: [], //二级分类

            productList: [], //产品列表数据
            dialogTableVisible: false, //弹框状态
            selectData: {}, //搜索数据
            selectTable: [], //产品选中数据
            refund_rule: [], //退款规则
            change_rule: [], //改签规则
            num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            month: [{
                    name: '1个月',
                    id: '1'
                }, {
                    name: '2个月',
                    id: '2'
                }, {
                    name: '3个月',
                    id: '3'
                },
                {
                    name: '4个月',
                    id: '4'
                }, {
                    name: '5个月',
                    id: '5'
                }, {
                    name: '6个月',
                    id: '6'
                }, {
                    name: '7个月',
                    id: '7'
                }, {
                    name: '8个月',
                    id: '8'
                }, {
                    name: '9个月',
                    id: '9'
                }, {
                    name: '10个月',
                    id: '10'
                }, {
                    name: '11个月',
                    id: '11'
                }, {
                    name: '12个月',
                    id: '12'
                }
            ]
        }
    },
    methods: {
        back() {
            this.$router.push(`/product/travel/list${this.$route.query.type}`)
        },
        getList() { //获取详细信息
            if (this.$route.query.id) {
                this.$$api_product_detail({
                    data: {
                        id: this.$route.query.id
                    },
                    fn: data => {
                        this.productData = data
                        let typeNum = this.productData.imgs.length - 1;
                        if (this.productData.imgs.charAt(typeNum) == ',') {
                            this.productData.imgs = this.productData.imgs.substr(0, this.productData.imgs.length - 1);
                        }
                        this.productData.imgs.split(",").forEach((item, index) => { //图片初始化
                            this.$set(this.fileList, index, {
                                'url': item
                            })
                        });
                        this.productData.type = parseInt(this.productData.type);
                        let obj2 = [];
                        obj2 = this.categorys.find((item) => {
                            return item.id == this.productData.type
                        })
                        if (obj2 != undefined) {
                            this.categorysChild = obj2.sub
                        }
                        this.productData.spec.forEach((item) => {
                            this.$set(item, 'is_status', true)
                            item.child.forEach((itemChild) => {
                                this.$set(itemChild, 'is_status', true);
                            })
                        })
                        this.specSuccess = true
                            // this.$set(this.productData,'specSuccess',false)
                        this.Computation();
                    },
                    errFn: (err) => {
                        this.$message.error(err.msg);
                    },
                });
            }
            this.$$api_admin_change_lists({
                data: {
                    per_page: 1000,
                    type: 1
                },
                fn: data => {
                    this.refund_rule = data.change
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
            this.$$api_admin_change_lists({
                data: {
                    per_page: 1000,
                    type: 2
                },
                fn: data => {
                    this.change_rule = data.change
                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        Computation() {
            if (this.productData.spec[2] == undefined) {
                this.widthStyle.width = '800px'
            } else if (this.productData.spec[1] == undefined) {
                this.widthStyle.width = '600px'
            } else {
                this.widthStyle.width = '1000px'
            }
            for (let item in this.productData.spec_price) {
                this.$set(this.productData.spec_price[item], 'product', JSON.parse(JSON.stringify(this.productData.connect_goods)));
                this.productData.spec_price[item].product.forEach((itemChild) => {
                    let obj = [];
                    obj = this.productData.spec_price[item].goods.find((value) => {
                        return itemChild.id == value.id
                    })
                    if (obj != undefined) {
                        this.$set(itemChild, 'idStatus', true)
                        this.$set(itemChild, 'numBox', obj.num)
                    } else {
                        this.$set(itemChild, 'idStatus', false)
                        this.$set(itemChild, 'numBox', 1)
                    }
                })
            }
        },
        getProduct(obj) { //获取相关信息
            this.$$api_supplier_goods_list({
                data: obj,
                fn: data => {
                    this.productList = data
                    this.productList.total = parseInt(this.productList.total)
                    this.productList.goods.forEach((item) => {
                        let obj = [];
                        obj = this.countrys.find(function(value, index, arr) {
                            return value.id == item.country_id;
                        })
                        this.$set(item, 'countrys_name', obj.currency)
                        let obj2 = [];
                        obj2 = this.categorys.find(function(value, index, arr) {
                            return value.id == item.type;
                        })
                        this.$set(item, 'type_name', obj2.title)
                    })

                },
                errFn: (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        onSelectData() { //搜索
            this.selectData = Object.assign({}, this.selectData, {
                all: 8,
                page: 1
            })
            if (!this.selectData.type) {
                this.selectData = Object.assign({}, this.selectData, {
                    type: 1,
                })
            }
            this.getProduct(this.selectData)
        },
        handleCurrentChange(item) { //分页
            this.selectData = Object.assign({}, this.selectData, {
                page: item,
                all: 8,
            })
            if (!this.selectData.type) {
                this.selectData = Object.assign({}, this.selectData, {
                    type: 1,
                })
            }
            this.getProduct(this.selectData)
        },
        handleSelectionChange(item) { //选中数据
            this.selectTable = item
        },
        selectSub() { //产品选中
            this.productData.connect_goods.push(...this.selectTable)
            if (this.productData.spec_price != '')
                this.addSpceFunction()
            this.dialogTableVisible = false
        },
        //图片上传相关事件
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        handSuccess(response, file, fileList) { //上传成功
            let url = 'http://img.quitang.com/' + response.data.img
            this.fileList.push({
                url: url
            })
            console.log(this.fileList)
        },
        handlePictureCardPreview(file) { //点击打开大图
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleErro(item) { //超过限制张数时候
            this.$message.error('最多上传5张')
        },
        handleAvatarSuccess(res, file) { //亮点图片上传
            this.productData.highlight_img = 'http://img.quitang.com/' + res.data.img
        },
        beforeAvatarUpload(file) { //亮点图片上传
            const isLt2M = file.size / 2048 / 2048 < 10;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isGIF = file.type === 'image/gif';
            if (!isJPG && !isPNG && !isGIF) {
                this.$message.error('上传头像图片只能是 jpg, gif, png, jpeg 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG || isPNG || isGIF && isLt2M;
        },
        selectType(id) {
            let obj = [];
            obj = this.categorys.find((item) => {
                return item.id == id
            })
            this.categorysChild = obj.sub
                // this.productData.sub_type='1'
        },
        //删除来源产品
        handleDelete(index) {
            this.productData.connect_goods.splice(index, 1)
            if (this.productData.spec_price != '') {
                this.addSpceFunction()
            }

        },
        //产品规格
        specSuccessData() { //规格编辑完毕
            let status = true;
            console.log(this.productData.spec.length)
            if (this.productData.spec.length != '0') {
                this.productData.spec.forEach((item) => {
                    if (item.is_status == false) {
                        status = false;
                        return false
                    } else if (item.child.length > 0) {
                        let obj = []
                        obj = item.child.find((value) => {
                            return value.is_status == false
                        })
                        if (obj != undefined) {
                            status = false;
                            return false
                        }
                    }
                })
            }
            if (status) {
                if (this.productData.spec.length != 0) {
                    this.specSuccess = true
                } else {
                    this.specSuccess = false
                }
                this.$message.success('请编辑具体信息！')
            } else {
                this.$message.error('请先完善规格信息！')
            }
            console.log(this.productData.spec)
        },
        specSuccessEdit() {
            this.specSuccess = false
        },
        //删除规格
        specDel(item, index, num) {
            let text = ''
            if (num == 1) {
                text = '删除该规格将一并删除其所有下级规格！是否确认删除？'
            } else {
                text = '是否确定删除该规格?'
            }
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                switch (num) {
                    case 1:
                        this.productData.spec.splice(index, 1);
                        break;
                    case 2:
                        item.child.splice(index, 1);
                        break;
                }
                this.addSpceFunction()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {});
        },
        specEdit(item) {
            item.is_status = false
        },
        //编辑确定
        specOk(item) {
            item.name = item.name.replace(/\s+/g, "")
            if (item.name.length > 0) {
                item.is_status = true
            } else {
                this.$message.error('规格名字不能为空！')
            }
        },
        addSpceFunction() { //计算方法
            let text = '';
            this.productData.spec_price = {};
            this.productData.spec[0].child.forEach((item, index) => {
                text = 's' + index;
                if (this.productData.spec[1] != undefined) {
                    this.productData.spec[1].child.forEach((itemChild, indexChild) => {
                        let textChild = text + indexChild;
                        if (this.productData.spec[2] != undefined) {
                            this.productData.spec[2].child.forEach((itemLast, indexLast) => {
                                let textLast = textChild + indexLast;
                                this.$set(this.productData.spec_price, textLast, {
                                    children_price: 0,
                                    price: 0,
                                    goods: []
                                })
                            })
                        } else {
                            this.$set(this.productData.spec_price, textChild, {
                                children_price: 0,
                                price: 0,
                                goods: []
                            })
                        }
                    })
                } else {
                    this.$set(this.productData.spec_price, text, {
                        children_price: 0,
                        price: 0,
                        goods: []
                    })
                }
            })
            this.Computation()
        },
        //添加一集分类
        addSpceFirst() {
            if (this.productData.spec.length < 3) {
                this.productData.spec.push({
                    name: '',
                    child: [],
                    is_status: false
                })
                this.addSpceFunction()
            }
        },
        specAdd(item, index) { //添加二级分类
            if (this.productData.spec[index].is_status) {
                let obj = [];
                obj = this.productData.spec[index].child.find((value) => {
                    return value.is_status == false
                })
                if (obj == undefined) {
                    item.child.push({
                        name: '',
                        is_status: false
                    })
                    this.addSpceFunction()
                } else {
                    this.$message.error('请先确定未编辑完的规格名称！')
                }
            } else {
                this.$message.error('请先确认上级名称！')
            }
        },
        addRuse() { //淡旺季 添加一个规则
            this.productData.holiday_rules.push({
                end_date: '',
                rate: '',
                start_date: ''
            })
        },
        is_holidayDel(index) {
            this.productData.holiday_rules.splice(index, 1)
        },
        submit(ref, num) {
            this.productData.imgs = '';
            this.fileList.forEach((item) => {
                this.productData.imgs += item.url + ','
            })
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let status = true
                    for (let item in this.productData.spec_price) {
                        this.productData.spec_price[item].goods = []
                        this.productData.spec_price[item].price = this.productData.spec_price[item].price.toString().replace(/\s+/g, "")
                        this.productData.spec_price[item].children_price = this.productData.spec_price[item].children_price.toString().replace(/\s+/g, "")
                        if (this.productData.spec_price[item].price.length == 0 || this.productData.spec_price[item].children_price.length == 0) {
                            status = false
                            this.$message.error('价钱不能为空！')
                            return false
                        }
                        this.productData.spec_price[item].product.forEach((itemChild) => {
                            if (itemChild.idStatus) {
                                this.productData.spec_price[item].goods.push({
                                    num: itemChild.numBox,
                                    id: itemChild.id
                                })
                            }
                        })
                        if (this.productData.spec_price[item].goods.length == 0) {
                            status = false
                            this.$message.error('请选择对应产品！')
                            return false
                        }
                    }
                    if (this.productData.is_holiday == 1) {
                        if (this.productData.holiday_rules.length != 0) {
                            this.productData.holiday_rules.forEach((item) => {
                                if (item.end_date == undefined && item.start_date == undefined || item.rate == undefined) {
                                    status = false
                                    this.$message.error('淡旺季规则未填写完整！')
                                }
                            })
                        } else {
                            this.$message.error('最少有一个淡旺季规则！')
                        }
                    }
                    this.productData.is_team_price = 0 //设置团队票为0
                    if (num == 1) {
                        this.productData.is_online = 1
                    }
                    if (status) {
                        let options = {
                            method: 'post',
                            url: 'http://admin-api.quitang.com/goods/edit',
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
                                if (num != 3) {
                                    this.$router.push(`/product/travel/list${this.productData.type}`)
                                } else {
                                    window.open('http://admin.quitang.com/#/iframe?id=' + this.productData.id + '');
                                }
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
    components: {
        VueEditor
    },
}