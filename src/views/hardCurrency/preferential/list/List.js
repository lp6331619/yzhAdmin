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
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
                status:this.$route.query.status ? parseInt(this.$route.query.status) : 0,
            },
            status:[{
                id:0,
                name:'全部'
            },{
                id:1,
                name:'未开始'
            },{
                id:2,
                name:'进行中'
            },{
                id:3,
                name:'已结束'
            }],
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            this.$$api_hardCurrency_couponLists({
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
            this.$router.push({
              path: '/hardCurrency/preferential/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/hardCurrency/preferential/list',
              query: this.selectData
            })
            this.getList()
        },
        handleDelete(index,item){//删除
            this.$confirm('是否确定删除该优惠卷', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_hardCurrency_couponDel({
                  data     : {id:item.id},
                  fn       : data => {
                      this.loading=false;
                      this.tableData.coupons.splice(index,1)
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
            this.$router.push(`/hardCurrency/preferential/edit?id=${item.id}`)
        },
    },
}