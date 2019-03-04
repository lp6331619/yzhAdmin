<template>
    <div class="edit">
        <h1 class="backTitle"><router-link to="/supplier/product/list"><i class="iconfont icon-left"></i>供应商产品列表</router-link></h1>
        <el-row>
            <el-form 
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                class="mt20"
                :rules="countryRule"
                ref='countryData'
                :model='countryData'>
                    <el-form-item
                        label="所属供应商">
                        {{countryData.supplier_name}}
                    </el-form-item>
                    <el-form-item
                        label="国家/城市">
                        {{countryData.country}}>{{countryData.city}}
                    </el-form-item>
                    <el-form-item
                        prop="name"
                        label="名称">
                        <el-col :span="14">
                            <el-input v-model="countryData.name" placeholder="请输入名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        prop="type"
                        label="类别">
                        <el-select @change="countryType" v-model="countryData.type" placeholder="请输入货币单位">
                            <el-option
                              v-for="item in categorys"
                              :key="item.id"
                              :label="item.title"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="sub_type"
                        label="分类">
                        <el-select v-model="countryData.sub_type" placeholder="请选择分类">
                            <el-option
                              v-for="(item,index,value) in categorysChild"
                              :key="index"
                              :label="item"
                              :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="ticket_type"
                        label="验证方式">
                        <el-select v-model="countryData.ticket_type" placeholder="请选择验证方式">
                            <el-option
                              v-for="(item,index,value) in ticketArry"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="price"
                        label="价钱">
                        <el-col :span="7">
                            <el-input v-model="countryData.price" placeholder="请输入价钱">
                                <template slot="append">{{countryData.currency}}</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        v-if="countryData.type==2"
                        label="假日价钱">
                        <el-col :span="7">
                            <el-input v-model="countryData.holiday_price" placeholder="请输入假日价钱">
                                <template slot="append">{{countryData.currency}}</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        v-if="countryData.type==6"
                        label="儿童价钱">
                        <el-col :span="7">
                            <el-input v-model="countryData.children_price" placeholder="请输入儿童价钱">
                                <template slot="append">{{countryData.currency}}</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-col :span="7" v-if="countryData.type==3">
                        <el-form-item
                            prop="arrival"
                            label="目的地">
                                <el-input v-model="countryData.arrival" placeholder="请输入目的地"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" v-if="countryData.type==3">
                        <el-form-item
                            prop="departure"
                            label="出发地">
                                <el-input v-model="countryData.departure" placeholder="请输入出发地"></el-input>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <el-form-item
                        v-if="countryData.type==5"
                        prop="logistics_type"
                        label="取货方式">
                        <el-radio-group v-model="countryData.logistics_type">
                            <el-radio :label="1">快递</el-radio>
                            <el-radio :label="2">自取</el-radio>
                          </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        v-if="countryData.type==2"
                        label="节假日选择">
                            <el-col :span="14">
                                <ul class="pickerBoxInput clearfix">
                                    <li class="fl" v-for="(item,index) in timeBox" :key="index">{{item}} <i class="el-icon-close" @click="del(index)"></i></li>
                                    <el-date-picker
                                        class="pickerBox fl"
                                        v-model="countryData.holidays"
                                        @change="getTime"
                                        value-format="yyyy.MM.dd">
                                        <template slot="append">dsdf</template>
                                    </el-date-picker>
                                </ul>
                            </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submi('countryData')">提交</el-button>
                        <el-button @click="$router.push('/supplier/product/list')">返回</el-button>
                    </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    
    export default {
        name: 'list',
        created: function () {
            if(this.$route.query.id){
                this.getList();
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
                    type:[{
                        required: true,
                        message : '不能为空',
                    }],
                    sub_type:[{
                        required: true,
                        message : '不能为空',
                    }],
                    ticket_type:[{
                        required: true,
                        message : '不能为空',
                    }],
                    price:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    arrival:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    departure:[{
                        required: true,
                        message : '不能为空',
                        trigger : 'blur'
                    }],
                    logistics_type:[{
                        required: true,
                        message : '不能为空',
                    }],

                },
                countryData:{},
                categorys:[],//分类
                categorysChild:[],//二级分类
                ticketArry:[{
                    id:1,
                    name:'电子票'
                },{
                    id:2,
                    name:'电子编码'
                },{
                    id:3,
                    name:'二维码'
                }],
                dateBox:'',
                demoEvents: [{
                    date: '2016/11/12', // 必填
                    title: 'Foo' // 必填
                }, {
                    date: '2016/12/15',
                    title: 'Bar',
                    desc: 'description',
                    customClass: 'disabled highlight' // 自定义日历单元格的Class，会加到对应的日历单元格上
                }],
                timeBox:[],
            }
        },
        methods: {
            getList(){
                this.loading=true;
                this.$$api_supplier_goods_detail({
                    data     : {id:this.$route.query.id},
                    fn       : data => {
                        this.countryData = data
                        this.countryData.type = parseInt(this.countryData.type);
                        this.countryData.ticket_type= parseInt(this.countryData.ticket_type)
                        this.countryData.logistics_type= parseInt(this.countryData.logistics_type)

                        if(this.countryData.holidays){
                            let arrHoliday = this.countryData.holidays.split(",")
                            arrHoliday.forEach((item,index)=>{
                                this.timeBox.push(item)
                            })

                        }
                        this.loading=false;
                        this.getCategorys()
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                        this.loading=false;
                    },
                });
            },
            getCategorys(){//分类
                this.$$api_supplier_categorys({
                    data     : {},
                    fn       : data => {
                        this.categorys = data
                        if(this.countryData.type){
                            let obj=[];
                            obj = this.categorys.find((value, index, arr)=>{
                                return value.id == this.countryData.type;
                            })
                            this.categorysChild = obj.sub
                        }
                    },
                    errFn    : (err) => {
                        this.$message.error(err.msg);
                    },
                });
            },
            countryType(item){//获取二级分类
                let obj=[]
                obj = this.categorys.find(function(value, index, arr) {
                    return value.id == item;
                }) 
                this.categorysChild = obj.sub
            },
            del(index){//删除选中
                this.timeBox.splice(index,1)
            },
            getTime:function(time){
                if(time){
                    this.timeBox.push(time)
                }
            },
            submi(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.countryData.holidays=this.timeBox.join(",")
                        this.loading=true;
                        this.$$api_supplier_goods_edit({
                            data     : this[ref],
                            fn       : data => {
                                this.loading=false;
                                this.$message.success('恭喜您操作成功！');
                                this.$router.push('/supplier/product/list')
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
<style>
    .pickerBoxInput{border: 1px solid #ddd;min-height:40px;padding:0 5px 5px;border-radius:3px;}
    .pickerBoxInput li{background: #ddd;display: inline-block;padding:0 10px;line-height: 30px;border-radius:5px;cursor:pointer;margin: 5px 5px 0 0;}
    .pickerBoxInput li:hover{opacity: .6;}
    .pickerBox.el-date-editor{position: relative; width: 80px; height: 35px;border-radius:5px; overflow: hidden;
    }
    .pickerBox.el-date-editor:before{content: '+添加日期';position: absolute;left: 0;top:5px;width: 100%; line-height: 30px;text-align: center;color: #fff;font-size: 12px;background: #409EFF;border-radius:3px;}
    .pickerBox.el-date-editor:hover{opacity: .6;}
    .pickerBox.el-input--prefix .el-input__inner{position: absolute;left: 0;top: 5px;z-index: 2; padding:0 100px; cursor: pointer;border: none;background: #409EFF;height: 30px;opacity:0;}
    .pickerBox .el-input__prefix,.pickerBox .el-input__icon{display: none}
</style>
