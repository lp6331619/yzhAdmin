<template>
    <div class="list">
         <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-input placeholder="请输入订单号" v-model='selectData.order_sn' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入微信号" v-model='selectData.wechat' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入航班号" v-model='selectData.train_num' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.shop_id" placeholder="供应商">
                    <el-option
                      v-for="(item,index) in supplier"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.country_id" placeholder="国家">
                    <el-option
                      v-for="(item,index) in country"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.goods" border style="width: 100%" align='center'>
            <el-table-column
                prop="order_sn"
                label="订单号"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="pay_time"
                label="支付时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="type"
                label="分类"
                :formatter="formatterType"
                align="center">
            </el-table-column>
            <el-table-column
                prop="shop_name"
                label="供应商"
                align="center">
            </el-table-column>
            <el-table-column
                prop="deal_admin"
                label="首次处理人员"
                align="center">
            </el-table-column>
            <el-table-column
                prop="deal_time"
                label="首次处理时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="退款状态"
                :formatter="formatterStatus"
                align="center">
            </el-table-column>
           <!--  <el-table-column
                prop="train_num"
                label="班次"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="arrival"
                label="出发地"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="departure"
                label="到达的"
                align="center"
                width="auto">
            </el-table-column> -->
           <!--  <el-table-column
                prop="adult_num"
                label="成人票"
                align="center"
                width="80">
            </el-table-column> -->
          <!--   <el-table-column
                prop="children_num"
                label="儿童票"
                align="center"
                width="80">
            </el-table-column> -->
            <!-- <el-table-column
                prop="draw_time"
                label="出票日期"
                align="center"
                width="160">
            </el-table-column> -->
           <!--  <el-table-column
                v-if="this_type!=0"
                prop="pay_money"
                label="支付金额"
                align="center"
                width="140"
                :sortable="true">
            </el-table-column> -->
            <!-- <el-table-column
                prop="use_time"
                label="出发时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column> -->
            <!-- <el-table-column
                v-if="this_type==3"
                prop="utime"
                label="完成时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column> -->
           <!--  <el-table-column
                prop="utime"
                label="取消日期"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column> -->
            <el-table-column
                v-if="this_type!=0"
                fixed="right"
                label="操作"
                width="110"
                align="center">
                <template slot-scope="scope">
                    <!-- <el-button-group> -->
                        <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">详情</el-button>
                       <!--  <el-button
                          v-if="this_type==0"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleClose(scope.row)">
                          关闭
                        </el-button> -->
                        <!-- <el-button
                          v-if="this_type==1||this_type==2"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleBeing(scope.row,scope.$index)">
                          退款
                        </el-button> -->
                        <!-- <el-button
                          v-if="this_type==4"
                          size="mini"
                          plain
                          @click="handleGood(scope.row,scope.$index)">
                          同意
                        </el-button>
                        <el-button
                          v-if="this_type==5"
                          size="mini"
                          plain
                          @click="handleGood2(scope.row,scope.$index)">
                          同意
                        </el-button> -->
                       <!--  <el-button
                          v-if="this_type==4"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleNo(scope.row,scope.$index)">
                          拒绝
                        </el-button>
                        <el-button
                          v-if="this_type==5"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleNo(scope.row,scope.$index)">
                          拒绝
                        </el-button> -->
                    <!-- </el-button-group> -->
                </template>
            </el-table-column>
        </el-table>
        <!--翻页-->
        <div class="pageBox" v-show="pageShow">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData.page"
              background
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ListJs from './List.js';
export default ListJs;
</script>
<style scoped>

</style>
