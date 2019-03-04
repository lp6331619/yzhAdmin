<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.country_id" placeholder="全部国家">
                    <el-option
                      v-for="item in countryArry"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入关键字" v-model='selectData.keyword' @keyup.native.enter="onSelectData()"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="cityArry.citys" border style="width: 100%" align='center'>
            <el-table-column
                prop="name_cn"
                label="城市"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="name_en"
                label="城市代码"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="country"
                label="国家"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="countryCode"
                label="国家代码"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
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
              :total="cityArry.total">
            </el-pagination>
        </div>
        <!--弹框-->
        <el-dialog size="mini" title="修改/添加城市" width="500px" :visible.sync="dialogFormVisible">
          <el-form 
            :rules="formRules"
            label-width="120px"
            ref='formData'
            :model="formData">
            <el-form-item label="国家" prop="country_id">
                <el-select v-model="formData.country_id" placeholder="全部国家">
                    <el-option
                      v-for="item in countryArry"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="name_cn">
                <el-input v-model="formData.name_cn" ></el-input>
            </el-form-item>
            <el-form-item label="城市代码" prop="name_en">
                <el-input v-model="formData.name_en" ></el-input>
            </el-form-item>
           <!--  <el-form-item label="对人民币汇率" prop="rate">
                <el-input v-model="formData.rate" @keyup.native.enter="CityReset('formData')"></el-input>
            </el-form-item> -->
            <el-form-item label="所属交通种类" >
                <el-checkbox v-model="formData.is_train">火车</el-checkbox>
                <el-checkbox v-model="formData.is_boat">轮船</el-checkbox>
                <el-checkbox v-model="formData.is_bus">汽车</el-checkbox>
            </el-form-item>
          </el-form>    
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="CityReset('formData')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    import ListJs from './List.js';
    export default ListJs;
</script>
<style scoped lang='less'>
   
</style>
