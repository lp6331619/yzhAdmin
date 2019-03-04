export default {
    name: 'list',
    created: function () {
        this.getList()
        if(this.$route.query.city_id && this.$route.query.country_id){
            this.getCity(this.$route.query.country_id)
        }
    },
    data() {
        return {
            loading:false,
            tableData: [],
            pageShow:false,
            selectData:{//搜索条件
                role:this.$route.query.id,
                country_id:this.$route.query.country_id,
                status:this.$route.query.status ? parseInt(this.$route.query.status) : 1,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                city_id:this.$route.query.city_id
            },
            supplier:[],
            country:[],
            city:[{name:'全部地区',id:999}],
            role:[],
            stateArry:[{
                value:0,
                label:'禁用'
            },{
                value:1,
                label:'正常'
            }],
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.city_id==999){
                delete this.selectData.city_id
            }
            this.$$api_admin_user_supplier_admins({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false;
                    this.tableData=data   
                    this.$$api_admin_auth_groups({
                        data     : {},
                        fn       : data => {
                            this.role=data
                            this.tableData.admins.forEach((item)=>{
                                this.role.forEach((itemRole)=>{
                                    if(itemRole.id == item.role){
                                        this.$set(item,'role_name',itemRole.title)
                                        return false
                                    }
                                })
                            })
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                        },
                    });
                    this.tableData.total=parseInt(this.tableData.total)
                    if(this.tableData.total>20){
                        this.pageShow=true
                    }
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
            });

            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.country=data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });

            this.$$api_supplier_ticket_shops({
                data     : {},
                fn       : data => {
                    this.supplier=data.shops
                    this.tableData.admins.forEach((item,index)=>{
                        this.supplier.forEach((itemSid)=>{
                            if(itemSid.id == item.sid){
                                this.$set(item,'sidName',itemSid.name)
                                return false
                            }
                        })
                    })
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        getCity(item){//获取国家
            this.$$api_admin_ctys({
                data     : {country_id:item},
                fn       : data => {
                    this.city=data.citys
                    this.city.unshift({name:'全部地区',id:999})
                    this.selectData = Object.assign({}, this.selectData, {
                        city: this.$route.query.city_id,
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
        onSelectData() {//搜索
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.$router.push({
              path: '/admin/adminBox/supplier',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            if(this.selectData.city_id==999){
                delete this.selectData.city_id
            }
            this.selectData.page = item
            this.$router.push({
              path: '/admin/adminBox/supplier/',
              query: this.selectData
            })
            this.getList()
        },
        formatterStatus(item){
            return item.status == 1 ? '正常' : '禁用'
        },
    },
}