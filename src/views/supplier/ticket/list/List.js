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
                type:this.$route.query.type ? parseInt(this.$route.query.type) : 999,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                city_id:this.$route.query.city_id
            },
            country:[],
            city:[{name:'全部地区',id:999}],
            stateArry:[{
                value:999,
                label:'全部'
            },{
                value:1,
                label:'汽车'
            },{
                value:2,
                label:'火车'
            },{
                value:3,
                label:'轮船'
            }],
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
                    this.city.unshift({name:'全部地区',id:999})
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
            if(this.$route.query.type==999){
                delete this.selectData.type
            }
            if(this.$route.query.city==999){
                delete this.selectData.city_id
            }
            this.$$api_supplier_ticket_shops({
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
            if(this.selectData.type==999){
                delete this.selectData.type
            }
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.$router.push({
              path: '/supplier/ticket/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            if(this.selectData.type==999){
                delete this.selectData.type
            }
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.$router.push({
              path: '/supplier/ticket/list',
              query: this.selectData
            })
            this.getList()
        },
        formatterType(item){//格式化类型
            let text = '';
            let itemType = Array.from(item.type);
            itemType.forEach((itemTypeBox)=>{
                switch(parseInt(itemTypeBox)){
                    case 1:
                    text += '汽车,'
                    break;
                    case 2:
                    text += '火车,'
                    break;
                    case 3:
                    text += '轮船,'
                    break;
                }
            })
            return text
        },
        handleDelete(index,item){//删除
            this.$confirm('是否确定删除该供应商?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_supplier_ticket_shop_del({
                  data     : {id:item.id},
                  fn       : data => {
                      this.loading=false;
                      this.tableData.shops.splice(index,1)
                      this.$message.success('删除成功！');
                  },
                  errFn    : (err) => {
                      this.$message.error(err.msg);
                      this.loading=false;
                  },
                  tokenFlag: true
              });
            }).catch(() => {
            });
        },
        handleEdit(item){//编辑
            this.$router.push(`/supplier/ticket/edit?id=${item.id}`)
        },
    },
}