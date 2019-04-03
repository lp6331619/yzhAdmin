<template>
  <div class="list">
    <imgPop v-if="imgPopData.status" :data="imgPopData" @closeImg="closeImg"></imgPop>
    <div class="titleBox">账户充值</div>
    <div class="tip text-center">
      <p>
        本金余额（元）:
        <strong class="f20 mr20">{{balance_money_com}}</strong>
        佣金余额（元）:
        <strong class="f20">{{balance_commision_money_com}}</strong>
      </p>
    </div>
    <el-row :gutter="20" class="p20">
      <el-col :span="12">
        <div class="card">
          <div class="title first">第一步：请先转账到以下账号</div>
          <div class="cardBox">
            <div class="num">{{bankInfo.bank_no}}</div>
            <p>户名：{{bankInfo.name}}</p>
            <p>开户行：{{bankInfo.bank_name}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card">
          <div class="title last">第二步：确认提交转账金额</div>
          <div class="formBox">
            <el-form
              size="mini"
              label-width="100px"
              class="form"
              v-loading="loading"
              element-loading-text="正在登录"
              :model="form"
              :rules="rule_data"
              ref="form"
            >
              <el-form-item class="formRow" prop="bank_id" label="银行">
                <el-select v-model="form.bank_id" placeholder="请选择银行">
                  <el-option
                    v-for="item in bankList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="formRow" prop="bank_no" label="银行卡号">
                <el-input
                  type="number"
                  class="form-control"
                  placeholder="转出银行卡号"
                  v-model="form.bank_no"
                ></el-input>
              </el-form-item>
              <el-form-item class="formRow" prop="name" label="银行卡姓名">
                <el-input
                  type="text"
                  class="form-control"
                  placeholder="转出银行卡姓名"
                  v-model="form.name"
                ></el-input>
              </el-form-item>
              <el-form-item class="formRow" prop="cost_money" label="转出金额">
                <el-input
                  type="number"
                  class="form-control"
                  placeholder="转出金额"
                  v-model="form.cost_money"
                ></el-input>
              </el-form-item>
              <el-form-item class="formRow" prop="url" label="转账截图">
                <el-upload
                  class="avatar-uploader"
                  :action="`${url}/Public/upload_img`"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.url" :src="form.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item class="formRow">
                <el-button type="warning" @click="subRecharge('form')">确认提交</el-button>
                <el-button @click="yjSub()">佣金充值</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tip">
      <p>
        充值记录
        <el-button class="ml20" type="warning" @click="onExport()" size="mini">导出</el-button>
      </p>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中！"
      :data="tableData.list"
      border
      style="width: 100%"
      align="center"
    >
      <el-table-column prop="cost_money" sortable label="转账金额（元）" align="center" width="145"></el-table-column>
      <el-table-column
        prop="account_type"
        label="账户类型 "
        align="center"
        :formatter="formatterAccount"
        width="90"
      ></el-table-column>
      <el-table-column prop="bank_name" label="转账银行" align="center" width="auto"></el-table-column>
      <el-table-column prop="bank_no" label="转出银行卡号" align="center" width="auto"></el-table-column>
      <el-table-column prop="name" label="转出银行卡姓名" align="center" width="110"></el-table-column>
      <el-table-column prop="transfer_pic" label="转账截图url" align="center" width="auto">
        <template slot-scope="scrow">
          <a @click="openImg(scrow.row.transfer_pic)">
            <img :src="scrow.row.transfer_pic" alt height="40px">
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="账户类型 "
        align="center"
        :formatter="formatterStatus"
        width="90"
      ></el-table-column>
      <el-table-column prop="site_bank_no" label="平台银行账号" align="center" width="auto"></el-table-column>
      <el-table-column prop="verify_content" label="驳回理由" align="center" width="150"></el-table-column>
      <el-table-column
        prop="created_at"
        :formatter="created_atTime"
        label="提交时间"
        align="center"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="audit_at"
        :formatter="audit_atTime"
        label="审核时间"
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
</template>
<script>
import HomeJs from "./Home.js";
export default HomeJs;
</script>
<style scoped lang="less">
.card {
  height: 548px;
  padding: 0 0 15px;
  background: #f9f9f9;
  .cardBox {
    width: 380px;
    height: 220px;
    margin: 140px auto 0;
    padding: 1px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXQAAADVCAYAAABHVAusAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQ0QyRERFNEExRkExMUU4OUM0RUFEMjRDMjYzODU4OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQ0QyRERFNUExRkExMUU4OUM0RUFEMjRDMjYzODU4OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJDRDJEREUyQTFGQTExRTg5QzRFQUQyNEMyNjM4NTg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJDRDJEREUzQTFGQTExRTg5QzRFQUQyNEMyNjM4NTg5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6GleqAAAC41JREFUeNrs3cuLJPUBwPGq6p7pnh2dTQyYaBJfmLAgejCI6CWnBEQIConkb/AQJAEVQ04hARUTkoOecwiCBBMxIh58BENyCYkRFjYiKMyysjEx7mse/arUr7drrK3tmeme7emumf58oGh3pre6t0a+/Ztf/7oqjsaw+uqri9nNA4Ptnmy7PtsWIwAm4Xy2ncy2f2Tb77Ptpa/ed19r1L8cjxHzB7Obp+rLy7fWjx6NstsoWVjI9hD7EQBMQppGvXY76ly4EHXOnAm372dffSyL+osTCfoLTz5Zv+eOO36WNBqPNq+7rh9yAPZfCPvGRx9Fvc3Np/767rs/fuixxzo73T/ZJfbx3bff/vPakSOPLt9yi5gDTFFobmhvbXn50dDivMvjjtD7X//wlVe+u7C09MLyzTdHca3m6ALMQNrtRhc++CBqr68/dNP99/8u/3L5frXtRubPPfFE89hNN/3xyA03rCSNhiMKMCNxkkS1ZjPMq9/79RtvfO6Vt9/uDrtfMizmYfvW3Xd/Lxvuf6V25IijCTBjocVZk7+ctfmhYqu3C3pcuE1qtdoDYTULANUQmhzaPGh3XGr3tiP0pJYk3/AmKECFgp41OWvznYWgXzJCr5dDPthqcRx/sb/OHIBKCE3O2vyl6OL7n/mbor3BbVofMkKvDULf8KEhgAq52OTFQaPTqLTSJdluhO7IAVRWrdDrramX4sR6UhqhA1BN9UGr4+LAvPymqBE6wMEboW8FPIounW4RdICDFfS4HPTyPDoA1VSO+SVBj4aEHYBqGumTooIOcLCCfskcejnggg5wMIJ+yZ+THe4MQHWDfplkl+oDcDBG6VazABwWgg4g6AAIOgCCDoCgAxxqO54m9+zx444QgBE6AIIOgKADCDoAgg6AoAMg6AAIOoCgAyDoAAg6AIIOIOgACDoAgg6AoAMIOgCCDoCgAyDoAAg6gKADIOgACDoAgg4g6AAIOgCCDoCgAyDoAIIOgKADIOgACDqAoAMg6AAIOgCCDiDoAAg6AIIOgKADIOgAgg6AoAMg6AAIOoCgAyDoAExffadvrtx2myMEUCFnjx83Qgc47AQdQNABEHQABB0AQQcQdAAEHQBBB0DQAQQdAEEHQNABEHQABB1A0AGooLpDAFRVp9WK2pubUdrrRbWFhWih0YiSWs2BEXTgoAgR72Rbr9v9LO6Dr9UXFy+GvS5fgg5UUpqm/WDnI/KdRu1h64/Ym82oJuyCDlQk5Fm88xF5iPqouu12fwsj9TBiDyN3QQeYgV4W8nxEHo0R8sv20+lEm9nW3tiI6lnYQ9wFHWAaIe92t0bkk95va22tH/b+iD3b4jgWdIBJ64ZRdBbxbqu1r48TpnBa6+tRaxD2sMXJfKzQFnRgX3Xa7f5oPMx3T1Wa9kfrxamYw77kUdCB/Qn5YA15mOOe+XMpLHkMcT+sK2MEHZjgoHiw9DCLeVpYQ16lF5mtJY8h7NmtoAOUQr619HCHNeRVcViXPAo6sPeQD9aQX+nSw1kpLnnMV8YIOjBXtpYehhUrBzDkw/49m2trWytjDuqSR0EHRhaWHnbykB/S3zjCksfiypiDtORR0IHdQ95uX1xDPu2lh7MK+wFd8ijowLaqtPRwZsdg8GZvbXCWxyoveRR0oDw87S87LJ++du5/S8mOSbfiSx4FHdiaZhjl9LVzH/YKL3kUdJj3kB/wpYezUsUlj4IO8xqkQ7b0cJbHsSpLHgUd5nBk2T7ESw9n+ZvOrJc8CjrMkTCSnPR5yCmFPV/ymB3nxvJyVJ/im6eJww/zoSXm0y57tHn+/FRXCgk6zIF8vpwZvJCurws6MDnz8gnPSr6YdjpjXfxa0IFdfvu3imVmx/7iD0DQgcmYl2tqVlGSHftpHX8/ZZgD9UN2ZZ6DZKHZnN6Lh8MN8zFCD0vomH7Mp3lqAOvQYV5G6VlYwpkCwweKes7Vsu8voOG3ommfclfQYc5CM80pAKbLlAuAoANQJaZcgP46dR8+Gvug9aewqnShC0GHee9SrxetnzvnohZ7jWijETWOHKnEczHlAnPOFYquTJUu1SfoMOd8inQCx3BGF7S47LcFPwqYb+FCDN1O5+Ic+qjnHBk3YId0v+HFcHFpqTIvioIORM3l5a2LRO92utewjn1hzOtnhn3udoWkMBe9OOYa+XDZt93O8R4+IRs+UDWOjd3OY569QDSvuiqqhQ8OVWR0LujAJdMGo3yyMd7LyaZGiN5eTmI1ylTHfjzf8N1xXySmweQZUJhpSEe50+weey/PZR+ebxpV85TEgg5wSAg6gKADIOgACDoAgg4g6AAIOgCCDoCgAwg6AIIOgKADIOgACDqAoAMg6AAIOgCCDiDoAAg6AIIOgKADCDoAgg6AoAMg6AAIOoCgAyDoAAg6AIIOIOgACDoAgg6AoAMIukMA5OI4HuVO4+93Uo+9h+eyp/2O8O/Zj/1eqbr/hWG+9Hq9KErT4d/rdnf9+2l2n1Hud8l+t3m88vMad79p+Lfsohv2OW58d3m+4bvdTmf7qGdfT5Lpj5cFHeZEp9WK2hsbY0ezrL252d8m/vyyfXb2Yb+ttbXJH8ws+Bvnzu14l6Rejxabzai2sDC1n7EpF5gDIcCbFy5cccwZ47eSbAS/cf58/4VU0IFqj1IZyWZ27NMRppwEHaDqspiH+XZBBzgMTR/hzVtBBzgAklpN0IGDFRQuV6vX+5ugAxPRvOoqUZ/RC2ljeXlqj2cdOsyBOEmipZWV/vLFsHQxX3UROzQTla9lCR84CqPy+uLiVB9f0GGOLDQaDsJh/o3AIQAQdAAEHQBBB0DQAQQdAEEHYMZB76XphWmdUAaAEaRp+FBYe+ygt9vt/6TttgMIUBG9rMmdbvfjsYO+trHxr46T4gNURufChej82trxsYP+/urqG50zZxxBgKoEPWvy+ydPvjFq0NPBFv3g6adfW/v00393jdIBZi60OGvyxz985pnXyr3ebYSenjx9uv3nd9755fqpU1HqwrIAMxMaHFqcNfkXH5461SqHPJefIDke/He+hbMwLvzhzTdX77/nnqs/12jcvrCy0j8lJABTjHmvF62trkYnTpx4/sEf/ei32ZfCapXW4LZb2Hq1QcyTwXZJ0MPti6+//s9v33XX51fi+FjSaETJlM/vCzCvwpug61nM33vvvZe+88gjv251Ou1S0Dt5zEP7y0FPCkHvRz3bQfKbl1/+243XXrt6/dLS15JW6+pwcvy4VuufND8yageY2Gg8bbWi9rlz0ebp09H/VldPvfzWW7/6/uOPPz8k5nnQe3nQ40LQ81F5GIIvDbYj2dYcbIvXrKw0f/rww9+889ixe685evTWZqPxhSSOXdcKYAJ6adrd2Nz87ydnzrz/9xMn/vKTZ5/90ydnz24MIr6ZbevZtja4XS+N1Ht50PM59DzozULUl/KgD75fG7wA5ENzQ3SACQ3SC7dh1N0tjMo3CiFfH/y5NYh52NLyJeh6hZ3kd2oPIh4X4p1Gn62QEXSAyQY9b3He4OIUS3HevFf4O/1plnQQ5d4g0t3CTurRZ3PrxZgXR+mCDjC5oJdH5+V58+Kbofl9o+IIPd1mhN6KPptjLz5YrRD64ihd3AH2Niof1uE85vkcemubEXqaj9DLO+4WRt7laZb8QcojdyEHmNzovDzdslkIe3mEvmXYCD0qRb34QPnIvR6ZdgHYr6CX38ccFvORRujFHe4U82FBF3aA8UM+rL/F9zM7Q2J+2cf/66WdxlFpkr0U9O42MTdKB7jy0fl2Ue/uMDLfCvuwCJcjnRQCXnwzNBkSc1EHuLIRenEevVeIeHdIyNNyvKNtoh4Vgl6+TbYZmQs6wN6Cvl3U0yG35b+3a4DjbeIeRT4pCrDfo/V86ntYxNOdoh2NEfbIyBxgKiP1aJSQ7zXE8YT2A8D2QR/l65f5vwADAD+reuEQU9EYAAAAAElFTkSuQmCC)
      no-repeat;
    .num {
      text-align: center;
      margin-top: 33px;
      font-size: 28px;
      color: #fff;
      padding-bottom: 35px;
    }
    p {
      padding-left: 20px;
      margin-top: 10px;
    }
  }
  .title {
    line-height: 40px;
    text-align: center;
    background: #3e454d;
    color: #fff;
    position: relative;
    &.first:before,
    &.last:before {
      content: "";
      position: absolute;
      right: -19px;
      top: 0;
      width: 0;
      height: 0;
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-left: 20px solid #3e454d;
    }
    &.last:before {
      right: auto;
      left: 0;
      border-left-color: #fff;
    }
  }
}
.form {
  width: 400px;
  margin: 40px auto 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
