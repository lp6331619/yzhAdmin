<template>
    <div class="list">
        <div class="titleBox">销售订单</div>
        <taskList :pageList="true"
            :listStatus="''"></taskList>
    </div>
</template>
<script>
import OrderListJs from "./orderList.js";
export default OrderListJs;
</script>
<style scoped>
</style>
