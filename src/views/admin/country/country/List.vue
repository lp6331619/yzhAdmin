<template>
    <div class="list">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item class="fr">
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/admin/country/countryEdit')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" class="mt10" :data="tableData" border style="width: 100%" align='center'>
            <el-table-column
                prop="name"
                label="国家"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="abbr"
                label="国家代码"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="name2"
                label="英文名称"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="currency"
                label="货币单位"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="lang"
                label="语言"
                align="center"
                width="130">
            </el-table-column>
            <el-table-column
                prop="rate"
                label="汇率"
                align="center">
            </el-table-column>
            <el-table-column
                prop="profit"
                label="利润率"
                align="center">
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
                width="160"
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
                          @click="handleBeing(scope.row,scope.$index)">{{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import ListJs from './List.js';
    export default ListJs;
</script>
<style scoped lang='less'>
   
</style>
