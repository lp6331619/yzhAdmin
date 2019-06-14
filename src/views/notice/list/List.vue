<template>
    <div class="list">
        <div class="noticeTop">
            <img :src="notice" alt>
            <p class="title">{{childData.title}}</p>
            <div v-html="childData.content" class="mt10"></div>
        </div>
        <el-table
            v-loading="loading"
            element-loading-text="拼命加载中！"
            :data="tableData.list"
            border
            style="width: 100%"
            align="center"
        >
            <el-table-column prop="title" label="公告标题" align="left" width="auto">
                <template slot-scope="scope">
                    <div v-if="scope.row.is_read==2" class="badge">
                        <el-badge value="new" class="item">{{scope.row.title}}</el-badge>
                    </div>
                    <span v-else>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="发布时间"
                :formatter="timeFormat"
                align="center"
                width="200"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="140" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" plain @click="handleEdit(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--翻页-->
        <div class="pageBox" v-show="pageShow">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="selectData.p"
                background
                :page-size="20"
                layout="prev, pager, next, jumper"
                :total="tableData.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped lang="less">
.noticeTop {
    position: relative;
    padding: 20px 20px 20px 140px;
    min-height: 140px;
    border: 1px solid #ff8762;
    margin-bottom: 20px;
    img {
        position: absolute;
        left: 20px;
        top: 20px;
    }
}
</style>
