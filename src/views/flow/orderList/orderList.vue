<template>
    <div class="list">
        <imgPop v-if="imgPopData.status" :data="imgPopData" @closeImg="closeImg"></imgPop>
        <div class="titleBox">流量订单</div>
        <div class="p20">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="selectData.status" placeholder="任务状态">
                        <el-option
                            v-for="item in status"
                            :key="item.status"
                            :label="item.name"
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="selectData.type" placeholder="订单类型">
                        <el-option label="全部任务" value=" "></el-option>
                        <el-option label="下单任务" value="1"></el-option>
                        <el-option label="预售任务" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="selectData.is_invite_praise" placeholder="是否已邀请评价">
                        <el-option label="全部" value=" "></el-option>
                        <el-option label="已邀请" value="1"></el-option>
                        <el-option label="未邀请" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="setDate"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions2"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="selectData.sid" placeholder="请选择店铺">
                        <el-option
                            v-for="(item,index) in getMyShops"
                            :key="index"
                            :label="item"
                            :value="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="selectData.tid" placeholder="任务ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="selectData.oid" placeholder="订单ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="selectData.member_name" placeholder="接单账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="selectData.order_no" placeholder="淘宝平台订单号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="selectData.money" placeholder="付款金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="onSelectData">查询</el-button>
                    <el-button
                        @click="openPop(multipleSelection,4)"
                        type="primary"
                        v-if="selectData.status == '5'"
                        :disabled="multipleSelection.length<=0"
                        plain
                    >批量佣金审核</el-button>
                    <el-button @click="onExport()">导出表格</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中！"
                :data="tableData.list"
                border
                style="width: 100%"
                align="center"
                @selection-change="handleSelectionChange"
            >
                <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="订单ID" align="center" width="auto"></el-table-column>
                <el-table-column prop="shop_name" label="店铺名称" align="center" width="auto"></el-table-column>
                <el-table-column prop="sale_price" label="垫付金额" align="center" width="auto"></el-table-column>
                <el-table-column prop="product_pic1" label="商品主图" align="center" width="110">
                    <template slot-scope="scrow">
                        <a @click="openImg(scrow.row.product_pic1)">
                            <img :src="scrow.row.product_pic1" style="height:100px;">
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="member_name" label="接单账号" align="center" width="80"></el-table-column>
                <el-table-column prop="tid" label="任务 ID" align="center" width="auto"></el-table-column>
                <el-table-column prop="type_name" label="任务类型" align="center" width="auto"></el-table-column>
                <el-table-column
                    prop="created_at"
                    label="接单时间"
                    :formatter="created_atTime"
                    align="center"
                    width="100"
                ></el-table-column>
                <el-table-column
                    prop="complete_time"
                    label="支付(提交)时间"
                    :formatter="complete_timeTime"
                    align="center"
                    width="100"
                ></el-table-column>
                <el-table-column prop="cancel_content" label="不通过原因" align="center" width="auto"></el-table-column>
                <el-table-column prop="status_name" label="状态" align="center" width="80">
                    <template slot-scope="scrow">
                        {{scrow.row.status_name}}
                        <span
                            v-if="scrow.row.type == '2'"
                        >({{scrow.row.flow_step_name}})</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template slot-scope="scrow">
                        <el-button
                            plain
                            type="warning"
                            size="mini"
                            @click="$router.push(`/flow/orderDetail?id=${scrow.row.id}`)"
                        >查看</el-button>
                        <el-button
                            plain
                            size="mini"
                            v-if="scrow.row.status == '5'"
                            @click="openPop(scrow.row.id,2)"
                        >佣金审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--翻页-->
            <div class="pageBox mt20" v-show="pageShow">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="selectData.p"
                    background
                    :page-size="selectData.limit"
                    layout="prev, pager, next, jumper"
                    :total="tableData.count"
                ></el-pagination>
            </div>
            <!--审核-->
            <el-dialog title="订单审核" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rulesBox" ref="form">
                    <el-form-item label="是否通过" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="6">通过</el-radio>
                            <el-radio :label="9">驳回</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="驳回原因" v-if="form.status == '9'" prop="cancel_content">
                        <el-input
                            v-model="form.cancel_content"
                            autocomplete="off"
                            type="textarea"
                            :rows="2"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sub('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import OrderListJs from "./orderList.js";
export default OrderListJs;
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #eee;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.video-avatar {
    width: 400px;
    height: 200px;
}
</style>
