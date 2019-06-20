<template>
    <div class="list">
        <imgPop v-if="imgPopData.status"
            :data="imgPopData"
            @closeImg="closeImg"></imgPop>
        <div class="titleBox relative">订单详情 <el-button size="small"
                icon="el-icon-arrow-left"
                class="backDetail"
                @click="$router.push('/home/orderList')"
                type="warning">返回</el-button>
        </div>
        <div class="p20">
            <div class="tip">
                <p class="clearfix">
                    <span class="mr20">任务商品基本信息</span>
                    <span class="mr20">订单ID:{{dataBox.id}}</span>
                    <span class="mr20">买手ID:{{dataBox.bid}}</span>
                    <span class="mr20">接单账号:{{dataBox.member_name}}</span>
                    <span class="mr20">任务ID:{{dataBox.tid}}</span>
                    <span class="mr20">平台订单编号:{{dataBox.order_no}}</span>
                </p>
            </div>

            <div class="detail">
                <div class="info">
                    <a @click="openImg(dataBox.product_pic1)"
                        class="imgBox">
                        <img :src="dataBox.product_pic1"
                            alt>
                    </a>
                    <div class="title">
                        {{dataBox.title}}
                        <small class="red ml20">{{dataBox.type_name}}&nbsp;&nbsp; | &nbsp;&nbsp; {{dataBox.status_name}} <span v-if="dataBox.type == 2"> &nbsp; | &nbsp;{{dataBox.flow_step_name}}</span></small>
                    </div>
                    <div class="name">
                        {{dataBox.shop_name}}
                        <small>
                            商品名称:
                            <a :href="dataBox.product_url"
                                target="_blank">{{dataBox.product_name}}</a>
                        </small>
                        <small v-if="dataBox.type == 2 && dataBox.order_time">
                            <span>指定下单日期 : {{timeDay(dataBox.order_time)}}</span>
                        </small>
                    </div>
                    <p class="bottom">
                        <span class="mr20">
                            主商品成交价格:
                            <i class="red">{{dataBox.product_buy_price}}</i>
                        </span>
                        <span class="mr20">
                            主商品拍下单数:
                            <i class="red">{{dataBox.product_buy_num}}</i>
                        </span>
                        <span class="mr20">
                            垫付总本金:
                            <i class="red">{{dataBox.sale_price}}</i>
                        </span>
                        <span class="mr20">
                            返款金额:
                            <i class="red">{{dataBox.pay_money}}</i>
                        </span>
                        <span class="mr20">
                            关键词:
                            <i class="red">{{dataBox.keyword}}</i>
                        </span>
                    </p>
                    <p class>
                        <span class="mr20"
                            v-if="dataBox.status == 9">
                            取消类型名称:
                            <i class="red">{{dataBox.cancel_type_name}}</i>
                        </span>
                        <span class="mr20"
                            v-if="dataBox.status == 9">
                            审核不通过原因:
                            <i class="red">{{dataBox.cancel_content}}</i>
                        </span>
                        <span class="mr20"
                            v-if="dataBox.type == 1 || dataBox.type ==2">
                            是否已邀请评价:
                            <i class="red">{{dataBox.is_invite_praise==1?'已邀请' : '未邀请'}}</i>
                        </span>
                    </p>
                </div>
                <div class="tip mt20"
                    v-if="dataBox.task_attgoods && dataBox.task_attgoods.length>0">
                    <p class="clearfix">附加商品</p>
                </div>
                <el-table v-loading="loading"
                    v-if="dataBox.task_attgoods && dataBox.task_attgoods.length>0"
                    element-loading-text="拼命加载中！"
                    :data="dataBox.task_attgoods"
                    border
                    class="mt20"
                    style="width: 100%"
                    align="center">
                    <el-table-column prop="product_pic"
                        label="商品主图"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">
                            <img @click="openImg(scrow.row.product_pic)"
                                :src="scrow.row.product_pic"
                                width="100px"
                                height="100px"
                                alt>
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_buy_price"
                        label="成交价格"
                        align="center"
                        width="auto"></el-table-column>
                    <el-table-column prop="product_buy_num"
                        label="拍下单数"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">
                            {{scrow.row.product_buy_num}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="tip mt20">
                    <p class="clearfix">任务千人千面设置</p>
                </div>
                <el-table v-loading="loading"
                    element-loading-text="拼命加载中！"
                    :data="dataBox.task_service2"
                    border
                    class="mt20"
                    style="width: 100%"
                    align="center">
                    <el-table-column prop="remove_area_name"
                        label="限制购买区域"
                        align="center"
                        width="auto"></el-table-column>
                    <el-table-column prop="sex_name"
                        label="性别"
                        align="center"
                        width="auto"></el-table-column>
                    <el-table-column prop="age"
                        label="年龄段限制"
                        align="center"
                        width="auto"
                        :formatter="formatterAge"></el-table-column>
                    <el-table-column prop="credit_level_name"
                        label="信用等级"
                        align="center"
                        width="auto"></el-table-column>
                    <el-table-column prop="phone_type"
                        label="手机机型限制"
                        align="center"
                        :formatter="formatPhone_type"
                        width="auto"></el-table-column>
                    <el-table-column prop="huabei"
                        label="花呗下单"
                        align="center"
                        :formatter="formatHuabei"
                        width="auto"></el-table-column>
                    <el-table-column prop="grade_buyer"
                        label="高优质买号"
                        :formatter="formatGrade"
                        align="center"
                        width="auto"></el-table-column>
                    <el-table-column v-if="dataBox.type == '2'"
                        prop="is_only_allow_browse"
                        label="仅限做过此商品浏览任务的账号可接此任务"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">{{scrow.row.is_only_allow_browse == '0' ? '不限' : '仅限下单任务和预售任务专用'}}</template>
                    </el-table-column>
                    <el-table-column v-if="dataBox.type == '2'"
                        prop="limit_buy_time"
                        label="指定日期下单"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">隔{{scrow.row.limit_buy_time}}天</template>
                    </el-table-column>
                    <el-table-column v-if="dataBox.type == '3'"
                        prop="is_add_shopping_cart"
                        label="加购物车"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">{{scrow.row.is_add_shopping_cart == '0'?'不需要':'需要'}}</template>
                    </el-table-column>
                    <el-table-column v-if="dataBox.type == '3'"
                        prop="is_save_shop"
                        label="关注店铺"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">{{scrow.row.is_save_shop == '0'?'不需要':'需要'}}</template>
                    </el-table-column>
                    <el-table-column v-if="dataBox.type == '3'"
                        prop="is_save_product"
                        label="收藏宝贝"
                        align="center"
                        width="auto">
                        <template slot-scope="scrow">{{scrow.row.is_save_product == '0'?'不需要':'需要'}}</template>
                    </el-table-column>
                </el-table>
                <div class="tip mt20"
                    v-if="dataBox.type == '4'">
                    <p class="clearfix">评价内容</p>
                </div>
                <table class="mt20 table"
                    cellspacing="0"
                    v-if="dataBox.type == '4'"
                    cellpadding="0"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th>类型</th>
                            <th>内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_6 is-center">
                                <div class="cell"
                                    v-if="dataBox.task_praise">{{dataBox.task_praise.type_name}}</div>
                            </td>
                            <td class="el-table_1_column_6 is-center">
                                <div class="cell"
                                    v-if="dataBox.task_praise">{{dataBox.task_praise.content}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="table"
                    v-if="dataBox.task_praise && (dataBox.task_praise.pic1 ||dataBox.task_praise.pic2 ||dataBox.task_praise.pic3 ||dataBox.task_praise.pic4 ||dataBox.task_praise.pic5)"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th v-if="dataBox.task_praise && dataBox.task_praise.pic1">图片 1</th>
                            <th v-if="dataBox.task_praise && dataBox.task_praise.pic2">图片 2</th>
                            <th v-if="dataBox.task_praise && dataBox.task_praise.pic3">图片 3</th>
                            <th v-if="dataBox.task_praise && dataBox.task_praise.pic4">图片 4</th>
                            <th v-if="dataBox.task_praise && dataBox.task_praise.pic5">图片 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.task_praise && dataBox.task_praise.pic1">
                                <div class="cell">
                                    <img @click="openImg(dataBox.task_praise.pic1)"
                                        :src="dataBox.task_praise.pic1"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.task_praise && dataBox.task_praise.pic2">
                                <div class="cell">
                                    <img @click="openImg(dataBox.task_praise.pic2)"
                                        :src="dataBox.task_praise.pic2"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.task_praise && dataBox.task_praise.pic3">
                                <div class="cell">
                                    <img @click="openImg(dataBox.task_praise.pic3)"
                                        :src="dataBox.task_praise.pic3"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.task_praise && dataBox.task_praise.pic4">
                                <div class="cell">
                                    <img @click="openImg(dataBox.task_praise.pic4)"
                                        :src="dataBox.task_praise.pic4"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.task_praise && dataBox.task_praise.pic5">
                                <div class="cell">
                                    <img @click="openImg(dataBox.task_praise.pic5)"
                                        :src="dataBox.task_praise.pic5"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="video"
                    v-if="dataBox.task_praise && dataBox.task_praise.video">
                    <video :src="dataBox.task_praise.video"
                        controls>您的浏览器不支持 video 标签。</video>
                </div>
                <div class="tip mt20">
                    <p class="clearfix">任务操作时间</p>
                </div>
                <table class="mt20 table"
                    cellspacing="0"
                    cellpadding="0"
                    v-if="dataBox"
                    border="0"
                    style="width: 100%;">
                    <thead>
                        <tr>
                            <th v-if="dataBox.created_at!='0'">接单时间</th>
                            <th v-if="dataBox.flow_time!='0'">浏览时间</th>
                            <th v-if="dataBox.operate_time!='0'">支付（提交）时间</th>
                            <th v-if="dataBox.pay_time!='0'">本金审核时间</th>
                            <th v-if="dataBox.send_time!='0'">发货时间</th>
                            <th v-if="dataBox.recive_time!='0'">确认收货时间</th>
                            <th v-if="dataBox.complete_time!='0'">佣金审核时间</th>
                            <th v-if="dataBox.cancel_time!='0'">取消时间</th>
                            <th v-if="dataBox.appeal_time!='0'">申诉时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.created_at!='0'">
                                <div class="cell">{{timeDate(dataBox.created_at)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.flow_time != '0'">
                                <div class="cell">{{timeDate(dataBox.flow_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.operate_time!='0'">
                                <div class="cell">{{timeDate(dataBox.operate_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.pay_time!='0'">
                                <div class="cell">{{timeDate(dataBox.pay_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.send_time!='0'">
                                <div class="cell">{{timeDate(dataBox.send_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.recive_time!='0'">
                                <div class="cell">{{timeDate(dataBox.recive_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.complete_time!='0'">
                                <div class="cell">{{timeDate(dataBox.complete_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.cancel_time!='0'">
                                <div class="cell">{{timeDate(dataBox.cancel_time)}}</div>
                            </td>
                            <td class="el-table_1_column_4 is-center"
                                v-if="dataBox.appeal_time!='0'">
                                <div class="cell">{{timeDate(dataBox.appeal_time)}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="tip mt20">
                    <p class="clearfix">截图信息</p>
                </div>
                <!-- <div class="titSmall" v-if="dataBox.type == '1'">下单任务:</div> -->
                <table v-if="dataBox.type == '1'"
                    class="table mt20"
                    cellspacing="0"
                    cellpadding="0"
                    vi-f="dataBox"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th>搜索目标图</th>
                            <th>下单支付图</th>
                            <th>确认收货图</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.target_pic)"
                                        v-if="dataBox.target_pic"
                                        :src="dataBox.target_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.pay_pic)"
                                        v-if="dataBox.pay_pic"
                                        :src="dataBox.pay_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.receive_pic)"
                                        v-if="dataBox.receive_pic"
                                        :src="dataBox.receive_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="dataBox.type == '2'"
                    class="table mt20"
                    cellspacing="0"
                    cellpadding="0"
                    vi-f="dataBox"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th>搜索目标图</th>
                            <th>加购物车图</th>
                            <th>下单支付图</th>
                            <th>确认收货图</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.target_pic)"
                                        v-if="dataBox.target_pic"
                                        :src="dataBox.target_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.add_shopping_cart_pic)"
                                        v-if="dataBox.add_shopping_cart_pic"
                                        :src="dataBox.add_shopping_cart_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.pay_pic)"
                                        v-if="dataBox.pay_pic"
                                        :src="dataBox.pay_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.receive_pic)"
                                        v-if="dataBox.receive_pic"
                                        :src="dataBox.receive_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="dataBox.type == '3'"
                    class="table mt20"
                    cellspacing="0"
                    cellpadding="0"
                    vi-f="dataBox"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th>搜索目标图</th>
                            <th>浏览图</th>
                            <th>加购物车图</th>
                            <th>关注店铺图</th>
                            <th>收藏宝贝图</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.target_pic)"
                                        v-if="dataBox.target_pic"
                                        :src="dataBox.target_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.flow_pic)"
                                        v-if="dataBox.flow_pic"
                                        :src="dataBox.flow_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.add_shopping_cart_pic)"
                                        v-if="dataBox.add_shopping_cart_pic"
                                        :src="dataBox.add_shopping_cart_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.save_shop_pic)"
                                        v-if="dataBox.save_shop_pic"
                                        :src="dataBox.save_shop_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.save_product_pic)"
                                        v-if="dataBox.save_product_pic"
                                        :src="dataBox.save_product_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="dataBox.type == '4'"
                    class="table mt20"
                    cellspacing="0"
                    cellpadding="0"
                    vi-f="dataBox"
                    border="0"
                    style="width: 100%;">
                    <thead class>
                        <tr class>
                            <th>评价截图</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td class="el-table_1_column_4 is-center">
                                <div class="cell">
                                    <img @click="openImg(dataBox.evaluate_pic)"
                                        v-if="dataBox.evaluate_pic"
                                        :src="dataBox.evaluate_pic"
                                        alt
                                        width="100px"
                                        height="100px">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import orderDetailJs from "./orderDetail.js";
export default orderDetailJs;
</script>
<style scoped lang="less">
.tip {
    margin: 0;
}
.video {
    width: 500px;
    margin: 40px auto;
    video {
        width: 100%;
    }
}
.titSmall {
    line-height: 40px;
    color: #666;
}
.detail {
    .info {
        padding: 20px 0 20px 200px;
        min-height: 200px;
        position: relative;
        .title {
            padding-bottom: 10px;
            font-size: 16px;
            svg {
                width: 25px;
                height: 25px;
                vertical-align: middle;
            }
        }
        .name {
            padding: 10px;
            background: #f6f6f6;
            small {
                margin-top: 10px;
                display: block;
                font-size: 14px;
            }
        }
        .imgBox {
            display: block;
            position: absolute;
            left: 0;
            top: 20px;
            width: 180px;
            height: 180px;
            background: #f6f6f6;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .bottom {
            padding: 10px 0;
            border-bottom: 1px dashed #ddd;
            i {
                font-style: normal;
            }
        }
        p {
            padding: 5px 0;
            font-size: 14px;
            color: #666;
        }
        .right {
            position: absolute;
            right: 0;
            top: 20px;
            border: 1px solid #ff8762;
            width: 180px;
            font-size: 12px;
            line-height: 25px;
            text-align: center;
            overflow: hidden;
            .imgBox {
                position: relative;
                img {
                    width: 100%;
                }
            }
        }
    }
}
.table {
    border: 1px solid #eee;
    border-width: 1px 1px 0 0;
    margin-top: -1px;
    td,
    th {
        border: 1px solid #eee;
        color: #666;
        font-weight: normal;
        border-width: 0 0 1px 1px;
        padding: 5px 10px;
        text-align: center;
    }
}
</style>
