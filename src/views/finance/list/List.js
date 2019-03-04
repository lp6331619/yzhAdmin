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
                status:this.$route.query.status ? parseInt(this.$route.query.status) : 999,
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword,
            },
            status:[{
                id:999,
                name:'全部状态'
            },{
                id:-1,
                name:'审核失败'
            },{
                id:1,
                name:'审核中'
            },{
                id:2,
                name:'审核通过'
            }],
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.status==999){
                delete this.$route.query.status
            }
            this.$$api_finance_audits({
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
              path: '/finance/supplier/withdrawing',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/finance/supplier/withdrawing',
              query: this.selectData
            })
            this.getList()
        },
        formatterStatus(item){//格式化类型
            let text = '';
            switch(parseInt(item.status)){
                case -1:
                text = '审核失败'
                break;
                case 1:
                text = '审核中'
                break;
                case 2:
                text = '审核通过'
                break;
                
            }
            return text
        },
        handleStatus(item){//通过
            this.$confirm('是否确定通过？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_finance_withdraw_change_status({
                  data     : {id:item.id,status:2},
                  fn       : data => {
                      this.loading=false;
                      this.$message.success('审核成功！');
                      this.getList()
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
        handleDenial(item){//拒绝
            this.$prompt('请输入拒绝理由', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              this.$$api_finance_withdraw_change_status({
                  data     : {id:item.id,status:-1,remark:value},
                  fn       : data => {
                      this.loading=false;
                      this.$message.success('拒绝成功！');
                      this.getList()
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
            this.$router.push(`/finance/supplier/withdrawingEdit?id=${item.id}`)
        },
    },
}