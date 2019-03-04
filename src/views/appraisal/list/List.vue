<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.score" placeholder="全部满意度">
                    <el-option
                      v-for="item in satisfaction"
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
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.comments" border style="width: 100%" align='center'>
            <el-table-column
                prop="name"
                label="产品名称"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="评价人"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="score"
                label="满意度"
                align="center"
                :formatter="formatterScore"
                width="90"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="ctime"
                label="评价时间"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="content"
                label="评价内容"
                align="center"
                width="auto">
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
                          @click="handleEdit(scope.row)">查看</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          plain
                          @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
