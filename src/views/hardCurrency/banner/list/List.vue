<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
           <!--  <el-form-item>
                <el-select v-model="selectData.status" placeholder="全部状态">
                    <el-option
                      v-for="item in status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-input placeholder="请输入关键字" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/hardCurrency/banner/edit')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.banners" border style="width: 100%" align='center'>
            <el-table-column
                prop="name"
                label="活动名称"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="type"
                label="状态"
                align="center"
                :formatter="formatterType"
                width="120">
            </el-table-column>
            <el-table-column
                prop="score"
                label="启止日期"
                align="center"
                width="330"
                :sortable="true">
                <template slot-scope="scope">
                  {{scope.row.ctime}} -- {{scope.row.utime}}
                </template>
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
                          @click="handleEdit(scope.row)">编辑</el-button>
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
