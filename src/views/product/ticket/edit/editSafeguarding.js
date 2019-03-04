export default {
    name: 'list',
    created: function () {
        if(this.$route.query.id){
            this.getList()
        }
    },
    data() {
        return {
            loading:false,
            productRule:{//验证
              departure : [{required: true, message : '不能为空！'}],
              arrival : [{required: true,message : '不能为空！',}],
              depar_time : [{required: true,message : '不能为空！',}],
              arrive_time : [{required: true,message : '不能为空！',}],
              days : [{required: true,message : '不能为空！',}],
              train_num : [{required: true,message : '不能为空！',trigger : 'blur'}],
              price : [{required: true,message : '不能为空！',trigger : 'blur'}],
              children_price : [{required: true,message : '不能为空！',trigger : 'blur'}],
              children_age_start : [{required: true,message : '不能为空！',trigger : 'blur'}],
              children_age_end : [{required: true,message : '不能为空！',trigger : 'children_age_end'}],
              rate : [{required: true,message : '不能为空！',trigger : 'children_age_end'}],
            },
            productData: {},
            countrys:this.$store.state.user.remumber.remumber_login_info.countrys,//国家数据
            categorys:this.$store.state.user.remumber.remumber_login_info.categorys,//分类数据
            categorysChild:[],//二级分类
            options:[{//数量
                value:1,
                label:'1'
            },{
                value:2,
                label:'2'
            }],//筛选框数据
        }
    },
    methods: {
        getList(){//获取详细信息
            this.$$api_product_ticketDetail({
                data     : this.$route.query,
                fn       : data => {
                    this.productData = data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.countrys = data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            });
        },
        //规格相关
        handleEdit(item){//编辑
          if(!item.status){
            this.$set(item,'status',1)
          }
        },
        handleOk(item){
          let text = '';
          let status = true
          item.name = item.name.replace(/\s+/g, "");
          item.price = item.price.toString().replace(/\s+/g, "");
          if(item.name.length==0){
            text='规格名称'
            status=false
          }
          if(item.price.length==0){
            text='规格价格'
            status=false
          }
          if(!status){
            this.$message.error(text+'不能为空！')
          }else{
              this.$confirm('是否确定保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$set(item,'status',0)
              }).catch(() => {
              });
          }
        },
        handleDel(index){//删除
          this.$confirm('是否确定删除该条规格?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.productData.spec.splice(index,1)
          }).catch(() => {
          });
        },
        addSpecification(){//添加规格
          this.productData.spec.push({
            name:'',
            children_price:'',
            price:'',
            status:1
          })
        },
        addRuse(){//淡旺季 添加一个规则
            this.productData.holiday_rules.push({end_date:'',rate:'',start_date:''})
        },
        delHoliday(index){
            this.productData.holiday_rules.splice(index,1)
        },
        submit(ref){
          let statusSub = true
          this.$refs[ref].validate((valid) => {
            if (valid) {
              this.productData.spec.forEach((item)=>{
                if(item.name){
                  item.name = item.name.replace(/\s+/g, "");
                }
                if(item.price){
                  item.price = item.price.toString().replace(/\s+/g, "");
                }
                if(item.name.length==0 || item.price.length==0 || !item.name || !item.price){
                  this.$message.error('产品规格未填写完整')
                  statusSub=false
                }
              })
              this.productData.holiday_rules.forEach((item)=>{
                if(item.start_date){
                  item.start_date = item.start_date.toString().replace(/\s+/g, "");
                }
                if(item.end_date){
                  item.end_date = item.end_date.toString().replace(/\s+/g, "");
                }
                if(item.rate){
                  item.rate = item.rate.toString().replace(/\s+/g, "");
                }
                if(item.start_date==0 || item.end_date==0 || item.rate==0 || !item.start_date || !item.end_date || !item.rate){
                  this.$message.error('淡旺季规则未填写完整')
                  statusSub=false
                }
              })
              if(statusSub){
                
              }
            }
          })
        },
    },
}
