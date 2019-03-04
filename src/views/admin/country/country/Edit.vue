<template>
    <div class="edit">
        <el-row :gutter="20">
            <h1 class="backTitle"><router-link to="/admin/country/country"><i class="iconfont icon-left"></i>国家列表</router-link></h1>
            <el-form 
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                class="mt20"
                :rules="countryRule"
                ref='countryData'
                :model='countryData'>
                <el-col :span="7">
                    <el-form-item
                        prop="name"
                        label="国家名称">
                        <el-input v-model="countryData.name" placeholder="请输入国家名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="name2"
                        label="英文名称">
                        <el-input v-model="countryData.name2" placeholder="请输入英文名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="abbr"
                        label="国家缩写">
                        <el-input v-model="countryData.abbr" placeholder="请输入国家缩写"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="currency"
                        label="货币单位">
                        <el-input v-model="countryData.currency" placeholder="请输入货币单位"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="lang"
                        label="语言">
                        <el-input v-model="countryData.lang" placeholder="请输入语言"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="rate"
                        label="汇率">
                        <el-input v-model="countryData.rate" placeholder="请输入汇率"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        prop="profit"
                        label="利润率">
                        <el-input v-model="countryData.profit" placeholder="请输入利润率"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear"></el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-button type="primary" @click="submi('countryData')">提交</el-button>
                        <el-button @click="$router.push('/admin/country/country')">返回</el-button>
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
            if(this.$route.query){
                this.countryData=this.$route.query   
            }
        },
        data() {
            return {
                loading:false,
                countryRule:{
                    name:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    name2:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    abbr:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    lang:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    currency:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    rate:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    profit:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    
                },
                countryData:{
                    profit:0
                },
            }
        },
        methods: {
           submi(ref){
                this.$refs[ref].validate((valid) => {
                this.loading=true;
                if (valid) {
                    this.$$api_admin_country_edit({
                        data     : this[ref],
                        fn       : data => {
                            this.loading=false;
                            this.$message.success('恭喜您操作成功！');
                            this.$router.push('/admin/country/country')
                        },
                        errFn    : (err) => {
                            this.$message.error(err.msg);
                            this.loading=false;
                        },
                    });
                }
            })
           }
        }
    }
</script>
<style scoped lang='less'>
   
</style>
