export default {
    name: 'list',
    created: function () {
        this.getList()
    },
    data() {
        return {
            tableData: [],
            loading:false,
            
        }
    },
    methods: {
        getList(){
            this.$$api_admin_countrys({
                data     : {},
                fn       : data => {
                    this.tableData=data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
                tokenFlag: true
            });
        },
        formatterStatus(item){
            return item.status == 1? '正常' : '禁用';
        },
        handleEdit(item){
            this.$router.push({
              path: '/admin/country/countryEdit',
              query: item
            })
        },
        handleBeing(item,index){//禁用
            let text = '';
            let statusBox = 0;
            if(item.status==1){
                text="禁用"
                statusBox=0
            }else{
                text="启用"
                statusBox=1
            }
            this.$confirm(`是否确定${text}该国家?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading=true;
              this.$$api_admin_country_change_status({
                  data     : {id:item.id,status:statusBox},
                  fn       : data => {
                      this.loading=false;
                      this.tableData[index].status= statusBox;
                      this.$message.success(`${text}成功！`);
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
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        $route: function(item){
            console.log(item.query.id)
        }
    }
}