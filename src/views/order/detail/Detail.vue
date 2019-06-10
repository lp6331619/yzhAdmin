<template>
    <div class="list">
        <imgPop v-if="imgPopData.status" :data="imgPopData" @closeImg="closeImg"></imgPop>
        <div class="titleBox">订单详情</div>
        <div class="p20 detail">
            <div class="tip">
                <p class="clearfix">
                    <span class="mr20">订单ID:{{dataBox.id}}</span>
                    <span class="mr20">买手ID:{{dataBox.bid}}</span>
                    <span class="mr20">接单账号:{{dataBox.member_name}}</span>
                    <span class="mr20">任务Id:{{dataBox.tid}}</span>
                    <span class="mr20">平台订单编号:{{dataBox.order_no}}</span>
                </p>
            </div>

            <div class="detail">
                <div class="info">
                    <a @click="openImg(dataBox.product_pic1)" class="imgBox">
                        <img :src="dataBox.product_pic1" alt>
                    </a>
                    <div class="title">
                        {{dataBox.title}}
                        <small class="red">{{dataBox.status_name}}</small>
                    </div>
                    <div class="name">
                        {{dataBox.shop_name}}
                        <small>
                            商品名称:
                            <a
                                :href="dataBox.product_url"
                                target="_blank"
                            >{{dataBox.product_name}}</a>
                        </small>
                        <small>
                            接单时间:{{created_atTime(dataBox.created_at)}}
                            <span
                                class="ml20"
                            >提交时间:{{created_atTime(dataBox.operate_time)}}</span>
                            <span class="ml20">取消时间:{{created_atTime(dataBox.cancel_time)}}</span>
                            <br>
                            <span class>返款时间:{{created_atTime(dataBox.pay_time)}}</span>
                            <span class="ml20">完结时间:{{created_atTime(dataBox.complete_time)}}</span>
                        </small>
                    </div>
                    <p class="bottom">
                        <span class="mr20">
                            商品单价:
                            <i class="red">{{dataBox.product_buy_price}}</i>
                        </span>
                        <span class="mr20">
                            支付金额:
                            <i class="red">{{dataBox.pay_money}}</i>
                        </span>
                        <span class="mr20">
                            每单拍下数量:
                            <i class="red">{{dataBox.product_buy_num}}</i>
                        </span>
                        <span class="mr20">
                            搜索关键词:
                            <i class="red">{{dataBox.keyword}}</i>
                        </span>
                    </p>
                    <div class="right">
                        淘宝目标图片:
                        <a @click="openImg(dataBox.target_pic)" class="imgBox">
                            <img :src="dataBox.target_pic" alt>
                        </a>
                    </div>
                </div>
            </div>
            <div class="cancel_content mt20">审核不通过原因:{{dataBox.cancel_content}}</div>
        </div>
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
</style>
