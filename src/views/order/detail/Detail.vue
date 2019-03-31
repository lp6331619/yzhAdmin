<template>
  <div class="list">
    <div class="titleBox">订单详情</div>
    <div class="p20 detail">
      <el-row :gutter="20">
        <el-col :span="8">订单ID:{{dataBox.id}}</el-col>
        <el-col :span="8">买手ID:{{dataBox.bid}}</el-col>
        <el-col :span="8">接单账号:{{dataBox.member_name}}</el-col>
        <el-col :span="8">任务Id:{{dataBox.tid}}</el-col>

        <el-col :span="8">任务名称:{{dataBox.title}}</el-col>
        <el-col :span="8">店铺名称:{{dataBox.shop_name}}</el-col>
        <el-col :span="8">
          商品名称:
          <a :href="dataBox.product_url" target="_blank">{{dataBox.product_name}}</a>
        </el-col>
        <el-col :span="8">商品单价:{{dataBox.product_buy_price}}</el-col>
        <el-col :span="8">
          商品图片:
          <img :src="dataBox.product_pic1" height="100px" width="100px" alt>
        </el-col>
        <el-col :span="8">每单拍下数量:{{dataBox.product_buy_num}}</el-col>
        <el-col :span="8">搜索关键词:{{dataBox.keyword}}</el-col>
        <el-col :span="8">
          淘宝目标图片:
          <img :src="dataBox.target_pic" height="100px" width="100px" alt>
        </el-col>
        <el-col :span="8">支付金额:{{dataBox.pay_money}}</el-col>

        <el-col :span="8">淘宝订单遍号:{{dataBox.order_no}}</el-col>
        <el-col :span="8">状态:{{dataBox.status_name}}</el-col>

        <el-col :span="8">审核不通过原因:{{dataBox.cancel_content}}</el-col>

        <el-col :span="8">接单时间:{{created_atTime(dataBox.created_at)}}</el-col>
        <el-col :span="8">提交时间:{{created_atTime(dataBox.operate_time)}}</el-col>
        <el-col :span="8">取消时间:{{created_atTime(dataBox.cancel_time)}}</el-col>

        <el-col :span="8">返款时间:{{created_atTime(dataBox.pay_time)}}</el-col>
        <el-col :span="8">完结时间:{{created_atTime(dataBox.complete_time)}}</el-col>
        <el-col class="clear" :span="8">
          <el-button type="warning" @click="$router.push('/order/list')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import DetailJs from "./Detail.js";
export default DetailJs;
</script>
<style scoped lang="less">
.detail {
  .el-col {
    padding-bottom: 20px;
    img {
      vertical-align: top;
    }
  }
}
</style>
