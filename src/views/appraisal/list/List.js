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
            },
            satisfaction:[{
                id:999,
                name:'全部满意度'
            },{
                id:1,
                name:'1分'
            },{
                id:2,
                name:'2分'
            },{
                id:3,
                name:'3分'
            },{
                id:4,
                name:'4分'
            },{
                id:5,
                name:'5分'
            }],
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            if(this.$route.query.score==999){
                delete this.$route.query.score
            }
            this.$$api_appraisal_lists({
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
              path: '/appraisal/shop/list',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/appraisal/shop/list',
              query: this.selectData
            })
            this.getList()
        },
        formatterScore(item){//格式化类型
            let text = '';
            switch(parseInt(item.score)){
                case 1:
                text = '1分'
                break;
                case 2:
                text = '2分'
                break;
                case 3:
                text = '3分'
                break;
                case 4:
                text = '4分'
                break;
                case 5:
                text = '5分'
                break;
            }
            return text
        },
        handleDelete(index,item){//删除
            this.$confirm('是否确定删除该评论', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_appraisal_del({
                  data     : {id:item.id},
                  fn       : data => {
                      this.loading=false;
                      this.tableData.comments.splice(index,1)
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
            this.$router.push(`/appraisal/shop/edit?id=${item.id}`)
        },
    },
}