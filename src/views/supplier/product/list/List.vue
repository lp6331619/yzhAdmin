<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">   
            <el-form-item class="w100">
                <el-select v-model="selectData.sid" placeholder="全部供应商" filterable>
                    <el-option
                      v-for="item in supplier"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="w100">
                <el-select @change="countryChange" v-model="selectData.country_id" placeholder="全部国家">
                    <el-option
                      v-for="item in country"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="w100">
                <el-select v-model="selectData.city_id" placeholder="全部城市">
                    <el-option
                      v-for="item in city"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="w100">
                <el-select @change="countryType" v-model="selectData.type" placeholder="全部类别">
                    <el-option
                      v-for="item in categorys"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="w100">
                <el-select v-model="selectData.sub_type" placeholder="全部分类">
                    <el-option
                      v-for="(item,index,value) in categorysChild"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="w100">
                <el-input placeholder="请输入登录账号" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.goods" border style="width: 100%" align='center'>
            <el-table-column
                prop="goods_name"
                label="名称"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="supplier_name"
                label="所属供应商"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="country_name"
                label="所属国家"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="city_name"
                label="所属城市"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="类别"
                align="center"
                width="100"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="sub_type_name"
                label="分类"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="160"
                align="center">
                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      v-if="scope.row.status==2"
                      size="mini"
                      type="danger"
                      plain
                      @click="handleAudit(scope.row.id)">下架</el-button>
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
import ListJs from './List.js';
export default ListJs;
</script>
<style scoped lang="less">
  .w100{width:13%;}
</style>
