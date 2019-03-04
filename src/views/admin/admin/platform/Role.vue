<template>
    <div class="list">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item class="fr">
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/admin/adminBox/roleEdit')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" element-loading-text="拼命加载中！" :data="tableData" border style="width: 100%" align='center'>
            <el-table-column
                prop="title"
                label="角色名称"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="content"
                label="描述"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="90"
                align="center">
                <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'list',
    created: function () {
        this.getList()
    },
    data() {
        return {
            loading:false,
            tableData: [],
            // selectData:{//搜索条件
            //     keyword:this.$route.query.keyword
            // },
        }
    },
    methods: {
        getList(){//获取列表数据
            this.loading=true;
            this.$$api_admin_auth_groups({
                data     : {},
                fn       : data => {
                    this.loading=false;
                    this.tableData=data
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                    this.loading=false;
                },
                tokenFlag: true
            });
        },
        handleEdit(item){//编辑
            this.$router.push(`/admin/adminBox/roleEdit?id=${item.id}`)
        },
    },
}
</script>
<style scoped>
    
</style>
