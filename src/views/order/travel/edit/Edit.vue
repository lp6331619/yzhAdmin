<template>
    <div class="form">
        <el-row >
            <h1 class="backTitle"><a @click="back()"><i class="iconfont icon-left"></i>订单</a></h1>
            <div class="page-container" v-if="$route.query.type==5">
                <div class="warning">
                    <p>退款日期：{{productData.refound_time}}退款费用：<strong class="color">1000.00CNY</strong>退款金额：<strong class="color fl10">{{productData.refound_money}}CNY</strong></p>
                </div>
            </div>
            <div class="page-container" v-if="$route.query.type==4">
                <div class="warning">
                    <p>改签日期：{{productData.change_time}} 改签费用：<strong class="color fl10">{{productData.change_money}}CNY</strong></p>
                </div>
            </div>
            <el-form
                label-position="right"
                label-width="110px"
                class="mt20"
                :model='productData'>
                <el-col :span="7">
                    <el-form-item
                        label="订单号：">
                        {{productData.order_sn}}
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="总价：">
                        {{productData.total_money}} 元
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="支付金额：">
                        {{productData.pay_money}} 元
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="优惠金额：">
                        {{productData.discount_money}} 元
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="支付时间：">
                        {{productData.pay_time}}
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="下单时间：">
                        {{productData.ctime}}
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item
                        label="消费日期：">
                        {{productData.depdate}}
                    </el-form-item>
                </el-col>
            </el-form>
            <fieldset class="layui-field-title clear">
                <legend>所购产品</legend>
            </fieldset>
            <el-table :data="productData.product" border style="width:1000px" align='center' max-height="250" >
                <el-table-column
                    label="产品名称"
                    align="left"
                    width="auto">
                    <template slot-scope="scope">
                        <div class="imgBoxB">
                            <img :src="scope.row.img" alt="" style="width:50px;height:50px;">
                        </div>
                        <p class="f16"><strong>{{scope.row.goods_name}}</strong></p>
                        <p class="f14">{{scope.row.type_name}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="供应商"
                    prop="supplier_name"
                    align="left"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="国家"
                    prop="country_name"
                    align="left"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="单价"
                    prop="price"
                    align="left"
                    width="100">
                </el-table-column>
            </el-table>
            <fieldset class="layui-field-title clear">
                <legend>出行人信息</legend>
            </fieldset>
            <el-table :data="passagers" border style="width: 100%" class="detailTicket" align='center' max-height="250" >
                <el-table-column
                    label="姓"
                    prop="name"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.FamilyName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名"
                    prop="name"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.GivenName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="护照号"
                    align="center"
                    prop="certno"
                    width="200">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.CertNo"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="性别"
                    prop="sex"
                    align="center"
                    :formatter="formatterSex"
                    width="90">
                    <template slot-scope="scope">
                        <el-select :disabled="scope.row.status!=1" v-model="scope.row.Sex" placeholder="请选择">
                            <el-option
                              v-for="item in select"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    label="生日"
                    align="center"
                    prop="britrday"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.BirthDate"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="国籍"
                    align="center"
                    prop="country"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.Nationality"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="护照首页"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <div class="imgBox">
                            <img :src="scope.row.PassportImg" alt="" style="width:50px;">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="签证页"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <div class="imgBox">
                            <img :src="scope.row.VisaImg" alt="" style="width:50px;">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="80">
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          v-if="scope.row.status!=1"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          v-else
                          type="primary"
                          plain
                          @click="handleSave(scope.row)">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <fieldset class="layui-field-title clear">
                <legend>联系人信息</legend>
            </fieldset>
            <el-table :data="contact" border style="width: 100%" class="detailTicket" align='center' max-height="250" >
                <el-table-column
                    label="联系电话"
                    align="left"
                    prop="phone"
                    width="200">
                    <template slot-scope="scope">
                        <el-input :disabled="scope.row.status!=1" v-model="scope.row.phone"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="微信号"
                    align="left"
                    prop="wechat"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input :disabled="scope.row.status!=1" v-model="scope.row.wechat"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="备注"
                    align="left"
                    prop="remark"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input :disabled="scope.row.status!=1" v-model="scope.row.remark"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="left"
                    width="80">
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          v-if="scope.row.status!=1"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          v-else
                          type="primary"
                          plain
                          @click="handleSave(scope.row)">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <fieldset class="layui-field-title clear">
                <legend>出票方式</legend>
            </fieldset>
            <div class="p20">
                <div class="rodios">
                    <el-radio-group v-model="productData.ticket_type" @change="radioSelect">
                        <el-radio label="1">电子票</el-radio>
                        <el-radio label="2">编码</el-radio>
                        <!-- <el-radio :label="3">PDF</el-radio> -->
                      </el-radio-group>
                </div>
                <div class="mt20">
                    电子票验证
                    <el-upload
                        class="productImg productImg2 p20"
                        action="http://admin-api.quitang.com/public/oss_upload"
                        v-if="productData.ticket_type==1"
                        list-type="picture-card"
                        multiple
                        :file-list="ticket"
                        :limit="5"
                        :on-exceed="handleErro"
                        :on-success="handSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-input
                        class="mt20"
                        v-else-if="productData.ticket_type==2"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入编码"
                        v-model="productData.ticket">
                    </el-input>
                </div>
            </div>
            <div class="mt20">
                <el-button
                  type="primary"
                  plain
                  @click="sumbin()">
                  提交
                </el-button>
                 <el-button
                  plain
                  @click="back()">
                  返回
                </el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
    import EditJs from './Edit.js';
    export default EditJs;
</script>
<style scoped>
    .edit-form{
        width:500px;
    }
    .imgBoxB{
        float: left;
        margin-right: 10px;
    }
</style>
