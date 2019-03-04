<template>
    <div class="form">
        <el-row >
            <h1 class="backTitle"><a @click="back()"><i class="iconfont icon-left"></i>订单</a></h1>
            <div class="page-container" v-if="productData.status=='5'">
                <div class="warning">
                    <p>退款日期：{{productData.refound_time}}退款金额：<strong class="color fl10">{{productData.refound_money}}CNY</strong></p>
                </div>
            </div>
            <div class="page-container" v-if="productData.status=='4'">
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
                        label="支付时间：">
                        {{productData.pay_time}}
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="7">
                    <el-form-item
                        label="总价：">
                        {{productData.total_money}} 元
                    </el-form-item>
                </el-col> -->
                <el-col class="clear" :span="7">
                    <el-form-item
                        label="车型信息：">
                        {{productData.bus_type}} 
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
                        label="支付货币：">
                        {{productData.currency}}
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="7">
                    <el-form-item
                        label="是否接受换位：">
                        {{productData.change_seat== '0' ? '不接受':'接受' }}
                    </el-form-item>
                </el-col> -->
                
                <!-- <el-col :span="7">
                    <el-form-item
                        label="优惠金额：">
                        {{productData.discount_money}} 元
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
                </el-col> -->
            </el-form>
            <fieldset class="layui-field-title clear">
                <legend>所购产品</legend>
            </fieldset>
            <el-table :data="productData.product" border style="width: 100%" align='center' max-height="250" >
                <el-table-column
                    label="公司"
                    prop="shop_name"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="出发车站"
                    prop="departure"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="到达车站"
                    prop="arrival"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="车次"
                    prop="train_num"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="规格"
                    prop="spec"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="是否接受换位"
                    prop="change_seat"
                    align="center"
                    width="auto">
                </el-table-column>
                
                <el-table-column
                    label="出发时间"
                    prop="depdate"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        {{scope.row.depdate}} {{scope.row.depart_time}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="成人数量"
                    prop="adult_num"
                    align="center"
                    width="auto">
                </el-table-column>
                <el-table-column
                    label="儿童数量"
                    prop="children_num"
                    align="center"
                    width="auto">
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
                        <!-- <el-select :disabled="scope.row.status!=1" v-model="scope.row.Sex" placeholder="请选择">
                            <el-option
                              v-for="item in select"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select> -->
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.sexName"></el-input>
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
                    label="生日"
                    align="center"
                    prop="britrday"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.BirthDate"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="护照有效日"
                    align="center"
                    prop="britrday"
                    width="auto">
                    <template slot-scope="scope">
                        <el-input class="center" :disabled="scope.row.status!=1" v-model="scope.row.CertExpired"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="护照首页"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <div class="imgBox">
                            <img @click="bigImg(scope.row.PassportImg)" :src="scope.row.PassportImg" alt="" style="width:50px;">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="签证页"
                    align="center"
                    width="auto">
                    <template slot-scope="scope">
                        <div class="imgBox">
                            <img @click="bigImg(scope.row.VisaImg)" :src="scope.row.VisaImg" alt="" style="width:50px;">
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column
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
                </el-table-column> -->
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
                <!-- <el-table-column
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
                </el-table-column> -->
            </el-table>
            <fieldset class="layui-field-title clear">
                <legend>出票方式</legend>
            </fieldset>
            <div class="p20">
                <div class="rodios">
                    <el-radio-group v-model="productData.ticket_type" :disabled="productData.status!=1" @change="radioSelect">
                        <el-radio label="1">电子票</el-radio>
                        <el-radio label="2">票号</el-radio>
                        <!-- <el-radio :label="3">PDF</el-radio> -->
                      </el-radio-group>
                </div>
                <div class="mt20">
                    电子票验证
                    <el-upload
                        @click="bigImg()"
                        class="productImg productImg2 p20"
                        :class="{'active':productData.status!=1}"
                        action="http://admin-api.quitang.com/public/oss_upload"
                        v-if="productData.ticket_type==1"
                        list-type="picture-card"
                        multiple
                        :file-list="ticket"
                        :limit="5"
                        :on-exceed="handleErro"
                        :on-success="handSuccess"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-input
                        class="mt20"
                        v-else-if="productData.ticket_type==2"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入票好、出发站地址"
                        v-model="productData.ticket">
                    </el-input>
                </div>
            </div>
            <!-- 大图 -->
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button
                type="primary"
                v-if="productData.status==1"  
                plain
                @click="sumbin('是否确认出票')">
                提交
            </el-button>
           <!--  <el-button
              plain
              @click="back()">
              返回
            </el-button> -->
            <fieldset class="layui-field-title clear" v-if=" productData.status=='4' || productData.status=='5'">
                <legend>退票信息</legend>
            </fieldset>
             <el-form
                label-position="right"
                label-width="140px"
                class="mt20"
                :model='refund'>
                <el-col :span="7" v-if="productData.status=='4' || productData.status=='5'">
                    <el-form-item
                        label="最近有票一班时间：">
                        <el-time-select
                        v-model="refund.next_valid_time"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                        }"
                        placeholder="选择时间">
                        </el-time-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7" v-if="productData.status=='5'">
                    <el-form-item
                        label="退票金额：">
                        <el-input type="text" v-model="refund.refound_money" placeholder="请输入退票金额"></el-input>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="7" v-if=" productData.status=='5'">
                    <el-form-item
                        label="差额退款：">
                        <el-input type="text" v-model="refund.refound_money" placeholder="请输入退票金额"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col class="clear" :span="14" v-if="productData.status=='5'">
                    <el-form-item
                        label="留言：">
                        <el-input type="textarea"  v-model="refund.reason" :rows="2" placeholder="请输入留言"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="clear" :span="14" v-if=" productData.status=='5'">
                    <el-form-item>
                        <el-button
                            type="danger"
                            plain
                            @click="sumbin('是否允许退款')">
                            退款
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-form>
            <fieldset class="layui-field-title clear">
                <legend>留言通知</legend>
            </fieldset>
             <el-form
                label-position="right"
                label-width="140px"
                class="mt20"
                :model='msg'>
                    <el-col class="clear" :span="14">
                        <el-form-item
                            label="留言通知：">
                            <el-input type="textarea" v-model="msg.msg" :rows="2" placeholder="请输入留言通知"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="clear" :span="14">
                        <el-form-item>
                            <el-button
                                type="primary"
                                plain
                                @click="sumbinMsg()">提交
                            </el-button>
                        </el-form-item>
                    </el-col>
            </el-form>
        </el-row>
        <el-dialog
            class="eldialog"
            :visible.sync="bigImgBoo">
            <div class="imgBox">  
                <img :src="bigImgSrc" alt="">
            </div>  
        </el-dialog>
    </div>
</template>
<script>
    import EditJs from './Edit.js';
    export default EditJs;
</script>
<style>
    .edit-form{
        width:500px;
    }
    img{cursor: pointer;}
    .imgBox,.center input{text-align: center;}
    .eldialog .el-dialog{background: none;box-shadow:none;}
    .eldialog .el-dialog .el-dialog__close{width: 44px;height:44px;line-height:44px; border-radius:50%; background:rgba(255,255,255,.8);color:#666; border: none;}
    .footerBox{

    }
</style>
