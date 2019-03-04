import axios from 'axios';
export default {
        created: function () {
          if(this.$route.query.id){
            this.getList()
          }
        },
        data() {
            return {
                tableData:{
                  user_type:1,
                  expire_type:1,
                  use_type:1,
                  use_goods:[],
                  promotion_goods:[]
                },
                img : '',
                tableRules:{
                   name   : [{
                       required: true,
                       message : '不能为空！',
                       trigger : 'blur'
                   }],
                   user_type   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   total_num   : [{
                       required: true,
                       message : '不能为空！',
                       trigger : 'blur'
                   }],
                   expire_type   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   get_start_time   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   get_end_time   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   use_condition   : [{
                       required: true,
                       message : '不能为空！',
                       trigger : 'blur'
                   }],
                   use_type   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   desc   : [{
                       required: true,
                       message : '不能为空！',
                       trigger : 'blur'
                   }],
                   promotion_goods   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                   use_goods   : [{
                       required: true,
                       message : '不能为空！',
                   }],
                },
                loading:false,
                checkedCountry:[],
                dialogTableVisible:false,//弹框状态
                productData : [],//产品列表
                selectData:{},//搜索数据
                countrys:this.$store.state.user.remumber.remumber_login_info.countrys,//国家数据
                categorys:this.$store.state.user.remumber.remumber_login_info.categorys,//分类数据
                selectTable:[], //产品选中数据
                selectType:1 //1是上面的2是下面的
            }
        },
        methods: {
            getProduct(obj){
              this.$$api_product_lists({
                  data     : obj,
                  fn       : data => {
                      this.productData = data
                      this.productData.total = parseInt(this.productData.total)
                        this.productData.goods.forEach((item)=>{
                          let obj=[]
                          obj = this.categorys.find((itemType)=>{
                            return item.type == itemType.id
                          })
                          let text= obj.title+'>'+ obj.sub[item.sub_type]

                          this.$set(item,'type_name',text) 
                          let obj2 =[];
                          obj2 = this.countrys.find(function(value, index, arr) {
                              return value.id == item.country_id;
                          })
                          this.$set(item,'countrys_name',obj2.currency)
                        })
                  },
                  errFn    : (err) => {
                      this.$message.error(err.msg);
                  },
              });
            },
            getList(){
                if(this.$route.query.id){
                    this.$$api_hardCurrency_couponDetail({
                        data     : {id:this.$route.query.id},
                        fn       : data => {
                            this.tableData = data
                            if(this.tableData.country_ids){
                              this.checkedCountry = this.tableData.country_ids.split(",")
                            }
                            this.tableData.type = parseInt(this.tableData.type)
                            this.tableData.expire_type = parseInt(this.tableData.expire_type)
                            this.tableData.use_type = parseInt(this.tableData.use_type)
                            this.tableData.user_type = parseInt(this.tableData.user_type)
                            if(this.tableData.promotion_goods.length>0){
                              this.tableData.promotion_goods.forEach((item)=>{
                                let obj=[]
                                obj = this.categorys.find((itemType)=>{
                                  return item.type == itemType.id
                                })
                                let text= obj.title+'>'+ obj.sub[item.sub_type]
                                this.$set(item,'type_name',text) 
                              })
                            }
                            if(this.tableData.use_goods.length>0){
                              this.tableData.use_goods.forEach((item)=>{
                                let obj=[]
                                obj = this.categorys.find((itemType)=>{
                                  return item.type == itemType.id
                                })
                                let text= obj.title+'>'+ obj.sub[item.sub_type]
                                this.$set(item,'type_name',text) 
                              })
                            }
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                        },
                    });
                }
            },
            onSelectData(){//搜索
              this.selectData = Object.assign({}, this.selectData, {
                  all:8,
                  page:1
              })
              if(!this.selectData.type){
                this.selectData = Object.assign({}, this.selectData, {
                    type:1,
                })
              }
              this.getProduct(this.selectData)
            },
            handleCurrentChange(item){//分页
              this.selectData = Object.assign({}, this.selectData, {
                    page:item,
                    all:8,
              })
              if(!this.selectData.type){
                this.selectData = Object.assign({}, this.selectData, {
                    type:1,
                })
              }
              this.getProduct(this.selectData)
            },
            handleSelectionChange(item){//选中数据
              this.selectTable = item
            },
            selectSub(){//产品选中
              if(this.selectType==1){
                this.tableData.promotion_goods.push(...this.selectTable)
              }else{
                this.tableData.use_goods.push(...this.selectTable)
              }
              this.dialogTableVisible=false
            },
            openPop(num){
              this.selectType=num
              this.getProduct({type:1,all:8})
              this.dialogTableVisible=true
            },
            handleDelete(index){//删除
              this.tableData.promotion_goods.splice(index,1)
            },
            handleDelete2(index){//删除
              this.tableData.use_goods.splice(index,1)
            },
            submi(ref){
              this.$refs[ref].validate((valid) => {
                  if (valid) {
                    this.loading=true;
                    let options={
                     method:'post',
                     url:'http://admin-api.quitang.com/coupon/edit',
                     data:this.tableData,
                     headers:{
                       'Authorization':this.$store.state.user.userinfo.token,
                       'Content-Type':"application/x-www-form-urlencoded",
                     }
                    };
                    axios(options).then((res) => {
                      if(res.data.error_code==0){
                        this.loading=false;
                        this.$message.success('恭喜您操作成功')
                        this.$router.push('/hardCurrency/preferential/list')
                      }else{
                        this.loading=false;
                        this.$message.error(res.data.msg)
                      }
                    })
                  }
              })
            }
        },
        components: {
        },
  }