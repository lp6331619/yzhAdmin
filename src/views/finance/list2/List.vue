<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.status" placeholder="全部状态">
                    <el-option
                      v-for="item in status"
                      :key="item.id"
                      :label="item.name"
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
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.withdraws" border style="width: 100%" align='center'>
            <el-table-column
                prop="bank_owner"
                label="提现人"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="withdraw_money"
                label="提现金额"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="bank_owner"
                label="提现用户"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="bank_account"
                label="提现账号"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="bank_name"
                label="提现银行"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align="center"
                :formatter="formatterStatus"
                width="auto">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="190"
                align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.row)">查看</el-button>
                        <el-button
                          v-if="scope.row.status==2"
                          size="mini"
                          type="primary"
                          plain
                          @click="handleStatus(scope.row)">通过</el-button>
                        <el-button
                          v-if="scope.row.status==2"
                          size="mini"
                          type="danger"
                          plain
                          @click="handleDenial(scope.row)">拒绝</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <!--翻页-->
        <div class="pageBox" v-show="pageShow">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="selectData.page"
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
