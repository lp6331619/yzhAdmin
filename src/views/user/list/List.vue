<template>
    <div class="list">
        <div class="tip">
            <p>个人信息</p>
        </div>
        <el-row :gutter="20">
            <el-col :span="6">
                用户ID：{{user_info.phone}}
                <el-button
                    class="ml5"
                    type="warning"
                    size="mini"
                    @click="passwordStatus=true"
                    plain
                >修改密码</el-button>
            </el-col>
            <el-col :span="6">
                手机号：{{user_info.phone}}
                <!-- <el-button class="ml5" type="warning" size="mini" plain @click="editPhone()">换绑手机</el-button> -->
            </el-col>
            <el-col :span="6">
                QQ：{{user_info.qq}}
                <el-button class="ml5" type="warning" size="mini" plain @click="editQQ()">修改</el-button>
            </el-col>
            <el-col :span="6">
                Email：{{user_info.email}}
                <el-button class="ml5" type="warning" size="mini" plain @click="editEmail()">修改</el-button>
            </el-col>
        </el-row>
        <div class="tip">
            <p>绑定店铺</p>
        </div>
        <div class="tit">
            <el-button type="warning" class="fr" @click="$router.push('/user/edit')">+绑定店铺</el-button>店铺绑定 +增加绑定店铺 温馨提示：店铺请填写自己店铺首页地址，不可绑定其它卖家的地址，否则会被惩罚
            <br>店铺审核通过后如需修改信息请联系客服!
        </div>
        <el-table
            v-loading="loading"
            element-loading-text="拼命加载中！"
            :data="tableData.list"
            border
            style="width: 100%"
            align="center"
        >
            <el-table-column prop="name" label="店铺名称" align="center" width="auto">
                <template slot-scope="scope">
                    <a :href="scope.row.url" target="_blank" class="blue">
                        <svg class="icon" aria-hidden="true">
                            <use v-if="scope.row.type == '1'" xlink:href="#icon-taobao"></use>
                            <use v-if="scope.row.type == '2'" xlink:href="#icon-pinduoduo"></use>
                            <use v-if="scope.row.type == '3'" xlink:href="#icon-jingdong-"></use>
                            <use v-if="scope.row.type == '4'" xlink:href="#icon-tianmaoxingxiang1"></use>
                        </svg>
                        <br>
                        {{scope.row.name}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="wangwang" label="掌柜名称" align="center" width="auto"></el-table-column>
            <el-table-column prop="user_name" label="发货人" align="center" width="auto"></el-table-column>
            <el-table-column prop="address" label="发货地址" align="center" width="auto">
                <template slot-scope="scope">
                    {{scope.row.province_name}}-{{scope.row.city_name}}-{{scope.row.area_name}}
                    <p>{{scope.row.address}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="interval_day" label="接单间隔" align="center" width="100">
                <template slot-scope="scope">
                    {{scope.row.interval_day}}
                    <el-button size="mini" type="warning" plain @click="setInterval(scope.row)">设置</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                :formatter="statusFormat"
                align="center"
                width="200"
            ></el-table-column>
            <el-table-column prop="verify_info" label="审核意见" align="center" width="200"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="warning"
                        plain
                        @click="$router.push(`/user/edit?id=${scope.row.id}`)"
                    >查看</el-button>
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
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="passwordStatus" width="400px">
            <el-form
                :model="passwordForm"
                v-loading="loading"
                element-loading-text="正在提交！"
                :rules="rule_password"
                ref="passwordForm"
                label-width="80px"
            >
                <el-form-item label="旧密码" prop="old_password">
                    <el-input v-model="passwordForm.old_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="passwordForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password_check">
                    <el-input
                        v-model="passwordForm.password_check"
                        @keyup.native="passwordSub('passwordForm')"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="passwordStatus = false">取 消</el-button>
                <el-button type="warning" @click="passwordSub('passwordForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ListJs from "./List.js";
export default ListJs;
</script>
<style scoped lang="less">
.icon {
    width: 30px;
    height: 30px;
}
.tit {
    line-height: 24px;
    padding-bottom: 20px;
    color: #999;
    font-size: 14px;
}
</style>
