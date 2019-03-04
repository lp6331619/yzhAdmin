<template>
    <div class="edit">
        <h1 class="backTitle"><router-link to="/appraisal/shop/list"><i class="iconfont icon-left"></i>评价列表</router-link></h1>
        <el-form 
            label-position="right" 
            label-width="110px"
            v-loading="loading"
            element-loading-text="正在提交!"
            class="mt20">
                <el-form-item
                    label="名称">
                        {{tableData.nickname}}
                </el-form-item>
                <el-form-item
                    label="满意度">
                    {{tableData.score}}分
                </el-form-item>
                <el-form-item
                    label="评价时间">
                    {{tableData.ctime}}
                </el-form-item>
                <el-form-item
                    label="所属产品">
                    {{tableData.name}}
                </el-form-item>
                <el-form-item
                    label="评价内容">
                    {{tableData.content}}
                </el-form-item>
                <el-form-item
                    class="appraisalImg"
                    label="评价图片">

                    <img :src="'http://img.quitang.com/'+item" v-for="(item,index) in tableData.imgBox" :key="index" alt="">
                    <!--  -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submi('tableData')">删除</el-button>
                    <el-button @click="$router.push('/appraisal/shop/list')">返回</el-button>
                </el-form-item>
        </el-form>
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
            }
        },
        methods: {
            getList(){
                this.loading=true;
                this.$$api_appraisal_detail({
                    data     : {id:this.$route.query.id},
                    fn       : data => {
                        this.tableData = data
                        this.loading=false;
                        this.$set(this.tableData,'imgBox',this.tableData.imgs.split(","))
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                        this.loading=false;
                    },
                });
            },
            submi(){
                this.$confirm('是否确定删除该评论', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.loading=true;
                  this.$$api_appraisal_del({
                      data     : {id:this.$route.query.id},
                      fn       : data => {
                          this.loading=false;
                          this.$message.success('删除成功！');
                          this.$router.push('/appraisal/shop/list')
                      },
                      errFn    : (err) => {
                          this.$message.error(err.msg);
                          this.loading=false;
                      }
                  });
                }).catch(() => {
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
