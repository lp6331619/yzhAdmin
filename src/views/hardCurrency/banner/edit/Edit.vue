<template>
    <div class="list">
        <el-row :gutter="20">
            <h1 class="backTitle"><router-link to="/hardCurrency/banner/list"><i class="iconfont icon-left"></i>首页banner</router-link></h1>
            <el-form 
                class="mt20"
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                :rules="tableRules"
                ref='tableData'
                :model='tableData'>
                <el-form-item label="banner图片" prop="img">
                    <el-col :span="24">
                        <el-upload
                          class="bannerImg"
                          action="http://merchant-api.quitang.com/public/oss_upload"
                          list-type="picture-card"
                          multiple    
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img :src="tableData.img ? tableData.img : img" class="avatar">
                      </el-upload><small>图片尺寸为750*420，格式JPG。</small>
                    </el-col>
                </el-form-item>
                <el-form-item label="展示国家" prop="country_ids">
                    <el-col :span="24">
                        <el-checkbox-group v-model="checkedCountry" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in countryArry" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="展示类型" prop="type">
                    <el-col :span="24">
                        <el-radio-group v-model="tableData.type">
                            <el-radio :label="1">链接</el-radio>
                            <el-radio :label="2">图文</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-col :span="14">
                        <el-input placeholder="请输入活动名称" v-model="tableData.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-col :span="7">
                <el-form-item label="开始时间" prop="start_time">
                        <el-date-picker
                              v-model="tableData.start_time"
                              type="date"
                              placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="7">
                <el-form-item label="结束时间" prop="end_time">
                        <el-date-picker
                              v-model="tableData.end_time"
                              type="date"
                              placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-form-item v-if="tableData.type==1" label="链接地址">
                    <el-col :span="14">
                        <el-input placeholder="请输入链接地址" v-model="tableData.url"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="tableData.type==2" label="链接地址" >
                    <el-col :span="20">
                        <vue-editor v-model="tableData.content"></vue-editor>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="14">
                        <el-button type="primary" @click="submi('tableData')">提交</el-button>
                        <el-button @click="$router.push('/admin/adminBox/platform/')">返回</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  export default {
        created: function () {
            this.getList()
        },
        data() {
            return {
                tableData:{},
                img : require('../../../../assets/images/banner.jpg'),
                tableRules:{
                    name:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    country_ids:[{
                        required: true,
                        message : '不能为空',
                    }],
                    type:[{
                        required: true,
                        message : '不能为空',
                    }],
                    start_time:[{
                        required: true,
                        message : '不能为空',
                    }],
                    end_time  : [{
                        required: true,
                        message : '不能为空！',
                    }],
                    img  : [{
                        required: true,
                        message : '不能为空！',
                    }],
                },
                countryArry:[],
                loading:false,
                checkedCountry:[],
            }
        },
        methods: {
            getList(){
                if(this.$route.query.id){
                    this.$$api_hardCurrency_detail({
                        data     : {id:this.$route.query.id},
                        fn       : data => {
                            this.tableData = data
                            this.checkedCountry = this.tableData.country_ids.split(",")
                            this.tableData.type = parseInt(this.tableData.type)
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                            this.loading=false;
                        },
                        tokenFlag: true
                    });
                }
                this.$$api_admin_countrys({
                    data     : {},
                    fn       : data => {
                        this.countryArry = data
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            handleCheckedCitiesChange(item){//选择国家
                this.tableData.country_ids = item.join(",")
            },
            handleAvatarSuccess(res, file) {//图片上传
              this.tableData.img = 'http://img.quitang.com/' + res.data.img;;
            },
            beforeAvatarUpload(file) {//图片上传
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
            },
            submi(ref){
              this.$refs[ref].validate((valid) => {
                  if (valid) {
                      this.loading=true;
                      this.tableData.id = this.$route.query.id

                      if(!this.tableData.url){
                        delete this.tableData.url
                      }
                      if(!this.tableData.content){
                        delete this.tableData.content
                      }
                      this.$$api_hardCurrency_edit({
                          data     : this.tableData,
                          fn       : data => {
                              this.loading=false;
                              this.$message.success('操作成功！');
                              this.$router.push('/hardCurrency/banner/list')
                          },
                          errFn    : (err) => {
                              this.$message.error(err.msg);
                              this.loading=false;
                          },
                      });
                  }
              })
            }
        },
        components: {
          VueEditor
        },
  }
</script>
<style >
      .bannerImg .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 400px;
        height: 224px;
        line-height: 224px;
        text-align: center;
      }
      .bannerImg .avatar {
        width: 400px;
        height: 224px;
        display: block;
      }
      .bannerImg .el-upload{width: 400px;height: 224px;}
      .bannerImg .el-upload--picture-card{border: none;}
</style>
