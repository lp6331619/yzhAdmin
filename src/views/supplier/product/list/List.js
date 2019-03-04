export default {
    name: 'list',
    created: function () {
        this.getCountry();
        this.getList();
        this.getSid();
        this.getCategorys();
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
                country_id:this.$route.query.country_id ? parseInt(this.$route.query.country_id) : 999,
                sid:this.$route.query.sid ? parseInt(this.$route.query.sid) : 999,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                city_id:this.$route.query.city_id ? parseInt(this.$route.query.city_id) : 999,
                sub_type:this.$route.query.sub_type,
                type:this.$route.query.type ? parseInt(this.$route.query.type) : 999,
            },
            country:[],
            city:[{name:'全部城市',id:999}],
            categorys:[],//分类
            categorysChild:[],//二级分类
            supplier:[]//供应商
        }
    },
    methods: {
        getSid(){//供应商
            this.$$api_supplier_shops({
                data     : {all:'1000'},
                fn       : data => {
                    this.supplier=data.shops
                    this.supplier.unshift({
                        id:999,
                        name:'全部供应商'
                    })
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
                tokenFlag: true
            });
        },
        getCategorys(){//分类
            this.$$api_supplier_categorys({
                data     : {},
                fn       : data => {
                    this.categorys = data
                    this.categorys.unshift({
                        id:999,
                        title:'全部分类'
                    })
                    if(this.$route.query.type){
                        let obj=[];
                        obj = this.categorys.find((value, index, arr)=>{
                            return value.id == this.$route.query.type;
                        })
                        console.log(obj)
                        this.categorysChild = obj.sub
                        if(this.$route.query.sub_type){
                            this.selectData.sub_type = parseInt(this.$route.query.sub_type)
                        }
                    }
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        getCountry(){//获取国家
            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.country = data
                    this.country.forEach((item)=>{
                        item.id= parseInt(item.id)
                    }) 
                    this.country.unshift({
                        id:999,
                        name:'全部国家'
                    })
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
                    this.city.unshift({name:'全部城市',id:999})
                    this.selectData = Object.assign({}, this.selectData, {
                        city_id: this.$route.query.city_id,
                    })
                    this.city.citys.forEach((item)=>{
                        item.id= parseInt(item.id)
                    }) 
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        countryChange(item){//获取城市
            this.getCity(item)
            this.$route.query.city_id=999
        },
        countryType(item){//获取二级分类
            let obj=[]
            obj = this.categorys.find(function(value, index, arr) {
                return value.id == item;
            }) 
            this.categorysChild = obj.sub
        },
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.sid==999){
                delete this.$route.query.sid
            }
            if(this.$route.query.country_id==999){
                delete this.$route.query.country_id
            }
            if(this.$route.query.city_id==999){
                delete this.$route.query.city_id
            }
            if(this.$route.query.type==999){
                delete this.$route.query.type
                delete this.$route.query.sub_type
            }
            this.$$api_supplier_goods_list({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false;
                    this.tableData=data
                    this.tableData.total=parseInt(this.tableData.total)
                    if(this.tableData.total>20){
                        this.pageShow=true
                    }
                    this.tableData.goods.forEach((item)=>{
                        let obj=[];
                        obj = this.categorys.find(function(value, index, arr) {
                            return value.id == item.type;
                        }) 
                        this.$set(item,'type_name',obj.title)
                        this.$set(item,'sub_type_name',obj.sub[item.sub_type])
                    })
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
            this.$router.push({
              path: '/supplier/product/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/supplier/product/list',
              query: this.selectData
            })
            this.getList()
        },
        handleEdit(item){//编辑
            this.$router.push(`/supplier/product/edit?id=${item.id}`)
        },
        handleAudit(id){//下架
            this.$confirm('是否确认下架改产品？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$$api_supplier_goods_audit({
                    data     : {id:id},
                    fn       : data => {
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                    }
                })
            }).catch(() => {
            });
        }
    },
}