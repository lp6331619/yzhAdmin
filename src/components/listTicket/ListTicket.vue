<template>
    <div class="list">
        <el-form :inline="true" :model='selectData' class="demo-form-inline">
            <el-form-item>
                <el-select v-model="selectData.departure" placeholder="出发站">
                  <el-option
                    v-for="(item,index) in stationBox"
                    :key="index"
                    :label="item.name_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.arrival" placeholder="到达站">
                  <el-option
                    v-for="(item,index) in stationBox"
                    :key="index"
                    :label="item.name_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="selectData.is_online" placeholder="状态">
                    <el-option
                      v-for="(item,index) in is_online"
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
        <el-table :data="tableData.goods" border style="width: 100%" align='center'>
            <el-table-column
                prop="departure"
                label="出发站"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="arrival"
                label="到达站"
                align="center"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="name"
                label="产品来源"
                align="center"
                width="130"
                :sortable="true">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                align="center"
                width="130"
                :sortable="true">
                <template slot-scope="scope">
                  {{scope.row.price}}{{scope.row.countrys_name}}
                </template>
            </el-table-column>
            <el-table-column
                prop="is_online"
                label="状态"
                align="center"
                width="130"
                :sortable="true"
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
                          @click="handleEdit(scope.row.id)">
                          编辑</el-button>
                        <el-button
                          size="mini"
                          @click="handleBeing(scope.row)">
                          {{scope.row.is_online==1?'下架':'上架'}}
                        </el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          plain
                          @click="handleDel(scope.row,scope.$index)">
                          删除</el-button>
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
    import ListTicketJs from './ListTicket.js';
    export default ListTicketJs;
</script>
<style scoped lang='less'>

</style>
