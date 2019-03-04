<template>
    <div class="list">
<el-row >
    <h1 class="backTitle"><a @click="back()"><i class="iconfont icon-left"></i>旅行产品</a></h1>
    <el-form
        label-position="right"
        label-width="110px"
        v-loading="loading"
        element-loading-text="正在提交!"
        class="mt20"
        :rules="productRule"
        ref='productData'
        :model='productData'>
        <el-form-item
            prop="name"
            label="产品名称">
            <el-col :span="6">
                <el-input placeholder="请输入产品名称" v-model='productData.name'></el-input>
            </el-col>
        </el-form-item>
        <el-form-item
            prop="imgs"
            label="产品图">
            <el-upload
                class="productImg"
                action="http://merchant-api.quitang.com/public/oss_upload"
                list-type="picture-card"
                multiple
                :file-list="fileList"
                :limit="5"
                :on-exceed="handleErro"
                :on-success="handSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload><small>图片尺寸为750*560，格式JPG。</small>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-col :span="6">
            <el-form-item
                prop="country_id"
                label="所属国家">
                <el-select v-model="productData.country_id" placeholder="选择国家">
                    <el-option
                      v-for="item in countrys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item
                prop="type"
                label="产品类别">
                <el-select v-model="productData.type" placeholder="选择类别" @change="selectType">
                    <el-option
                      v-for="item in categorys"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item
                prop="sub_type"
                label="二级类别">
                <el-select v-model="productData.sub_type" placeholder="选择二级类别">
                    <el-option
                      v-for="(item,index) in categorysChild"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <div class="clear"></div>
        <el-col :span="6">
            <el-form-item
                label="产品所在经度">
                <el-input placeholder="请输入经度" v-model='productData.lng'></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item
                label="产品所在纬度">
                <el-input placeholder="请输入纬度" v-model='productData.lat'></el-input>
            </el-form-item>
        </el-col>
        <div class="clear"></div>
        <el-form-item
            prop="connect_goods"
            label="产品来源">
            <el-table :data="productData.connect_goods" border style="width: 800px" align='center' max-height="250">
                <el-table-column
                    label="产品"
                    align="left"
                    width="auto">
                    <template slot-scope="scope">
                        <h3>{{scope.row.goods_name}}</h3>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    align="center"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="产品编码"
                    align="center"
                    width="130">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          plain
                          icon="el-icon-delete"
                          @click="handleDelete(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button size="mini" @click="dialogTableVisible=true">选择供应商产品</el-button>
        </el-form-item>
        <fieldset class="layui-field-title">
          <legend>售卖/规格</legend>
        </fieldset>
        <el-col :span="3">
            <el-form-item
                prop="is_passport"
                label='护照'>
                    <el-switch
                        v-model="productData.is_passport"
                        active-color="#13ce66"
                        inactive-color="#d2d2d2"
                        active-value="1"
                        inactive-value="0">
                    </el-switch>
            </el-form-item>
        </el-col>
        <el-col :span="6" v-if="productData.is_passport==1">
             <el-form-item prop="passager_type" >
                <el-radio-group v-model="productData.passager_type" >
                    <el-radio label="1">按人</el-radio>
                    <el-radio label="2">按数量</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item
                prop="is_photo"
                label="个人近照">
                <el-radio-group v-model="productData.is_photo">
                    <el-radio label="0">不需要</el-radio>
                    <el-radio label="1">需要</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <div class="clear"></div>
        <el-form-item
            prop="price"
            label='售卖价格'>
            <el-col :span="6">
                <el-input type="number" placeholder="请输入价格" v-model="productData.price">
                   <template slot="append">元</template>
                </el-input>
            </el-col>
            <el-col :span="12" style="margin-left:30px">
                <span class="fl mr20"  v-if="productData.is_passport==1 && productData.passager_type==1">
                    <el-checkbox v-model="productData.is_children_price" true-label="1" false-label="0">儿童价</el-checkbox>
                </span>
                <!-- <span class="fl mr20" >
                    <el-checkbox v-model="productData.is_vip_price" true-label="1" false-label="0">会员价</el-checkbox>
                </span> -->
                <!-- <span class="fl mr20" v-if="productData.is_passport==1">
                    <el-checkbox v-model="productData.is_team_price" true-label="1" false-label="0">团队价</el-checkbox>
                </span> -->
            </el-col>
        </el-form-item>
        <el-col :span="6">
            <el-form-item
            prop="children_price"
            v-if="productData.is_passport==1 && productData.passager_type==1 && productData.is_children_price==1"
            label='儿童价格'>
                <el-input type="number" placeholder="请输入价格" v-model="productData.children_price">
                   <template slot="append">元</template>
                </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="16" style="margin-left:20px">
             <el-form-item
                prop="children_age_start"
                label-width="50px"
                class="fl"
                v-if="productData.is_passport==1 && productData.passager_type==1 && productData.is_children_price==1"
                label='小于'>
                <el-input type="number" style="width:100px;" placeholder="如：2" v-model="productData.children_age_start">
                </el-input>
            </el-form-item>
            <el-form-item
                label-width="50px"
                prop="children_age_end"
                class="fl"
                v-if="productData.is_passport==1 && productData.passager_type==1 && productData.is_children_price==1"
                label='大于'>
                    <el-input type="number" style="width:100px;" placeholder="如：10" v-model="productData.children_age_end">
                    </el-input>
                    周岁为儿童
            </el-form-item>
        </el-col>
        <div class="clear"></div>
        <!-- <el-form-item
            prop="vip_discount"
            v-if=" productData.is_vip_price==1"
            label='会员价格'>
             <el-col :span="6">
                <el-input type="number" placeholder="请输入价格" v-model="productData.vip_discount">
                   <template slot="append">元</template>
                </el-input>
            </el-col>
        </el-form-item> -->
        <!-- <el-col :span="6">
            <el-form-item
                prop="team_price"
                v-if="productData.is_passport==1 && productData.is_team_price==1"
                label='团队价格'>
                <el-input type="number" placeholder="请输入团队价格" v-model="productData.team_price">
                   <template slot="append">元</template>
                </el-input>
            </el-form-item>
        </el-col> -->
        <!-- <el-col :span="6">
            <el-form-item
                prop="team_children_price"
                v-if="productData.is_passport==1 && productData.is_team_price==1"
                label='团队儿童价格'>
                <el-input type="number" placeholder="请输入团队儿童价格" v-model="productData.team_children_price">
                   <template slot="append">元</template>
                </el-input>
            </el-form-item>
        </el-col> -->
        <el-form-item
            class="clear"
            label='产品规格'>
            <div class="sku-group" :class="{'active':specSuccess}">
                <div class="sku-sub-group item" v-for="(item,index) in productData.spec" :key="index">
                    <h3 class="sku-group-title">
                        <el-button type="danger" size="mini" @click="specDel(item,index,1)">删除</el-button>
                        <div class="itemBox ">
                            <el-input size="mini" :disabled="item.is_status" type="text" class="inline" placeholder="请输入规格" v-model="item.name">
                                <template slot="append" v-if="!item.is_status">
                                    <el-button size="mini" @click="specOk(item)">确定</el-button>
                                </template>
                            </el-input>
                            <el-button v-if="item.is_status" size="mini" @click="specEdit(item)" class="itemBtn" icon="el-icon-edit"></el-button>
                        </div>
                       <!--  <span v-if="index!=0" class="remove-group" @click="specDel(item,index,1)">×</span> -->
                    </h3>
                    <div class="sku-group-cont">
                    <div class="sku-atom-list">
                        <ul>
                            <li v-for="(itemChild,indexChild) in item.child">
                                <div class="itemBox">
                                     <el-input size="mini" :disabled="itemChild.is_status" type="text" class="inline" placeholder="请输入规格" v-model="itemChild.name">
                                        <template slot="append" v-if="!itemChild.is_status">
                                            <el-button size="mini" @click="specOk(itemChild)">确定</el-button>
                                        </template>
                                    </el-input>
                                    <el-button v-if="itemChild.is_status" size="mini" @click="specEdit(itemChild)" class="itemBtn" icon="el-icon-edit"></el-button>
                                    <el-button v-if="itemChild.is_status" type="danger" size="mini" class="itemBtn right" icon="el-icon-delete" @click="specDel(item,indexChild,2)"></el-button>
                                </div>
                            </li>
                            <li><el-button size="mini" @click="specAdd(item,index)" icon="el-icon-plus" v-if="!specSuccess">添加</el-button></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="sku-sub-group">
                    <h3 class="sku-group-title">
                    <div class="select-class">
                        <el-button size="mini" @click="addSpceFirst()" v-if="!specSuccess && productData.spec.length<3">添加规格项目</el-button>
                        <el-button type="primary" size="mini" @click="specSuccessData()" v-if="!specSuccess">确定规格信息</el-button>
                        <el-button type="primary" size="mini" @click="specSuccessEdit()" v-if="specSuccess">编辑规格信息</el-button>
                        <small style="color:#ccc">重新编辑规格下表数据将被清空！</small>
                    </div>
                    </h3>
                </div>
            </div>
            <table cellspacing="0" cellpadding="0" border="0" class="mt20 el-table__header borderTable" v-if="specSuccess && productData.spec.length>0" :style="widthStyle">
                <thead>
                    <th width="160px" colspan="1" rowspan="1" class=" el-table_1_column_1 " v-if="productData.spec[0]!=undefined"><div class="cell">{{productData.spec[0].name}}</div></th>
                    <th width="160px" colspan="1" rowspan="1" class=" el-table_1_column_2 " v-if="productData.spec[1]!=undefined"><div class="cell">{{productData.spec[1].name}}</div></th>
                    <th width="160px" colspan="1" rowspan="1" class=" el-table_1_column_3 " v-if="productData.spec[2]!=undefined"><div class="cell" >{{productData.spec[2].name}}</div></th>
                    <th width="160px" colspan="1" rowspan="1" class=" el-table_1_column_4 "><div class="cell">价格(元)</div></th>
                    <th width="160px" colspan="1" rowspan="1" class=" el-table_1_column_5 "><div class="cell">儿童价(元)</div></th>
                    <th width="190px" colspan="1" rowspan="1" class=" el-table_1_column_6 "><div class="cell">产品编号</div></th>
                </thead>
                <tr v-if="productData.spec[0].child!=undefined" v-for="(item,index) in productData.spec[0].child">
                    <td class="">{{item.name}}</td>
                    <td colspan="5" v-if="productData.spec[1]!=undefined">
                        <table width="100%">
                        <tr v-if="productData.spec[1].child!=undefined" v-for="(item1,index1) in productData.spec[1].child" >
                            <td width="158px">{{item1.name}}</td>
                            <td v-if="productData.spec[2]!=undefined">
                                <table width="100%">
                                <tr v-if="productData.spec[2].child!=undefined" v-for="(item2,index2) in productData.spec[2].child" >
                                    <td width="158px">{{item2.name}}</td>
                                    <td width="158px" style="padding:0 10px">
                                        <el-input type="number" v-model="productData.spec_price['s'+index+index1+index2].price"></el-input>
                                    </td>
                                    <td width="158px" style="padding:0 10px">
                                        <el-input  v-if="productData.is_children_price==1" type="number" v-model="productData.spec_price['s'+index+index1+index2].children_price"></el-input>
                                    </td>
                                    <td width="180">
                                        <div class="clearfix goodsBox" :key="goods.id" v-for="(goods,goodsIndex) in productData.spec_price['s'+index+index1+index2].product">
                                            <el-checkbox v-model="goods.idStatus" :label="goods.id" true-label="true" false-label="false" class="fl">
                                            </el-checkbox>
                                            <div class="select fr">数量：
                                                <el-select size="mini" v-model="goods.numBox">
                                                    <el-option
                                                      v-for="item in num"
                                                      :key="item"
                                                      :label="item"
                                                      :value="item">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </table>
                            </td>
                            <td v-else>
                                <table width="100%">
                                <tr>
                                    <td width="162px" style="padding:0 10px">
                                        <el-input type="number" v-model="productData.spec_price['s'+index+index1].price"></el-input>
                                    </td>
                                    <td width="158px" style="padding:0 10px" >
                                        <el-input v-if="productData.is_children_price==1" type="number" v-model="productData.spec_price['s'+index+index1].children_price"></el-input>
                                    </td>
                                    <td width="180">
                                        <div class="clearfix goodsBox" :key="goods.id" v-for="(goods,goodsIndex) in productData.spec_price['s'+index+index1].product">
                                            <el-checkbox v-model="goods.idStatus" :label="goods.id" true-label="true" false-label="false" class="fl">
                                            </el-checkbox>
                                            <div class="select fr">数量：
                                                <el-select size="mini" v-model="goods.numBox">
                                                    <el-option
                                                      v-for="item in num"
                                                      :key="item"
                                                      :label="item"
                                                      :value="item">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
                    <td v-else colspan="3">
                        <table width="100%">
                        <tr>
                            <td width="162px" style="padding:0 10px">
                                <el-input type="number" v-model="productData.spec_price['s'+index].price"></el-input>
                            </td>
                            <td width="158px" style="padding:0 10px">
                                <el-input type="number" v-model="productData.spec_price['s'+index].children_price"></el-input>
                            </td>
                            <td width="188px">
                                <div class="clearfix goodsBox" :key="goods.id" v-for="(goods,goodsIndex) in productData.spec_price['s'+index].product">
                                    <el-checkbox v-model="goods.idStatus" :label="goods.id" true-label="true" false-label="false" class="fl">
                                    </el-checkbox>
                                    <div class="select fr">数量：
                                        <el-select size="mini" v-model="goods.numBox">
                                            <el-option
                                              v-for="item in num"
                                              :key="item"
                                              :label="item"
                                              :value="item">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </el-form-item>
        <el-form-item
            prop="is_holiday"
            label='淡旺季'>
            <el-switch
                v-model="productData.is_holiday"
                active-color="#13ce66"
                inactive-color="#d2d2d2"
                active-value="1"
                inactive-value="0">
            </el-switch>
            <div class="sku-group" v-if="productData.is_holiday==1">
                <div class="sku-sub-group" v-for="(item,index) in productData.holiday_rules">
                  <h3 class="sku-group-title">
                    <div class="select-class">
                        <el-date-picker
                            size="mini"
                            v-model="item.start_date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                        至
                        <el-date-picker
                            size="mini"
                            v-model="item.end_date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                      <label>上浮比例：</label>
                       <el-input size="mini" class="inline" type="text" v-model="item.rate"></el-input>&nbsp;%
                    </div>
                    <span class="remove-group" @click="is_holidayDel(index)">×</span>
                  </h3>
                </div>
                <div class="sku-sub-group">
                  <h3 class="sku-group-title">
                    <div class="select-class">
                        <el-button size="mini" @click="addRuse()">添加一条规格</el-button>
                    </div>
                  </h3>
                </div>
            </div>
        </el-form-item>
        <el-col class="clear" :span="6">
            <el-form-item
                prop="refund_rule_id"
                label="退款规则">
                <el-select class="w220" v-model="productData.refund_rule_id" placeholder="请选择退款规则">
                    <el-option
                      v-for="item in refund_rule"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
              prop="change_rule_id"
              label="改签规则">
              <el-select class="w220" v-model="productData.change_rule_id" placeholder="请选择改签规则">
                  <el-option
                    v-for="item in change_rule"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col class="clear" :span="6">
            <el-form-item
                class="clear"
                prop="is_calendar"
                label='日历'>
                <el-switch
                    v-model="productData.is_calendar"
                    active-color="#13ce66"
                    inactive-color="#d2d2d2"
                    active-value="1"
                    inactive-value="0">
                </el-switch>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item
                class="clear"
                v-if="productData.is_calendar == 1"
                prop="book_months"
                label='开放日期'>
                <el-select class="w220" v-model="productData.book_months" placeholder="请选择开放日期">
                    <el-option
                      v-for="item in month"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="clear" :span="6">
            <el-form-item
                v-if="productData.is_calendar == 1"
                prop="book_days"
                label='提前预定'>
                <el-input placeholder="如5，0为随时" v-model="productData.book_days">
                    <template slot="append">天</template>
                </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item
                label="截止时间"
                prop="end_time"
                v-if="productData.is_calendar == 1">
                <el-input placeholder="请填写截止时间" v-model="productData.end_time"></el-input>
            </el-form-item>
        </el-col>
        <fieldset class="layui-field-title clear">
            <legend>产品详情</legend>
        </fieldset>
        <el-form-item
            prop="highlight_desc"
            label='产品亮点'>
            <el-input
              type="textarea"
              :autosize="{ minRows:4, maxRows: 4}"
              v-model="productData.highlight_desc"
              placeholder="请输入产品亮点">
            </el-input>
        </el-form-item>
        <el-form-item
            prop="highlight_img"
            label="亮点图片">
            <el-upload
              class="avatar-uploader"
              action="http://merchant-api.quitang.com/public/oss_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="productData.highlight_img" :src="productData.highlight_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload><small>图片尺寸为750*560，格式JPG</small>
        </el-form-item>
        <el-form-item
            prop="desc"
            label='产品简介'>
            <el-input
              type="textarea"
              :autosize="{ minRows:4, maxRows: 4}"
              v-model="productData.desc"
              placeholder="请输入产品简介">
            </el-input>
        </el-form-item>
        <el-form-item
            prop="detail"
            label='产品详情'>
            <vue-editor id="detail" v-model="productData.detail"></vue-editor>
        </el-form-item>
        <el-form-item
            prop="buy_desc"
            label='购买说明'>
            <vue-editor id="buy_desc" v-model="productData.buy_desc"></vue-editor>
        </el-form-item>
        <el-form-item
            label=' '>
            <el-button type="success" @click="submit('productData',1)">保存并发布</el-button>
            <el-button @click="submit('productData',2)">保存</el-button>
            <el-button @click="submit('productData',3)">预览</el-button>
            <el-button @click="$router.push('/product/travel/list1')">返回</el-button>
        </el-form-item>
    </el-form>
