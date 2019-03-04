<template>
    <div class="edit">
        <el-row :gutter="20">
            <h1 class="backTitle"><router-link to="/supplier/shop/list"><i class="iconfont icon-left"></i>供应商列表</router-link></h1>
            <el-form 
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                class="mt20"
                :rules="countryRule"
                ref='countryData'
                :model='countryData'>
                <el-col :span="24">
                    <el-form-item
                        prop="avatar"
                        label="头像">
                        <el-upload
                          class="avatar-uploader"
                          action="http://merchant-api.quitang.com/public/oss_upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img :src="countryData.avatar ? countryData.avatar : img" class="avatar">
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="14">
                    <el-form-item
                        prop="name"
                        label="名称">
                        <el-input v-model="countryData.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="currency_id"
                        label="货币">
                        <el-select v-model="countryData.currency_id" placeholder="请输入货币单位">
                            <el-option
                              v-for="item in country"
                              :key="item.id"
                              :label="item.currency"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="contact"
                        label="负责人">
                        <el-input v-model="countryData.contact" placeholder="请输入负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="tel"
                        label="负责人电话">
                        <el-input v-model="countryData.tel" placeholder="请输入负责人电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="country_id"
                        label="国家">
                        <el-select @change="countryChange" v-model="countryData.country_id" placeholder="所在国家">
                            <el-option
                              v-for="item in country"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="city_id"
                        label="城市">
                        <el-select v-model="countryData.city_id" placeholder="所在城市">
                            <el-option
                              v-for="item in city"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="14">
                    <el-form-item
                        prop="address"
                        label="详细地址">
                        <el-input v-model="countryData.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-button type="primary" @click="submi('countryData')">提交</el-button>
                        <el-button @click="$router.push('/supplier/shop/list')">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'list',
        created: function () {
            this.getCountry()
            if(this.$route.query.id){
                this.getList()
            }
        },
        data() {
            return {
                loading:false,
                img : require('../../../../assets/images/default-head.jpg'),
                countryRule:{
                    name:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    avatar:[{
                        required: true,
                        message : '不能为空',
                    }],
                    country_id:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    city_id:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    currency_id:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    contact:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    address:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    tel:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                },
                countryData:{},
                city:[],
                country:[],
            }
        },
        methods: {
            getList(){
                this.loading=true;
                this.$$api_supplier_shop({
                    data     : {id:this.$route.query.id},
                    fn       : data => {
                        this.countryData = data
                        this.loading=false;
                        this.getCity(this.countryData.country_id)
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                        this.loading=false;
                    },
                });
            },
            getCity(item){
                this.$$api_admin_ctys({
                    data     : {country_id:item},
                    fn       : data => {
                        this.city = data.citys
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            getCountry(){
                this.$$api_admin_countrys({
                    data     : {},
                    fn       : data => {
                        this.country = data
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            countryChange(item){//获取城市
                this.$$api_admin_ctys({
                    data     : {country_id:item},
                    fn       : data => {
                        this.city = data.citys
                        this.countryData.city_id = this.city[0].id
                        console.log(this.countryData.city_id)
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            handleAvatarSuccess(res, file) {//头像上传
                this.countryData.avatar =  'http://img.quitang.com/' + res.data.img;
            },
            beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 2048 / 2048 < 2;
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
                        this.$$api_supplier_edit_shop({
                            data     : this[ref],
                            fn       : data => {
                                this.loading=false;
                                this.$message.success('恭喜您操作成功！');
                                this.$router.push('/supplier/shop/list')
                            },
                            errFn    : (err) => {
                                this.$message.error(err.msg);
                                this.loading=false;
                            },
                        });
                    }
                })
           },
        }
    }
</script>
<style scoped lang='less'>
   .avatar-uploader .el-upload {
       border: 1px dashed #d9d9d9;
       border-radius: 6px;
       cursor: pointer;
       position: relative;
       overflow: hidden;
     }
     .avatar-uploader .el-upload:hover {
       border-color: #409EFF;
     }
     .avatar-uploader-icon {
       font-size: 28px;
       color: #8c939d;
       width: 100px;
       height: 100px;
       line-height: 100px;
       text-align: center;
     }
     .avatar {
       width: 100px;
       height: 100px;
       display: block;
     }
</style>
