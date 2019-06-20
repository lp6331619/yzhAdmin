<template>
    <div class="list">
        <div class="titleBox">
            任务列表
            <imgPop v-if="imgPopData.status"
                :data="imgPopData"
                @closeImg="closeImg"></imgPop>
            <el-button class="ml20"
                type="warning"
                @click="$router.push(`/flow/edit`)"
                size="mini">+发布任务</el-button>
        </div>
        <div class="p20">
            <el-form :inline="true"
                :model="selectData"
                class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="selectData.status"
                        placeholder="请选择任务状态">
                        <el-option v-for="(item,index) in status"
                            :key="index"
                            :label="item"
                            :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="selectData.sid"
                        placeholder="请选择店铺">
                        <el-option v-for="(item,index) in getMyShops"
                            :key="index"
                            :label="item"
                            :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="date"
                        type="daterange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="setDate"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions2"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入任务ID"
                        v-model="selectData.order_id"
                        @keyup.native.enter="onSelectData()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入任务名称"
                        v-model="selectData.title"
                        @keyup.native.enter="onSelectData()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning"
                        @click="onSelectData">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="listBox">
                <div v-if="tableData.list && tableData.list.length>0">
                    <div class="item"
                        v-for="(item,index) in tableData.list"
                        :key="index">
                        <div class="title">
                            <li>
                                <svg class="icon"
                                    aria-hidden="true">
                                    <use xlink:href="#icon-taobao"></use>
                                </svg>
                                {{item.shop_name}}
                            </li>
                            <li>
                                <svg class="icon"
                                    aria-hidden="true">
                                    <use xlink:href="#icon-xiaoliang"></use>
                                </svg>
                                任务名称:{{item.title}}
                            </li>
                            <li>任务ID:{{item.id}}</li>
                            <li>创建时间:{{timeDate(item.created_at)}}</li>
                            <li>
                                任务状态:
                                <span class="red">{{item.status_name}}</span>
                            </li>
                        </div>
                        <div class="bottom">
                            <a @click="openImg(item.product_pic1)"
                                class="imgBox">
                                <img :src="item.product_pic1"
                                    alt>
                            </a>
                            <div class="name">
                                <a :href="item.product_url"
                                    target="_blank"
                                    rel="noreferrer">{{item.product_name}}</a>
                            </div>
                            <div class="num">
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=0`)">
                                    {{item.total_num}}
                                    <br>总单数
                                </a>
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=1`)">
                                    {{item.wait_opera_num}}
                                    <br>待操作
                                </a>
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=2`)">
                                    {{item.wait_verify_num}}
                                    <br>待审核
                                </a>
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=6`)">
                                    {{item.complete_num}}
                                    <br>已完成
                                </a>
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=7`)">
                                    {{item.appeal_num}}
                                    <br>申诉中
                                </a>
                                <a @click="$router.push(`/flow/detail?tid=${item.id}&status=9`)">
                                    {{item.cancel_num}}
                                    <br>已取消
                                </a>
                                <a>
                                    {{item.wait_num}}
                                    <br>未接单
                                </a>
                            </div>
                            <div class="timeBox">
                                开始时间:{{item.push_start_time}}
                                <span class="ml20">结束时间:{{item.push_end_time}}</span>
                            </div>
                            <div class="buttonBox">
                                <el-button type="warning"
                                    @click="$router.push(`/flow/detail?tid=${item.id}`)">查看详情</el-button>
                                <el-button v-if="item.status_name == '待支付'"
                                    type="warning"
                                    @click="pay(item.id)">立即支付</el-button>
                                <el-button @click="$router.push(`/flow/edit?tid=${item.id}`)">重新发布</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="noneData"
                    v-else>暂无数据</div>
            </div>
            <!--翻页-->
            <div class="pageBox"
                v-show="pageShow">
                <el-pagination @current-change="handleCurrentChange"
                    :current-page="selectData.p"
                    background
                    :page-size="selectData.limit"
                    layout="prev, pager, next, jumper"
                    :total="tableData.count"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped lang="less">
.el-upload-list--picture-card .el-upload-list__item,
.el-upload--picture-card {
    width: 130px;
    height: 130px;
}
.listBox {
    .item {
        padding-bottom: 20px;
    }
    .title {
        background: #f1f1f1;
        line-height: 62px;
        display: flex;
        padding: 0 20px;
        li {
            flex: 1;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            svg {
                width: 30px;
                height: 30px;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
    }
    .bottom {
        padding: 20px 250px 20px 140px;
        min-height: 140px;
        position: relative;
        .imgBox,
        .buttonBox {
            position: absolute;
            left: 0;
            top: 20px;
        }
        .imgBox {
            display: block;
            width: 120px;
            height: 120px;
            overflow: hidden;
            background: #f6f6f6;
            border: 1px solid #eee;
            img {
                width: 100%;
            }
        }
        .name {
            line-height: 30px;
            font-size: 16px;
            font-weight: bold;
        }
        .timeBox {
            font-size: 12px;
            color: #999;
            .ml20 {
                margin-left: 50px;
            }
        }
        .num {
            margin-top: 10px;
            font-size: 14px;
            a {
                display: inline-block;
                text-align: center;
                line-height: 30px;
                padding: 0 20px;
                border-right: 1px solid #eee;
                border-right-style: dashed;
                &:last-child {
                    border: none;
                }
            }
        }
        .buttonBox {
            left: auto;
            right: 0;
            top: 50px;
        }
    }
}
</style>
