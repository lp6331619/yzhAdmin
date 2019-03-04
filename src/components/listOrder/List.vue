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
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.orders" border style="width: 100%" align='center'>
            <el-table-column
                prop="order_sn"
                label="订单号"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                label="产品名称"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="num"
                v-if="this_type!=5 && this_type!=6 && this_type!=7 && this_type!=8"
                label="购买数量"
                align="center"
                width="80">
            </el-table-column>
            <el-table-column
                v-if="this_type!=6 && this_type!=7"
                prop="total_money"
                label="总价（元）"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type!=0 && this_type!=1 && this_type!=2"
                prop="payed_money"
                label="支付金额"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type!=6 &&  this_type!=7"
                prop="pay_time"
                label="支付时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type!=5 && this_type!=6 && this_type!=7 && this_type!=8"
                prop="use_time"
                label="消费日期"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type==6 || this_type==7"
                prop="create_time"
                label="申请时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type==8"
                prop="change_time"
                label="取消时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                v-if="this_type==5"
                prop="refound_time"
                label="完成时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="140"
                align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">详情</el-button>
                        <el-button
                          v-if="this_type==0||this_type==1||this_type==2"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleClose(scope.row,scope.$index)">
                          关闭
                        </el-button>
                        <el-button
                          v-if="this_type==3||this_type==4"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleBeing(scope.row,scope.$index)">
                          退款
                        </el-button>
                    </el-button-group>
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
