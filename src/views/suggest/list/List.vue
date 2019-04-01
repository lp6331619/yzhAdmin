<template>
  <div class="list">
    <div class="titleBox">
      意见建议
      <el-button class="ml20" type="warning" @click="addAppeal = true" size="mini">+添加建议</el-button>
    </div>
    <div class="p20">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
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
            placeholder="请输入联系方式"
            v-model="selectData.phone"
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
        <el-table-column prop="type_name" label="意见类型" align="center" width="auto"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center" width="110"></el-table-column>
        <el-table-column prop="content" label="意见内容" align="center" width="auto"></el-table-column>
        <el-table-column prop="reply" label="回复内容" align="center" width="auto"></el-table-column>
        <el-table-column prop="pic" label="图片" align="center" width="auto">
          <template slot-scope="scope">
            <img style="max-height:40px;max-width:40px;" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column prop="status_name" label="状态" align="center" width="auto"></el-table-column>
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
        <el-form-item label="申诉类型" prop="type">
          <el-select v-model="addAppealForm.type" placeholder="申诉种类">
            <el-option v-for="item in type" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申诉内容" prop="content">
          <el-input v-model="addAppealForm.content"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="addAppealForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="申诉截图" prop="pic">
          <el-upload
            class="avatar-uploader"
            :action="`${url}/Public/upload_img`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addAppealForm.url" :src="addAppealForm.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
