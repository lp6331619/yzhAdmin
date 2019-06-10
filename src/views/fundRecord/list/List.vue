<template>
    <div class="list">
        <div class="titleBox">资金记录</div>
        <div class="p20">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="selectData.type" placeholder="操作类型">
                        <el-option
                            v-for="item in type"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type"
                        ></el-option>
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
                    <el-button type="warning" @click="onSelectData">查询</el-button>
                    <el-button @click="onExport()">导出</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中！"
                :data="tableData.list"
                border
                style="width: 100%"
                align="center"
            >
                <el-table-column
                    prop="score"
                    label="账户类型 "
                    align="center"
                    :formatter="formatterAccount"
                    width="90"
                ></el-table-column>
                <el-table-column prop="type_name" label="操作类型" align="center" width="110"></el-table-column>
                <el-table-column prop="cost_money" label="存入/支出" align="center" width="110"></el-table-column>
                <el-table-column
                    prop="balance_capital_money"
                    label="本金可用余额"
                    align="center"
                    width="auto"
                ></el-table-column>
                <el-table-column
                    prop="balance_commision_money"
                    label="佣金可用余额"
                    align="center"
                    width="auto"
                ></el-table-column>
                <el-table-column prop="balance_money" label="可用余额" align="center" width="auto"></el-table-column>

                <el-table-column prop="total_money" label="总金额" align="center" width="auto"></el-table-column>
                <el-table-column prop="content" label="备注" align="center" width="150"></el-table-column>
                <el-table-column
                    prop="created_at"
                    :formatter="created_atTime"
                    label="提交时间"
                    align="center"
                    width="auto"
                ></el-table-column>
            </el-table>
            <!--翻页-->
            <div class="pageBox" v-show="pageShow">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="selectData.p"
                    background
                    :page-size="selectData.limit"
                    layout="prev, pager, next, jumper"
                    :total="tableData.count"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped>
</style>
