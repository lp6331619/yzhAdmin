<template>
  <div class="list">
    <imgPop v-if="imgPopData.status" :data="imgPopData" @closeImg="closeImg"></imgPop>
    <el-tabs v-model="selectData.status" @tab-click="handleClick">
      <el-tab-pane label="任务详情" name="100">
        <div class="p20">
          <div class="tip">
            <p class="clearfix">
              <span class="mr20">任务ID：{{data.id}}</span>
              任务名称：{{data.title}}
              <span class="mr20">{{time(data.created_at)}}</span>
              <el-button
                class="fr"
                type="warning"
                @click="Revoke()"
                size="mini"
                v-if="data.status==1 || data.status==2 || data.status==3"
              >撤销未完成的任务</el-button>
            </p>
          </div>
          <div class="detail">
            <div class="info">
              <a @click="openImg(data.product_pic1)" class="imgBox">
                <img :src="data.product_pic1" alt>
              </a>
              <div class="title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-taobao"></use>
                </svg>
                {{data.shop_name}}
              </div>
              <div class="name">
                {{data.product_name}}
                <small>快递方式:{{data.express_type_name}}</small>
              </div>
              <p class="bottom">
                <span class="mr20">
                  搜索展示价格:
                  <i class="red">{{data.product_search_price}}</i>
                </span>
                <span class="mr20">
                  付款人数约:
                  <i class="red">{{data.pay_person_num}}</i>
                </span>
                <span class="mr20">
                  商品所在地:
                  <i class="red">{{data.product_address}}</i>
                </span>
              </p>
              <p>备注说明：看五张主图，点赞买家秀，一定要收藏加入购物车，操作15分钟</p>
              <ul class="right">
                <li>
                  订单总数:
                  <span>{{data.total_num}}</span>
                </li>
                <li>
                  待操作:
                  <span>{{data.wait_opera_num}}</span>
                </li>
                <li>
                  待审核:
                  <span>{{data.wait_verify_num}}</span>
                </li>
                <li>
                  已完成:
                  <span>{{data.complete_num}}</span>
                </li>
                <li>
                  申诉中:
                  <span>{{data.appeal_num}}</span>
                </li>
                <li>
                  已取消:
                  <span>{{data.cancel_num}}</span>
                </li>
                <li>
                  未接单:
                  <span>{{data.wait_num}}</span>
                </li>
              </ul>
            </div>
            <div class="tip">
              <p>任务搜索条件列表</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中！"
              :data="data.search"
              border
              class="mt20"
              style="width: 100%"
              align="center"
            >
              <el-table-column prop="keyword" label="搜索关键词" align="center" width="auto"></el-table-column>
              <el-table-column prop="num" label="任务单数" align="center" width="auto"></el-table-column>
              <el-table-column prop="complete_num" label="买手已接单数量" align="center" width="auto"></el-table-column>
            </el-table>
            <div class="mt20"></div>
            <div class="tip">
              <p>任务千人千面设置</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中！"
              :data="data.task_service2"
              border
              class="mt20"
              style="width: 100%"
              align="center"
            >
              <el-table-column prop="remove_area_name" label="限制购买区域" align="center" width="auto"></el-table-column>
              <el-table-column prop="sex_name" label="性别" align="center" width="auto"></el-table-column>
              <el-table-column
                prop="age"
                label="年龄段限制"
                align="center"
                width="auto"
                :formatter="formatterAge"
              ></el-table-column>
              <el-table-column prop="credit_level_name" label="信用等级" align="center" width="auto"></el-table-column>
              <el-table-column
                prop="phone_type"
                label="手机机型限制"
                align="center"
                :formatter="formatPhone_type"
                width="auto"
              ></el-table-column>
              <el-table-column
                prop="huabei"
                label="花呗下单"
                align="center"
                :formatter="formatHuabei"
                width="auto"
              ></el-table-column>
              <el-table-column
                prop="grade_buyer"
                label="高优质买号"
                :formatter="formatGrade"
                align="center"
                width="auto"
              ></el-table-column>
            </el-table>
            <div class="tip mt20">
              <p>价格明细</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中！"
              :data="data.task_price2"
              border
              class="mt20"
              style="width: 100%"
              align="center"
            >
              <el-table-column prop="sale_price" label="商品价格" align="center" width="auto"></el-table-column>
              <el-table-column prop="express_price" label="快递费用" align="center" width="auto"></el-table-column>
              <el-table-column prop="commission" label="佣金" align="center" width="auto"></el-table-column>
              <el-table-column prop="reward_money" label="加赏金额" align="center" width="auto"></el-table-column>
              <el-table-column prop="added_charge" label="增值服务费用" align="center" width="auto"></el-table-column>
              <el-table-column prop="back_charge" label="返款服务费" align="center" width="auto"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="item.name" :name="item.type" v-for="(item,index) in status" :key="index"></el-tab-pane>
    </el-tabs>
    <div class="p20" v-if="selectData.status!='100'">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item>
          <el-button
            @click="openPop(multipleSelection,1)"
            type="primary"
            v-if="selectData.status == '2'"
            :disabled="multipleSelection.length<=0"
            plain
          >批量审核</el-button>
          <el-button @click="onExport()">导出表格</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中！"
        :data="tableData.list"
        border
        style="width: 100%"
        align="center"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="订单ID" align="center" width="auto"></el-table-column>
        <el-table-column prop="product_pic1" label="产品图片" align="center" width="110">
          <template slot-scope="scrow">
            <a @click="openImg(scrow.row.product_pic1)" traget="_blank">
              <img :src="scrow.row.product_pic1" style="height:100px;">
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="product_name" label="产品名称" align="center" width="300px">
          <template slot-scope="scrow">
            <a :href="scrow.row.product_url" target="_blank">{{scrow.row.product_name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="taobao_name" label="接单账号名称" align="center" width="auto"></el-table-column>
        <el-table-column prop="member_name" label="接单账号" align="center" width="auto"></el-table-column>
        <el-table-column prop="product_buy_price" label="付款金额" align="center" width="auto"></el-table-column>
        <el-table-column prop="order_no" label="淘宝订单号" align="center" width="80"></el-table-column>
        <el-table-column
          prop="created_at"
          label="接单时间"
          :formatter="created_atTime"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column prop="cancel_content" label="不通过原因" align="center" width="auto"></el-table-column>
        <el-table-column prop="status_name" label="状态" align="center" width="80"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scrow">
            <el-button
              type="warning"
              plain
              size="mini"
              @click="$router.push(`/order/detail?id=${scrow.row.id}`)"
            >查看</el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              :disabled="scrow.row.status != '2'"
              @click="openPop(scrow.row.id,2)"
            >审核</el-button>
          </template>
        </el-table-column>
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
      <!--审核-->
      <el-dialog title="订单审核" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rulesBox" ref="form">
          <el-form-item label="是否通过" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="6">通过</el-radio>
              <el-radio :label="9">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="驳回原因" v-if="form.status == '9'" prop="cancel_content">
            <el-input v-model="form.cancel_content" autocomplete="off" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sub('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DetailJs from "./Detail.js";
export default DetailJs;
</script>
<style scoped lang="less">
.tip {
  margin: 0;
}
.detail {
  .info {
    padding: 20px 200px;
    min-height: 200px;
    position: relative;
    .title {
      padding-bottom: 10px;
      font-size: 16px;
      svg {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
    }
    .name {
      padding: 10px;
      background: #f6f6f6;
      small {
        margin-top: 10px;
        display: block;
        font-size: 14px;
      }
    }
    .imgBox {
      display: block;
      position: absolute;
      left: 0;
      top: 20px;
      width: 180px;
      height: 180px;
      background: #f6f6f6;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .bottom {
      padding: 10px 0;
      border-bottom: 1px dashed #ddd;
      i {
        font-style: normal;
      }
    }
    p {
      padding: 5px 0;
      font-size: 14px;
      color: #666;
    }
    .right {
      position: absolute;
      right: 0;
      top: 20px;
      border: 1px solid #ff8762;
      width: 180px;
      font-size: 12px;
      line-height: 25px;
      li {
        padding: 0 15px;
        border-top: 1px solid #eee;
      }
      span {
        float: right;
      }
    }
  }
}
</style>
