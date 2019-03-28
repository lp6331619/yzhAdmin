<template>
  <div class="list">
    <div class="titleBox">
      任务详情
      <el-button class="ml20" type="warning" @click="addAppeal = true" size="mini">+发布任务</el-button>
    </div>
    <div class="p20"></div>
  </div>
</template>
<script>
import EditJs from "./Edit.js";
export default EditJs;
</script>
<style scoped lang="less">
.el-upload-list--picture-card .el-upload-list__item,
.el-upload--picture-card {
  width: 130px;
  height: 130px;
}
.listBox {
  .item {
    padding-bottom: 20px;
  }
  .title {
    background: #f1f1f1;
    line-height: 62px;
    display: flex;
    padding: 0 20px;
    li {
      flex: 1;
      font-size: 14px;
      svg {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
  .bottom {
    padding: 20px 250px 20px 140px;
    min-height: 140px;
    position: relative;
    .imgBox,
    .buttonBox {
      position: absolute;
      left: 0;
      top: 20px;
    }
    .imgBox {
      display: block;
      width: 120px;
      height: 120px;
      overflow: hidden;
      background: #f6f6f6;
      border: 1px solid #eee;
      img {
        width: 100%;
      }
    }
    .name {
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
    }
    .num {
      margin-top: 10px;
      font-size: 14px;
      span {
        display: inline-block;
        text-align: center;
        margin-top: 15px;
        line-height: 30px;
        padding: 0 20px;
        border-right: 1px solid #eee;
        border-right-style: dashed;
        &:last-child {
          border: none;
        }
      }
    }
    .buttonBox {
      left: auto;
      right: 0;
      top: 50px;
    }
  }
}
</style>
