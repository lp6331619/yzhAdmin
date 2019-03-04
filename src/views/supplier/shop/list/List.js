export default {
    name: 'list',
    created: function () {
        this.getCountry()
        this.getList()
        if(this.$route.query.city_id&&this.$route.query.country_id){
            this.getCity(this.$route.query.country_id)
        }
    },
    data() {
        return {
            loading:false,
            tableData: [],
            pageShow:false,
            selectData:{//搜索条件
                country_id:this.$route.query.country_id,
                auth_status:this.$route.query.auth_status ? parseInt(this.$route.query.auth_status) : 999,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                city_id:this.$route.query.city_id
            },
            country:[],
            city:[{name_cn:'全部城市',id:999}],
            stateArry:[{
                value:999,
                label:'全部'
            },{
                value:0,
                label:'店铺待完善'
            },{
                value:1,
                label:'审核中'
            },{
                value:-1,
                label:'审核失败'
            },{
                value:2,
                label:'审核成功'
            }],
            auth_status:[{
                value:2,
                label:'审核通过'
            },{
                value:-1,
                label:'驳回'
            }],
            formData:{
                auth_status:2
            },//修改密码表单
            dialogFormVisible:false,//弹框控制
            formRules:{
                auth_status  : [{
                    required: true,
                    message : '不能为空！',
                }],
                remark  : [{
                    required: true,
                    message : '不能为空！',
                    trigger : 'blur'
                }],
            }
        }
    },
    methods: {
        getCountry(){//获取国家
            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.country = data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        getCity(item){//获取城市
            this.$$api_admin_ctys({
                data     : {country_id:item},
                fn       : data => {
                    this.city=data.citys
                    this.city.unshift({name_cn:'全部城市',id:999})
                    this.selectData = Object.assign({}, this.selectData, {
                        city_id: this.$route.query.city_id,
                    })
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        countryChange(item){//获取城市
            this.getCity(item)
            this.selectData.city_id = 999;
        },
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.auth_status==999){
                delete this.selectData.auth_status
            }
            if(this.$route.query.city==999){
                delete this.selectData.city_id
            }
            this.$$api_supplier_shops({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false;
                    this.tableData=data
                    this.tableData.total=parseInt(this.tableData.total)
                    if(this.tableData.total>20){
                        this.pageShow=true
                    }
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
                tokenFlag: true
            });
        },
        onSelectData() {//搜索
            this.selectData.page=1;
            if(this.selectData.auth_status==999){
                delete this.selectData.auth_status
            }
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.$router.push({
              path: '/supplier/shop/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            if(this.selectData.auth_status==999){
                delete this.selectData.auth_status
            }
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.$router.push({
              path: '/supplier/shop/list',
              query: this.selectData
            })
            this.getList()
        },
        formatterStatus(item){
            let text = '';
            switch(parseInt(item.auth_status)){
                case -1:
                text = '审核失败'
                break;
                case 0:
                text = '店铺待完善'
                break;
                case 1:
                text = '审核中'
                break;
                case 2:
                text = '审核成功'
                break;
            }
            return text
        },
        handleEdit(item){//编辑
            this.$router.push(`/supplier/shop/edit?id=${item.id}`)
        },
        handleBeing(item){//审核供应商
            this.formData.id=item.id;
            this.formData.auth_status = 2;
            this.formData.remark='';
            this.dialogFormVisible=true;
        },
        VerificationReset(ref){//重置密码
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.loading=true;
                    this.$$api_supplier_shop_audit({
                        data     : this[ref],
                        fn       : data => {
                            this.loading=false;
                            this.$message.success('审核成功！');
                            this.dialogFormVisible=false;
                            this.getList();
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                            this.loading=false;
                        },
                        tokenFlag: true
                    });
                }
            })
        },
    },
}