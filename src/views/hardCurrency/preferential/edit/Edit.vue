<template>
    <div class="list">
        <el-row>
            <h1 class="backTitle"><router-link to="/hardCurrency/preferential/list"><i class="iconfont icon-left"></i>优惠劵活动</router-link></h1>
            <el-form 
                class="mt20"
                label-position="right" 
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                :rules="tableRules"
                ref='tableData'
                :model='tableData'>
                <el-form-item label="优惠劵名称" prop="name">
                    <el-col :span="14">
                        <el-input placeholder="请输入优惠劵名称" v-model="tableData.name"></el-input>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="领取对象" prop="user_type">
                    <el-col :span="24">
                        <el-radio-group v-model="tableData.user_type">
                            <el-radio :label="1">所有用户</el-radio>
                            <el-radio :label="2">新用户</el-radio>
                            <el-radio :label="3">购买用户</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="可得产品" prop="name" v-if="tableData.user_type==3">
                  <el-col :span="15">
                    <el-table border style="width: 100%" align='center' max-height="250" :data="tableData.promotion_goods">
                        <el-table-column
                            prop="data"
                            label="产品"
                            align="left"
                            width="auto">
                            <template slot-scope="scope">
                                <h3>{{scope.row.name}}</h3>
                                <p>{{scope.row.type_name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                  size="mini"
                                  type="danger"
                                  plain
                                  icon="el-icon-delete"
                                  @click="handleDelete(scope.$index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button size="mini" @click="openPop(1)">增加单品</el-button>
                  </el-col>
                </el-form-item>
                <el-col :span="7">
                <el-form-item label="领取时间" prop="get_start_time">
                    <el-date-picker
                          v-model="tableData.get_start_time"
                          type="date"
                          placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="7">
                <el-form-item label="结束时间" prop="get_end_time">
                    <el-date-picker
                          v-model="tableData.get_end_time"
                          type="date"
                          placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                </el-col>
                <div class="clear"></div>
                <el-form-item label="发放总量" prop="total_num">
                    <el-col :span="7">
                        <el-input placeholder="请输入发放总量" v-model="tableData.total_num">
                          <template slot="append">张</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="面值" prop="value">
                    <el-col :span="7">
                        <el-input placeholder="请输入面值金额" v-model="tableData.value">
                          <template slot="append">元</template>
                        </el-input>
                    </el-col>
                    <!-- <el-col :span="5"><el-checkbox v-model="checked">随机</el-checkbox></el-col> -->
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="有效期" prop="expire_type">
                    <el-col :span="24">
                        <el-radio-group v-model="tableData.expire_type">
                            <el-radio :label="1">按时长</el-radio>
                            <el-radio :label="2">按区间</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="有效时长" v-if="tableData.expire_type == 1" prop="days">
                    <el-col :span="7">
                        <el-input placeholder="请输入有效时长" v-model="tableData.days">
                        <template slot="append">天</template>
                        </el-input>
                    </el-col>

                </el-form-item>
                <div class="clear"></div>
                <el-col :span="7">
                  <el-form-item label="开始时间" prop="use_start_time" v-if="tableData.expire_type == 2">
                      <el-date-picker
                            v-model="tableData.use_start_time"
                            type="date"
                            placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="结束时间" prop="use_end_time" v-if="tableData.expire_type == 2">
                      <el-date-picker
                            v-model="tableData.use_end_time"
                            type="date"
                            placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <div class="clear"></div>
                <div class="clear"></div>
                <el-form-item label="使用条件" prop="use_condition">
                    <span class="fl mr5">满</span>
                    <el-col :span="4" class="mr5">
                        <el-input placeholder="请输入金额" v-model="tableData.use_condition"></el-input>
                    </el-col>
                    <span class="fl">可用</span>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="使用产品" prop="use_type">
                    <el-col :span="24">
                        <el-radio-group v-model="tableData.use_type">
                            <el-radio :label="1">全部通用</el-radio>
                            <el-radio :label="2">旅行产品通用</el-radio>
                            <el-radio :label="3">票务产品通用</el-radio>
                            <el-radio :label="4">指定产品</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="可用产品" v-if="tableData.use_type==4" prop="use_goods">
                  <el-col :span="15">
                    <el-table border style="width: 100%" align='center' max-height="250" :data="tableData.use_goods">
                        <el-table-column
                            prop="data"
                            label="产品"
                            align="left"
                            width="auto">
                            <template slot-scope="scope">
                                <h3>{{scope.row.name}}</h3>
                                <p>{{scope.row.type_name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                                 <el-button
                                    size="mini"
                                    type="danger"
                                    plain
                                    icon="el-icon-delete"
                                    @click="handleDelete2(scope.$index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button size="mini" @click="openPop(2)">增加单品</el-button>
                  </el-col>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="使用说明" prop="desc">
                    <el-col :span="14">
                        <el-input type="textarea" placeholder="请输入使用说明" v-model="tableData.desc"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="14">
                        <el-button type="primary" @click="submi('tableData')">提交</el-button>
                        <el-button @click="$router.push('/admin/adminBox/platform/')">返回</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-row>
        <el-dialog title="产品选择" :visible.sync="dialogTableVisible">
          <el-form :inline="true" :model='selectData' class="demo-form-inline" style="margin-top:-20px">
              <el-form-item>
                  <el-select v-model="selectData.type" placeholder="全部类别">
                      <el-option
                        v-for="item in categorys"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-input placeholder="请输入关键字" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"
                  ></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click='onSelectData'>查询</el-button>
              </el-form-item>
          </el-form>
          <el-table :data="productData.goods" style="margin-top:-10px" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column property="name" label="产品名称"></el-table-column>
            <el-table-column property="type_name" label="产品类别" align="center"></el-table-column>
            <el-table-column property="price" label="价格" align="center">
              <template slot-scope="scope">
                {{scope.row.price}} {{scope.row.countrys_name}}
              </template>
            </el-table-column>
          </el-table>
          <!--翻页-->
          <el-pagination
            class="mt10"
            @current-change="handleCurrentChange"
            :current-page="selectData.page"
            background
            :page-size="8"
            layout="prev, pager, next, jumper"
            :total="productData.total">
          </el-pagination>
          <div slot="footer" class="dialog-footer" style="margin-top:-40px">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="selectSub()">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import EditJs from './Edit.js';
export default EditJs;
</script>
<style >
      .bannerImg .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 400px;
        height: 224px;
        line-height: 224px;
        text-align: center;
      }
      .bannerImg .avatar {
        width: 400px;
        height: 224px;
        display: block;
      }
      .bannerImg .el-upload{width: 400px;height: 224px;}
      .bannerImg .el-upload--picture-card{border: none;}
</style>
