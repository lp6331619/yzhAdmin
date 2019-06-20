<template>
    <div class="list relative">
        <imgPop v-if="imgPopData.status"
            :data="imgPopData"
            @closeImg="closeImg"></imgPop>
        <el-button size="small"
            icon="el-icon-arrow-left"
            class="backDetail"
            @click="$router.push('/home/')"
            type="warning">返回</el-button>
        <el-tabs v-model="selectData.status"
            @tab-click="handleClick">
            <el-tab-pane label="任务详情"
                name="100">
                <div class="p20">
                    <div class="tip">
                        <p class="clearfix">
                            <span class="mr20">任务ID：{{data.id}}</span>
                            任务名称：{{data.title}}
                            <span class="mr20">{{timeDate(data.created_at)}}</span>
                            <el-button class="fr"
                                type="warning"
                                @click="Revoke()"
                                size="mini"
                                v-if="data.status==1 || data.status==2 || data.status==3">撤销未完成的任务</el-button>
                        </p>
                    </div>
                    <div class="detail">
                        <div class="info">
                            <a @click="openImg(data.product_pic1)"
                                class="imgBox">
                                <img :src="data.product_pic1"
                                    alt>
                            </a>
                            <div class="title">
                                <svg class="icon"
                                    aria-hidden="true">
                                    <use xlink:href="#icon-taobao"></use>
                                </svg>
                                {{data.shop_name}}
                            </div>
                            <div class="name">
                                {{data.product_name}}
                                <small>
                                    快递方式:{{data.express_type_name}}
                                    <span class="ml20">开始时间:{{data.push_start_time}}</span>
                                    <span class="ml20">结束时间:{{data.push_end_time}}</span>
                                </small>
                            </div>
                            <p class="bottom">
                                <span class="mr20">
                                    搜索展示价格:
                                    <i class="red">{{data.product_search_price}}</i>
                                </span>
                                <span class="mr20">
                                    付款人数约:
                                    <i class="red">{{data.pay_person_num}}</i>
                                </span>
                                <span class="mr20">
                                    商品所在地:
                                    <i class="red">{{data.product_address}}</i>
                                </span>
                            </p>
                            <p>
                                <span v-if="data.other_ask"
                                    class="mr20">特殊需求:{{data.other_ask}}</span>
                                <span v-if="data.order_message"
                                    class="mr20">订单留言:{{data.order_message}}</span>
                            </p>
                            <ul class="right">
                                <li>
                                    订单总数:
                                    <span>{{data.total_num}}</span>
                                </li>
                                <li>
                                    待操作:
                                    <span>{{data.wait_opera_num}}</span>
                                </li>
                                <li>
                                    待审核:
                                    <span>{{data.wait_verify_num}}</span>
                                </li>
                                <li>
                                    已完成:
                                    <span>{{data.complete_num}}</span>
                                </li>
                                <li>
                                    申诉中:
                                    <span>{{data.appeal_num}}</span>
                                </li>
                                <li>
                                    已取消:
                                    <span>{{data.cancel_num}}</span>
                                </li>
                                <li>
                                    未接单:
                                    <span>{{data.wait_num}}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="tip">
                            <p>附加商品列表</p>
                        </div>
                        <el-table v-loading="loading"
                            element-loading-text="拼命加载中！"
                            :data="data.attgoods"
                            border
                            class="mt20"
                            style="width: 100%"
                            align="center">
                            <el-table-column prop="product_pic"
                                label="附加商品主图"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">
                                    <a :href="scrow.row.product_url">
                                        <img :src="scrow.row.product_pic"
                                            width="100px"
                                            height="100px"
                                            alt>
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="product_buy_price"
                                label="附加商品成交价格"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="product_buy_num"
                                label="附加商品每单拍数量"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="product_format"
                                label="附加商品规格"
                                align="center"
                                width="auto"></el-table-column>
                        </el-table>
                        <div class="tip mt20">
                            <p>任务搜索条件列表</p>
                        </div>
                        <el-table v-loading="loading"
                            element-loading-text="拼命加载中！"
                            :data="data.search"
                            border
                            class="mt20"
                            style="width: 100%"
                            align="center">
                            <el-table-column prop="keyword"
                                label="搜索关键词"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="num"
                                label="任务单数"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="complete_num"
                                label="买手已接单数量"
                                align="center"
                                width="auto"></el-table-column>
                        </el-table>
                        <div class="mt20"></div>
                        <div class="tip">
                            <p>任务千人千面设置</p>
                        </div>
                        <el-table v-loading="loading"
                            element-loading-text="拼命加载中！"
                            :data="data.task_service2"
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
                            <el-table-column v-if="data.type == '2'"
                                prop="is_only_allow_browse"
                                label="仅限做过此商品浏览任务的账号可接此任务"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">{{scrow.row.is_only_allow_browse == '0' ? '不限' : '仅限下单任务和预售任务专用'}}</template>
                            </el-table-column>
                            <el-table-column v-if="data.type == '2'"
                                prop="limit_buy_time"
                                label="指定日期下单"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">隔{{scrow.row.limit_buy_time}}天</template>
                            </el-table-column>
                            <el-table-column v-if="data.type == '3'"
                                prop="is_add_shopping_cart"
                                label="加购物车"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">{{scrow.row.is_add_shopping_cart == '0'?'不需要':'需要'}}</template>
                            </el-table-column>
                            <el-table-column v-if="data.type == '3'"
                                prop="is_save_shop"
                                label="关注店铺"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">{{scrow.row.is_save_shop == '0'?'不需要':'需要'}}</template>
                            </el-table-column>
                            <el-table-column v-if="data.type == '3'"
                                prop="is_save_product"
                                label="收藏宝贝"
                                align="center"
                                width="auto">
                                <template slot-scope="scrow">{{scrow.row.is_save_product == '0'?'不需要':'需要'}}</template>
                            </el-table-column>
                        </el-table>
                        <div class="tip mt20">
                            <p>价格明细</p>
                        </div>
                        <el-table v-loading="loading"
                            element-loading-text="拼命加载中！"
                            :data="data.task_price2"
                            border
                            class="mt20"
                            style="width: 100%"
                            align="center">
                            <el-table-column prop="sale_price"
                                label="商品价格"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="express_price"
                                label="快递费用"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="commission"
                                label="佣金"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="reward_money"
                                label="加赏金额"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="added_charge"
                                label="增值服务费用"
                                align="center"
                                width="auto"></el-table-column>
                            <el-table-column prop="back_charge"
                                label="返款服务费"
                                align="center"
                                width="auto"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="item.name"
                :name="item.type"
                v-for="(item,index) in status"
                :key="index"></el-tab-pane>
        </el-tabs>
        <taskList :pageList="false"
            v-if="selectData.status!='100'"
            :listStatus="selectData.status"></taskList>
    </div>
</template>
<script>
import DetailJs from "./Detail.js";
export default DetailJs;
</script>
<style scoped lang="less">
.tip {
    margin: 0;
}
.detail {
    .info {
        padding: 20px 200px;
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
            li {
                padding: 0 15px;
                border-top: 1px solid #eee;
            }
            span {
                float: right;
            }
        }
    }
}
</style>
