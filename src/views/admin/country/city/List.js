export default {
    name: 'list',
    created: function () {
        this.getCountry()
    },
    data() {
        return {
	        value: '',
            cityArry: [],
            countryArry:[],
            selectData: {
                country_id:this.$route.query.country_id,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword
            },
            loading:true,
            pageShow:false,
            formData:{},//修改密码表单
            dialogFormVisible:false,//弹框控制
            formRules:{
                country_id  : [{
                    required: true,
                    message : '不能为空！',
                    trigger : 'blur'
                }],
                name_cn  : [{
                    required: true,
                    message : '不能为空！',
                    trigger : 'blur'
                }],
                name_en  : [{
                    required: true,
                    message : '不能为空！',
                    trigger : 'blur'
                }],
                rate  : [{
                    required: true,
                    message : '不能为空！',
                    trigger : 'blur'
                }],
            }
        }
    },
    methods: {
        getCountry(){//获取国家列表
            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.countryArry=data
                    this.getList()
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        getList(){//获取城市列表
            this.loading=true
            this.$$api_admin_ctys({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false
                    this.cityArry=data
                    this.cityArry.total=parseInt(this.cityArry.total)
                    if(this.cityArry.total>20){
                        this.pageShow=true
                    }
                    this.cityArry.citys.forEach((item,index)=>{
                        let obj = [];   
                        obj = this.countryArry.find((value) => {
                            return item.country_id==value.id
                        })
                        this.$set(this.cityArry.citys[index],'country',obj.name) 
                        this.$set(this.cityArry.citys[index],'countryCode',obj.abbr) 
                    })
                },
                errFn    : (err) => {
                    this.loading=false
                    this.$message.error(err.msg);
                },
            });
        },
        onSelectData() {//搜索
            this.selectData.page=1;
            this.$router.push({
              path: '/admin/country/city',
              query: this.selectData
            })
            this.getCountry()
        },
        handleDelete(index,item){//删除
            this.$confirm('是否确定删除该城市?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_admin_city_del({
                  data     : {id:item.id},
                  fn       : data => {
                      this.loading=false;
                      this.cityArry.citys.splice(index,1)
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
        handleAdd(){//打开编辑宽
            this.formData = Object.assign({}, this.formData, {
                country_id:'',
                name_cn:'',
                name_en:'',
                is_train:true,
                is_boat:true,
                is_bus:true,
            })
            this.dialogFormVisible=true
        },
        handleEdit(item){//打开编辑宽
            this.formData = Object.assign({}, this.formData, {
                id: item.id,
                country_id:item.country_id,
                name_cn:item.name_cn,
                name_en:item.name_en,
                is_train:item.is_train==0 ? false : true,
                is_boat:item.is_boat==0 ? false : true,
                is_bus:item.is_bus==0 ? false : true,
                // rate:item.tare
            })
            this.dialogFormVisible=true
        },
        CityReset(ref){//编辑创建城市
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    // if(this.formData.id){//修改

                    // }else{

                    // }    
                    if(this.formData.is_train){
                        this.formData.is_train=1
                    }else{
                        this.formData.is_train=0
                    }
                    if(this.formData.is_boat){
                        this.formData.is_boat=1
                    }else{
                        this.formData.is_boat=0
                    }
                    if(this.formData.is_bus){
                        this.formData.is_bus=1
                    }else{
                        this.formData.is_bus=0
                    }
                    this.$$api_admin_city_edit({
                        data     : this[ref],
                        fn       : data => {
                            this.loading=false;
                            this.$message.success('恭喜您操作成功！');
                            this.dialogFormVisible=false;
                            this.getCountry()
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
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/admin/country/city',
              query: this.selectData
            })
            this.getCountry()
        },
    },
    computed: {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        $route: function(item){
        }
    }
}