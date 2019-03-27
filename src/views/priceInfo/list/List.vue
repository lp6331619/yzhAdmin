<template>
  <div class="list">
    <div class="titleBox">价格明细</div>
    <div class="p20">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中！"
        :data="tableData"
        border
        style="width: 100%"
        align="center"
      >
        <el-table-column prop="payment" label="垫付区间" align="center" width="auto"></el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="auto"></el-table-column>
        <el-table-column prop="payment2" label="垫付区间" align="center" width="auto"></el-table-column>
        <el-table-column prop="price2" label="价格" align="center" width="auto"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped leng="less">
.el-upload-list--picture-card .el-upload-list__item,
.el-upload--picture-card {
  width: 130px;
  height: 130px;
}
</style>
