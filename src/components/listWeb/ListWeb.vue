<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.status" placeholder="状态">
                    <el-option
                      v-for="(item,index) in status"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='onSelectData'>查询</el-button>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" @click="handleAdd()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.stations" border style="width: 100%" align='center'>
            <el-table-column
                prop="name_cn"
                label="站点名称"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="name_en"
                label="站点代码"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="country_name"
                label="国家"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="country_code"
                label="国家代码"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="city_name_cn"
                label="城市"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="city_name_en"
                label="城市代码"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align="center"
                width="130"
                :formatter="formattermodeStatus">
            </el-table-column>
            <el-table-column
                label="操作"
                width="190"
                align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">
                          编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          plain
                          @click="handleBeing(scope.row)">
                          {{scope.row.status==1?'停用':'启用'}}
                        </el-button>
                        <!-- <el-button
                          size="mini"
                          type="danger"
                          plain
                          @click="handleDel(scope.row,scope.$index)">
                          删除</el-button> -->
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
        <el-dialog size="mini" title="编辑/新增站点" width="500px" :visible.sync="dialogFormVisible">
          <el-form 
            label-width="100px"
            :rules="formRules"
            ref='formData'
            :model="formData">
            <el-form-item label="站点名称" prop="name_cn">
                <el-input v-model="formData.name_cn"></el-input>
            </el-form-item>
            <el-form-item label="站点代码" prop="name_en">
                <el-input v-model="formData.name_en"></el-input>
            </el-form-item>
            <el-form-item label="经度" >
                <el-input v-model="formData.lng" placeholder="请输入经度"></el-input>
            </el-form-item>
            <el-form-item label="纬度" >
                <el-input v-model="formData.lat" placeholder="请输入纬度"></el-input>
            </el-form-item>
            <el-form-item label="所属国家" prop="country_id" >
                <el-select v-model="formData.country_id" @change="countySelect" placeholder="请选择所属国家">
                    <el-option
                      v-for="(item,index) in countrys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城市" prop="city_id">
                <el-select v-model="formData.city_id" placeholder="请选择所属城市">
                    <el-option
                      v-for="(item,index) in cityData"
                      :key="index"
                      :label="item.name_cn"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit('formData')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    import ListWebJs from './ListWeb.js';
    export default ListWebJs;
</script>
<style scoped lang='less'>

</style>
