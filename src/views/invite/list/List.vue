<template>
  <div class="list">
    <div class="titleBox">邀请好友</div>
    <div class="p20">
      <div class="tip">
        <p>邀请好友链接仅友情推荐注册，没有任何利益划勾，请商家们知晓。复制链接发送邀请给好友</p>
      </div>
      <el-input readonly="readonly" v-model="url.spread_url"></el-input>
      <el-button class="mt20" type="warning" @click="doCopy(url.spread_url)">+复制链接</el-button>
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