</el-row>
<!--产品选择-->
<el-dialog title="产品选择" :visible.sync="dialogTableVisible">
  <el-form :inline="true" :model='selectData' class="demo-form-inline" style="margin-top:-20px">
      <el-form-item>
          <el-select v-model="selectData.type" placeholder="全部类别">
              <el-option
                v-for="item in categorys"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
          <el-input placeholder="请输入关键字" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"
          ></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click='onSelectData'>查询</el-button>
      </el-form-item>
  </el-form>
  <el-table :data="productList.goods" style="margin-top:-10px" @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column property="goods_name" label="产品名称"></el-table-column>
    <el-table-column property="supplier_name" label="所属供应商" align="center"></el-table-column>
    <el-table-column property="price" label="价格" align="center">
      <template slot-scope="scope">
        {{scope.row.price}} {{scope.row.countrys_name}}
      </template>
    </el-table-column>
  </el-table>
  <!--翻页-->
  <el-pagination
    class="mt10"
    @current-change="handleCurrentChange"
    :current-page="selectData.page"
    background
    :page-size="8"
    layout="prev, pager, next, jumper"
    :total="productList.total">
  </el-pagination>
  <div slot="footer" class="dialog-footer" style="margin-top:-40px">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="selectSub()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
    import EditJs from './Edit.js';
    export default EditJs;
