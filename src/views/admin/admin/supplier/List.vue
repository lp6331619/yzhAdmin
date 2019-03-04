<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select @change="countryChange" v-model="selectData.country_id" placeholder="所属国家">
                    <el-option
                      v-for="item in country"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.city_id" placeholder="所属地区">
                    <el-option
                      v-for="item in city"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.role" placeholder="所属角色">
                    <el-option
                      v-for="item in role"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.status" placeholder="所属状态">
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
          <!--   <el-form-item class="fr">
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/admin/adminBox/ticket/ticketEdit')">新增</el-button>
            </el-form-item> -->
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.admins" border style="width: 100%" align='center'>
            <el-table-column
                prop="email"
                label="登录邮箱"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="realname"
                label="真实姓名"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="countryName"
                label="国家"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="cityName"
                label="城市"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="sidName"
                label="所属供应商"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="role_name"
                label="角色"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align="center"
                :formatter="formatterStatus"
                width="130">
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
