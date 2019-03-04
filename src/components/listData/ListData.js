export default {
    name: 'list',
    created: function () {
        let typeNum = this.$route.path.length-1
        this.this_type = this.$route.path.charAt(typeNum) !=0 ? this.$route.path.charAt(typeNum):10;
        this.getList()
    },
    data() {
        return {
            loading:false,
            tableData: [],
            this_type:1,
            pageShow:false,
            selectData:{//搜索条件
                country_id:this.$route.query.country_id? this.$route.query.country_id : '999',
                type:this.$route.query.type ? parseInt(this.$route.query.type) : 1,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                is_online:this.$route.query.is_online?parseInt(this.$route.query.is_online) : 999
            },
            country:this.$store.state.user.remumber.remumber_login_info.countrys,//国家数据
            type_box:this.$store.state.user.remumber.remumber_login_info.categorys,//分类数据
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
            if(this.$route.query.country_id=='999'){
                delete this.$route.query.country_id
            }
            this.$route.query.type=this.this_type
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
                    if(this.country[0].id!=999){
                      this.country.unshift({
                          name:'全部国家',
                          id:'999'
                      })
                    }
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
                            return value.id == item.type
                        })
                        let type_text = `${obj2.title}>${obj2.sub[item.sub_type]}`
                        this.$set(item,'type_name',type_text)
                        //图片
                        if(item.imgs.length>0){
                            let arry = item.imgs.split(",");
                            this.$set(item,'img',arry[0])
                        }
                    })
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
            });
        },
        onSelectData() {//搜索
            this.selectData.page=1;
            this.selectData.type=this.this_type
            this.$router.push({
              path: `/product/travel/list${this.this_type}`,
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.selectData.type=this.this_type
            this.$router.push({
              path: `/product/travel/list${this.this_type}`,
              query: this.selectData
            })
            this.getList()
        },
        handleEdit(item){//编辑
            this.$router.push(`/product/travel/edit?id=${item.id}&type=${this.this_type}`)
        },
        Preview(item){//编辑
            window.open('http://admin.quitang.com/#/iframe?id='+item.id+'');
        },
        addList(){
            this.$router.push(`/product/travel/edit?type=${this.this_type}`)
        },
        del(item){
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$$api_product_goods_del({
                    data     : {id:item.id},
                    fn       : data => {
                        this.getList()
                        this.$message.success('删除成功!');
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                })
            }).catch(() => {
            });
            
        },
        handleBeing(item){//下架
            let text = '';
            let isonline = 1;
            if(item.is_online==1){
                //下架
                text='下架'
                isonline=0
            }else{
                //上架
                text='上架'
                isonline=1
            }
            this.$confirm('是否'+text+'该产品?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$$api_product_change_online_status({//获取分类
                    data     : {id:item.id,is_online:isonline},
                    fn       : data => {
                        this.$message.success(text+'成功');
                        item.is_online= isonline
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });

            }).catch(() => {
            });
        }
    },
}
