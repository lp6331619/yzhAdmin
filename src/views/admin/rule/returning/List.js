export default {
    name: 'list',
    created: function () {
      this.getList()
    },
    data() {
        return {
	        value: '',
            selectData: {
                page:this.$route.query.page ? parseInt(this.$route.query.page) : 1,
                keyword:this.$route.query.keyword
            },
            loading:true,
            pageShow:false,
            formData:{},//修改密码表单
            tableData:[],
        }
    },
    methods: {
        getList(){//获取城市列表
            this.loading=true
            this.$route.query.type=1;
            this.$$api_admin_change_lists({
                data     : this.$route.query,
                fn       : data => {
                    this.loading=false
                    this.tableData=data
                    this.tableData.total=parseInt(this.tableData.total)
                    if(this.tableData.total>20){
                        this.pageShow=true
                    }
                },
                errFn    : (err) => {
                    this.loading=false
                    this.$message.error(err.msg);
                },
            });
        },
        formatterChange_type(item){//格式化类型
          let text = '';
          switch(parseInt(item.change_type)){
            case 1:
            text='不可退'
            break;
            case 2:
            text='随时退'
            break
            case 3:
            text='时间段退'
            break
            case 4:
            text='手续费退'
            break
          }
          return text
        },
        onSelectData() {//搜索
            this.selectData.page=1;
            this.$router.push({
              path: '/admin/rule/returning',
              query: this.selectData
            })
            this.getList()
        },
        handleCurrentChange(item){//分页
            this.selectData.page = item
            this.$router.push({
              path: '/admin/rule/returning',
              query: this.selectData
            })
            this.getList()
        },
        handleDelete(index,item){//删除
            this.$confirm('是否确定删除该规则?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_admin_change_del({
                  data     : {id:item.id},
                  fn       : data => {
                      this.loading=false;
                      this.tableData.change.splice(index,1)
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
        handleEdit(item){//打开编辑宽
          this.$router.push({
            path:'/admin/rule/edit2',
            query:{id:item.id}
          })
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
