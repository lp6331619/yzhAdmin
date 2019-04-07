<template>
  <div class="list">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中！"
      :data="tableData.list"
      border
      style="width: 100%"
      align="center"
    >
      <el-table-column prop="title" label="公告标题" align="center" width="auto"></el-table-column>
      <el-table-column
        prop="created_at"
        label="发布时间"
        :formatter="timeFormat"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain @click="handleEdit(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <div class="pageBox" v-show="pageShow">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="selectData.p"
        background
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped>
</style>
