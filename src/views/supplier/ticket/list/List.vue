<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select @change="countryChange" v-model="selectData.country_id" placeholder="全部国家">
                    <el-option
                      v-for="item in country"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.city_id" placeholder="全部城市">
                    <el-option
                      v-for="item in city"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.type" placeholder="全部状态">
                    <el-option
                      v-for="item in stateArry"
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
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/supplier/ticket/edit')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.shops" border style="width: 100%" align='center'>
            <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="类型"
                align="center"
                :formatter="formatterType"
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
                prop="contact"
                label="负责人"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="tel"
                label="联系电话"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详细地址"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="140"
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
                          type="danger"
                          plain
                          @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
import ListJs from './List.js';
export default ListJs;
</script>
<style scoped>
    
</style>
