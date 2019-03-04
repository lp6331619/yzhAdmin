<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.sid" placeholder="所属供应商">
                    <el-option
                      v-for="item in supplier"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.status" placeholder="全部状态">
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
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/admin/adminBox/ticketEdit')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData.admins" border style="width: 100%" align='center'>
            <el-table-column
                prop="email"
                label="登录账号"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="realname"
                label="真实姓名"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="sidName"
                label="所属供应商"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="last_login"
                label="最近登录"
                align="center"
                width="180"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align="center"
                :formatter="formatterStatus"
                width="130">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="300"
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
                          @click="handlePassword(scope.row)">重置密码</el-button>
                        <el-button
                          size="mini"
                          @click="handleBeing(scope.row,scope.$index)">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
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

        <!--弹框-->
        <el-dialog size="mini" title="重置密码" width="500px" :visible.sync="dialogFormVisible">
          <el-form 
            :rules="formRules"
            ref='formData'
            :model="formData">
            <el-form-item label="新密码" prop="new_pwd">
                <el-input v-model="formData.new_pwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_pwd">
                <el-input v-model="formData.confirm_pwd" @keyup.native.enter="passwordReset('formData')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="passwordReset('formData')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import ListJs from './List.js';
export default ListJs;
</script>
<style scoped>
    
</style>
