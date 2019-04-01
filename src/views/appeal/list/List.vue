<template>
  <div class="list">
    <div class="titleBox">
      申诉管理
      <el-button class="ml20" type="warning" @click="addAppeal = true" size="mini">+添加申诉</el-button>
    </div>
    <div class="p20">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="selectData.source" placeholder="申诉种类">
            <el-option
              v-for="item in source"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectData.type" placeholder="申诉类型">
            <el-option v-for="item in type" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectData.status" placeholder="状态">
            <el-option
              v-for="item in status"
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
          <el-input
            placeholder="请输入订单ID"
            v-model="selectData.order_no"
            @keyup.native.enter="onSelectData()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入店铺ID"
            v-model="selectData.shop_id"
            @keyup.native.enter="onSelectData()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入接单淘宝账号"
            v-model="selectData.wangwang"
            @keyup.native.enter="onSelectData()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onSelectData">查询</el-button>
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
        <el-table-column prop="shop_name" label="店铺名称" align="center" width="auto"></el-table-column>
        <el-table-column prop="type_name" label="申诉类型" align="center" width="auto"></el-table-column>
        <el-table-column prop="source_name" label="申诉种类" align="center" width="110"></el-table-column>
        <el-table-column prop="order_no" label="订单id" align="center" width="auto"></el-table-column>
        <el-table-column prop="taobao_name" label="接单淘宝账号" align="center" width="auto"></el-table-column>
        <el-table-column prop="content" label="申诉内容" align="center" width="auto"></el-table-column>
        <el-table-column prop="pic_url" label="申诉截图" align="center" width="auto">
          <template slot-scope="scope">
            <img
              style="max-height:40px;max-width:40px;"
              :src="item"
              alt
              v-for="(item,index) in scope.row.pic_url"
              :key="index"
            >
          </template>
        </el-table-column>
        <el-table-column prop="status_name" label="状态" align="center" width="auto"></el-table-column>
        <el-table-column prop="remark" label="客服回复" align="center" width="150"></el-table-column>
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
    <!-- 添加申诉 -->
    <el-dialog title="添加申诉" :visible.sync="addAppeal" width="500px">
      <el-form
        :model="addAppealForm"
        v-loading="loading"
        element-loading-text="正在提交！"
        :rules="rule_addAppeal"
        ref="addAppealForm"
        label-width="80px"
      >
        <el-form-item label="订单id" prop="order_no">
          <el-input v-model="addAppealForm.order_no"></el-input>
        </el-form-item>
        <el-form-item label="申诉类型" prop="type">
          <el-select v-model="addAppealForm.type" placeholder="申诉种类">
            <el-option v-for="item in type" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申诉内容" prop="content">
          <el-input v-model="addAppealForm.content"></el-input>
        </el-form-item>
        <el-form-item label="申诉截图" prop="pics">
          <el-upload
            :action="`${url}/Public/upload_img`"
            list-type="picture-card"
            :on-remove="handleRemove"
            :file-list="this.addAppealForm.pics"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="2"
            :on-exceed="error"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordStatus = false">取 消</el-button>
        <el-button type="warning" @click="addAppealSub('addAppealForm')">确 定</el-button>
      </div>
    </el-dialog>
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
