export default {
    name: 'list',
    created: function () {
        this.getList()
    },
    data() {
        return {
            loading:false,
            tableData: [],
            pageShow:false,
            selectData:{//搜索条件
                country_id:this.$route.query.country_id ? this.$route.query.country_id : '999',
                type:this.$route.query.type ? parseInt(this.$route.query.type) : 1,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                is_online:this.$route.query.is_online?parseInt(this.$route.query.is_online) : 999
            },
            country:[],
            type_box:[],
            auth_status:[{
                value:999,
                label:'全部'
            },{
                value:0,
                label:'下架'
            },{
                value:1,
                label:'上架'
            }],
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.country_id==999){
                delete this.$route.query.country_id
            }
            if(!this.$route.query.type){
                 this.$route.query.type=1
            }
            if(this.$route.query.is_online==999){
                delete this.$route.query.is_online
            }
            this.$$api_product_lists({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false;
                    this.tableData=data
                    this.tableData.total=parseInt(this.tableData.total)
                    if(this.tableData.total>20){
                        this.pageShow=true
                    }
                    this.$$api_admin_countrys({//获取国家
                        data     : {},
                        fn       : data => {
                            this.country = data
                            this.country.unshift({
                                name:'全部国家',
                                id:'999'
                            })
                            this.$$api_supplier_categorys({//获取分类
                                data     : {},
                                fn       : data => {
                                    this.type_box = data
                                    this.tableData.goods.forEach((item)=>{
                                        if(item.imgs.length>0){
                                            let arry = item.imgs.split(",");
                                            this.$set(item,'img',arry[0])
                                        }
                                        //国家
                                        let obj=[]
                                        obj=this.country.find((value)=>{
                                            return value.id == item.country_id
                                        })
                                        this.$set(item,'country_name',obj.name)
                                        //分类
                                        let obj2=[]

                                        obj2=this.type_box.find((value)=>{
                                            return value.id == item.country_id
                                        })
                                        let type_text = `${obj2.title}>${obj2.sub[item.sub_type]}`
                                        this.$set(item,'type_name',type_text)
                                    })
                                },
                                errFn    : (err) => {
                                    this.$message.error(err.msg);
                                },
                            });
                            this.tableData.goods.forEach((item)=>{
                                if(item.imgs.length>0){
                                    let arry = item.imgs.split(",");
                                    this.$set(item,'img',arry[0])
                                }
                                let obj=[]
                                obj=this.country.find((value)=>{
                                    return value.id == item.country_id
                                })
                                this.$set(item,'country_name',obj.name)
                            })
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                        },
                    });
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
            });
        },
        onSelectData() {//搜索
            this.selectData.page=1;
            this.$router.push({
              path: '/product/travel/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/product/travel/list',
              query: this.selectData
            })
            this.getList()
        },
        formatterStatus(item){
            return item.is_online==0? '下架' : '上架'
        },
        handleEdit(item){//编辑
            this.$router.push(`/product/travel/edit?id=${item.id}`)
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
    watch: {
        // 如果路由有变化，会再次执行该方法
        $route: function(item){
            console.log(item)
            this.selectData.type=item.query.type
            this.selectData = Object.assign({}, this.selectData, {
                type: item.query.type
            })
            this.getList()
        }
    }
}
