<template>
    <div class="list">
         <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.country_id" placeholder="全部国家">
                    <el-option
                      v-for="(item,index) in country"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.is_online" placeholder="全部状态">
                    <el-option
                      v-for="item in auth_status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入登录账号" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" @click='addList()'>+ 新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.goods" border style="width: 100%" align='center'>
            <el-table-column
                prop="img"
                label="图片"
                align="center"
                width="70">
                <template slot-scope="scope">
                  <a href="javascript:;" @click="Preview(scope.row)">
                    <img  style="width:40px;height:40px;" :src="scope.row.img" alt="">
                  </a>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="产品名称"
                align="center"
                width="auto">
                <template slot-scope="scope">
                  <a href="javascript:;" class="blue" @click="Preview(scope.row)">
                    {{scope.row.name}}
                  </a>
                </template>
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格(元)"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="类别"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="country_name"
                label="所属国家"
                align="center"
                width="140"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="is_online"
                label="状态"
                align="center"
                :sortable="true"
                width="130">
                <template slot-scope="scope">
                    {{scope.row.is_online==0? '下架' : '上架'}}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200"
                align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          plain
                          @click="handleBeing(scope.row)">
                          {{scope.row.is_online==1?'下架':'上架'}}
                        </el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          plain
                          @click="del(scope.row)">
                          删除
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <!--翻页-->
        <div class="pageBox" v-show="pageShow">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="selectData.page"
              background
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ListDataJs from './ListData.js';
export default ListDataJs;
</script>
<style scoped>

</style>