</script>
<style lang='less'>

    .sku-thumbimg{width: 60px;height: 60px;float: left;margin-right: 5px;
        img{width: 100%;}
    }
    .layui-field-title {
        padding: 0;
        margin: 30px 0 20px;
        border:1px solid #e6e6e6;
        border-width: 1px 0 0;
        legend {
            margin-left: 20px;
            padding: 0 10px;
            font-size: 20px;
            font-weight: 300;
        }
    }
    .sku-group{background-color: #fff;padding:10px;border: 1px solid #e5e5e5; position:relative;
    }
    .sku-group>.close-modal{right:10px; top:10px;}
    .sku-group:hover>.close-modal{display:block;}
    .sku-sub-group .remove-group{position: absolute;z-index: 2; display: none; top: 12px; right: 10px;width: 18px;height: 18px;font-size: 14px;line-height: 18px;border-radius: 50%;color: #fff;text-align: center;cursor: pointer;background: rgba(153,153,153,0.6);}
    .sku-group.active .item{pointer-events: none;}
    .sku-sub-group .remove-group:hover{background: rgba(0,0,0,0.9); color: #fff;}
    .sku-sub-group:hover .remove-group{display: block;}
    .sku-group h3.sku-group-title {
        position: relative;
        padding: 7px 0 7px 10px;
        margin: 0;
        color: #666;
        background-color: #f8f8f8;
        font-size: 12px;
        line-height: 16px;
        font-weight: normal;
    }
    .sku-group-title{
        .itemBox .itemBtn{width: 100%;}
    }
    .sku-atom-list{
        ul{padding-bottom: 10px;
            &:after{content: '';display: block;clear: both;}
            li{margin:0 0 0 10px;float: left;}
        }
    }
    .itemBox{position: relative;display: inline-block;width: auto;height: 28px;line-height: 28px;
        .itemBtn{display: none; position: absolute;left: 0;top: 0;width:50%;
            &.right{left:auto;right: 0;}
            button{border-radius:0;}
        }
        &:hover{
            .itemBtn{display: block;}
        }
        &.active:hover{
            .itemBtn{display: none;}
        }
    }
    .select-class{line-height: 28px;}
    .addSpec{ position: absolute;right:450px;top: 12px;z-index: 1;}
    .borderTable {border: 1px solid #ebeef5;border-width: 1px 0 0 1px;
        td,th{font-size: 16px;border:1px solid #ebeef5;border-width:0 1px 1px 0;text-align: center;box-sizing: border-box;}
    }
    .goodsBox{text-align: left;padding:0 10px;line-height: 30px;
       .select{
        .el-select{width: 60px;}
       }
       .el-checkbox__label{padding-left: 5px;}
    }
    .ml20{margin-left: 20px;}
</style>
