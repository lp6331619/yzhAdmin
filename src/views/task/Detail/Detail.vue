<template>
  <div class="list">
    <div class="titleBox">任务详情</div>
    <div class="p20">
      <div class="tip">
        <p class="clearfix">
          <el-button class="fr" type="warning" @click="Revoke()" size="mini">撤销未完成的任务</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import DetailJs from "./Detail.js";
export default DetailJs;
</script>
<style scoped lang="less">
</style>
