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
                :rules="tableRule"
                ref='tableData'
                :model='tableData'>
                <el-col :span="14">
                    <el-form-item
                        prop="name"
                        label="名称">
                        <el-input v-model="tableData.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="24">
                    <el-form-item
                        prop="type"
                        label="类型">
                        <el-checkbox-group @change="handleCheckedCitiesChange" v-model="checkType">
                            <el-checkbox label="1" >汽车</el-checkbox>
                            <el-checkbox label="2" >火车</el-checkbox>
                            <el-checkbox label="3" >轮船</el-checkbox>
                          </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="contact"
                        label="负责人">
                        <el-input v-model="tableData.contact" placeholder="请输入负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="tel"
                        label="负责人电话">
                        <el-input v-model="tableData.tel" placeholder="请输入负责人电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="country_id"
                        label="国家">
                        <el-select @change="countryChange" v-model="tableData.country_id" placeholder="所在国家">
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
                        <el-select v-model="tableData.city_id" placeholder="所在城市">
                            <el-option
                              v-for="item in city"
                              :key="item.id"
                              :label="item.name_cn"
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
                        <el-input v-model="tableData.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-button type="primary" @click="submi('tableData')">提交</el-button>
                        <el-button @click="$router.push('/supplier/ticket/list')">返回</el-button>
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
                tableRule:{
                    name:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    type:[{
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
                tableData:{},
                city:[],
                country:[],
                checkType:[],
            }
        },
        methods: {
            getList(){
                this.loading=true;
                this.$$api_supplier_ticket_shop({
                    data     : {id:this.$route.query.id},
                    fn       : data => {
                        this.tableData = data
                        this.loading=false;
                        this.checkType = Array.from(this.tableData.type)
                        this.tableData.city_id = parseInt(this.tableData.city_id)
                        this.getCity(this.tableData.country_id)
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
                        this.city.forEach((item)=>{
                            item.id = parseInt(item.id)
                        })
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
                        this.tableData.city_id = this.city[0].id
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            handleCheckedCitiesChange(item){
                this.tableData.type = item.join(",")
            },
            submi(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        // this.tableData.type = this.tableData.type.join(",")
                        this.$$api_supplier_ticket_shop_edit({
                            data     : this[ref],
                            fn       : data => {
                                this.loading=false;
                                this.$message.success('恭喜您操作成功！');
                                this.$router.push('/supplier/ticket/list')
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
