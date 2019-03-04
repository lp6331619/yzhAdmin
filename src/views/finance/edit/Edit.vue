<template>
    <div class="edit">
        <h1 class="backTitle"><router-link to="/finance/supplier/withdrawing"><i class="iconfont icon-left"></i>提现列表</router-link></h1>
        <el-row :gutter="20">
          <el-form 
              label-position="right" 
              label-width="110px"
              v-loading="loading"
              element-loading-text="正在提交!"
              class="mt20">
                <el-col :span="7">
                  <el-form-item
                      label="供应商名称">
                          {{tableData.supplier_name}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="提现人">
                          {{tableData.withdraw_name}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-col :span="7">
                  <el-form-item
                      label="提现金额" class="red">
                          {{tableData.withdraw_money}} {{tableData.currencyName}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="剩余金额" class="red">
                          {{tableData.remain_money}} {{tableData.currencyName}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-col :span="7">
                  <el-form-item
                      label="提现账户">
                          {{tableData.bank_owner}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="提现账户号">
                          {{tableData.bank_account}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="提现银行">
                          {{tableData.bank_name}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-col :span="7">
                  <el-form-item
                      label="申请时间">
                          {{tableData.ctime}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="审核时间">
                          {{tableData.withdraw_time}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-col :span="7">
                  <el-form-item
                      label="审核人">
                          {{tableData.withdraw_name}}
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item
                      label="审核状态">
                          {{tableData.status}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-col :span="14">
                  <el-form-item
                      label="备注信息">
                          {{tableData.remark}}
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-form-item>
                    <el-button @click="$router.push('/finance/supplier/withdrawing')">返回</el-button>
                </el-form-item>
          </el-form>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'list',
        created: function () {
            this.getList()
        },
        data() {
            return {
                loading:false,
                tableData:{},
                country:[],
            }
        },
        methods: {
            getList(){
                this.loading=true;
                this.$$api_finance_detail({
                    data     : {id:this.$route.query.id},
                    fn       : data => {
                        this.tableData = data
                        this.loading=false;
                        this.$$api_admin_countrys({
                            data     : {},
                            fn       : data => {
                                this.country = data
                                let obj = [];   
                                obj = this.country.find((value, index, arr) => {
                                    console.log(value.id , this.tableData.currency)
                                    return value.id == this.tableData.currency;
                                }) 
                                this.$set(this.tableData,'currencyName',obj.currency)
                            },
                            errFn    : (err) => {
                                this.$message.error(err.msg);
                            },
                        });
                        
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                        this.loading=false;
                    },
                });
                
            },
        }
    }
</script>
<style scoped lang="less">
    .appraisalImg img{
      width:100px;
      height:100px;
      margin:10px 10px 0 0;
    }
</style>
