<template>
    <div class="list">
        <el-row :gutter="20">
            <h1 class="backTitle"><router-link to="/admin/adminBox/ticket"><i class="iconfont icon-left"></i>票务管理员</router-link></h1>
            <el-form 
                class="mt20"
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                :rules="adminRules"
                ref='ticketEdit'
                :model='ticketEdit'>
                <el-form-item v-if="!$route.query.id" label="登录账号" prop="username">
                    <el-col :span="14">
                        <el-input v-model="ticketEdit.username"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-col :span="14">
                        <el-input placeholder="请输入真实姓名" v-model="ticketEdit.realname"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="所属供应商" prop="sid">
                    <el-col :span="14">
                        <el-select v-model="ticketEdit.sid" placeholder="请选择供应商">
                            <el-option
                              v-for="item in Grouping"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-col :span="14">
                        <el-input placeholder="请输入登录密码" v-model="ticketEdit.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="确认密码" prop="password_confirm">
                    <el-col :span="14">
                        <el-input placeholder="再次输入密码" v-model="ticketEdit.password_confirm"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="14">
                        <el-button type="primary" @click="submi('ticketEdit')">提交</el-button>
                        <el-button @click="$router.push('/admin/adminBox/ticket')">返回</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
  export default {
        created: function () {
            this.getList()
        },
        data() {
            return {
                ticketEdit:{},
                adminRules:{
                    username:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    },{
                        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        message : '请使用您的邮箱作为登录账号！',
                        trigger : 'blur'
                    }],
                    realname:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    sid:[{
                        required: true,
                        message : '不能为空',
                    }],
                    password  : [{
                        required: true,
                        message : '不能为空！',
                        trigger : 'blur'
                    }
                    // ,{
                    //     pattern : /^[a-zA-Z0-9_-]{6,16}$/,
                    //     message : '密码至少6位,由大小写字母和数字,-,_组成',
                    //     trigger : 'blur'
                    // }
                    ],
                    password_confirm: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.ticketEdit.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        },
                        trigger  : 'blur'
                    }]
                },
                loading:false,
                checkedCountry:[],
                Grouping:[],
            }
        },
        methods: {
            getList(){
                if(this.$route.query.id){
                   this.ticketEdit = this.$route.query
                   this.ticketEdit.username=this.ticketEdit.email
                }
                this.$$api_supplier_ticket_shops({
                    data     : {},
                    fn       : data => {
                        this.Grouping = data.shops
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                        this.loading=false;
                    },
                    tokenFlag: true
                });
            },
            handleCheckedCitiesChange(item){
                this.ticketEdit.country_ids = item.join(",")
            },
            submi(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        if(this.$route.query.id){
                            this.$$api_admin_user_ticket_admin_edit({
                                data     : this.ticketEdit,
                                fn       : data => {
                                    this.loading=false;
                                    this.$message.success('修改成功！');
                                    this.$router.push('/admin/adminBox/ticket')
                                },
                                errFn    : (err) => {
                                    this.$message.error(err.msg);
                                    this.loading=false;
                                },
                            });
                        }else{
                            this.$$api_admin_user_ticket_admin_add({
                                data     : this.ticketEdit,
                                fn       : data => {
                                    this.loading=false;
                                    this.$message.success('添加成功！');
                                    this.$router.push('/admin/adminBox/ticket')
                                },
                                errFn    : (err) => {
                                    this.$message.error(err.msg);
                                    this.loading=false;
                                },
                            });
                        }
                    }
                })
            }
        },
     
  }
</script>
<style scoped>
    
</style>
