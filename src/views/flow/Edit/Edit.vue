<template>
    <div class="list">
        <div class="titleBox">新增修改任务</div>
        <div class="p20">
            <el-form ref="form" class="form" :rules="rulesBox" :model="form" label-width="140px">
                <el-row :gutter="20">
                    <div class="tip mt0">
                        <p>基础信息</p>
                    </div>
                    <el-col :span="12">
                        <el-form-item label="任务名称" prop="title">
                            <el-input v-model="form.title" placeholder="任务名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="imgBoxRelative">
                        <el-form-item label="商品主图" prop="product_pic1">
                            <el-upload
                                class="avatar-uploader"
                                :action="`${url}/Public/upload_img`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="form.url2" :src="form.url2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col class="clear" :span="8">
                        <el-form-item label="我的店铺" prop="sid">
                            <el-select v-model="form.sid" placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in shopBox"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.type"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="clear" :span="12">
                        <el-form-item label="商品标题" prop="product_name">
                            <el-input v-model="form.product_name" placeholder="商品标题"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col class="clear" :span="12">
                        <el-form-item label="商品链接" prop="product_url">
                            <el-input v-model="form.product_url" placeholder="商品链接"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="clear" :span="5">
                        <el-form-item label="商品搜索价" prop="product_search_price">
                            <el-input
                                type="number"
                                style="min-width:100px"
                                v-model="form.product_search_price"
                                placeholder="搜索价"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col class="clear" :span="8">
                        <el-form-item label="付款人数约" prop="pay_person_num">
                            <el-input
                                type="number"
                                v-model="form.pay_person_num"
                                placeholder="付款人数约"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商品所在地" prop="product_address">
                            <el-input v-model="form.product_address" placeholder="商品所在地"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col class="clear" :span="8">
                        <el-form-item label="排序方式" prop="order_type">
                            <el-radio-group v-model="form.order_type" style="min-width:190px">
                                <el-radio label="1">综合</el-radio>
                                <el-radio label="2">销量</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col class :span="4">
                        <el-form-item label="价格区间" prop="start_price">
                            <el-input
                                style="min-width:100px"
                                type="number"
                                v-model="form.start_price"
                                placeholder="开始价格"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class :span="1">
                        <div style="margin-left:15px">--</div>
                    </el-col>
                    <el-col class :span="2">
                        <el-form-item prop="end_price" label-width="0">
                            <el-input
                                style="min-width:100px"
                                type="number"
                                v-model="form.end_price"
                                placeholder="结束价格"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class :span="8">
                        <small>如果商品不好找，强烈建议添加价格区间、商品所在地方便用户找到你的商品</small>
                    </el-col>
                    <div class="tip mt0 clear">
                        <p>
                            附加商品
                            <el-button
                                type="danger"
                                class="ml20"
                                size="mini"
                                plain
                                :disabled="form.attgoods.length == 5"
                                @click="addAdditional()"
                            >+增加</el-button>
                        </p>
                    </div>
                    <div class="Additional" v-for="(item,index) in form.attgoods" :key="index">
                        <el-button
                            type="danger"
                            class="delItem"
                            icon="el-icon-delete"
                            circle
                            @click="delItem(index)"
                        ></el-button>
                        <el-row :gutter="20" style="padding:0 100px 0 240px">
                            <el-col :span="6" class="AdditionalPic">
                                <el-form-item
                                    label="商品主图"
                                    :prop="'attgoods.' + index + '.product_pic'"
                                    :rules="{
										required: true, message: '不能为空!', trigger: 'blur'
									}"
                                >
                                    <div @click="uploadMat(index)">
                                        <el-upload
                                            class="avatar-uploader"
                                            :action="`${url}/Public/upload_img`"
                                            :show-file-list="false"
                                            :on-success="product_picSuccess"
                                            :before-upload="beforeAvatarUpload"
                                        >
                                            <img
                                                v-if="item.product_pic2"
                                                :src="item.product_pic2"
                                                class="avatar"
                                            >
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item
                                    label="商品链接"
                                    :prop="'attgoods.' + index + '.product_url'"
                                    :rules="[{
										required: true, message: '不能为空!', trigger: 'blur'
									},{
										pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/, message: '不能为空!', trigger: 'blur'
									}]"
                                >
                                    <el-input
                                        type="text"
                                        v-model="item.product_url"
                                        placeholder="商品链接"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>&nbsp;</el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="tip mt0 clear">
                        <p>搜索路径</p>
                    </div>
                    <el-col :span="24">
                        <el-row :gutter="20" style="padding-left:140px">
                            <el-col :span="12">关键词</el-col>
                            <el-col :span="6">单数</el-col>
                            <el-col :span="6">
                                <el-button
                                    type="primary"
                                    class="ml20"
                                    size="mini"
                                    plain
                                    @click="addSearch()"
                                >+增加</el-button>
                                <small>最多10条</small>
                            </el-col>
                            <div class="mt20">&nbsp;</div>
                            <div class="clearfix" v-for="(item, index) in form.search" :key="index">
                                <el-col :span="12">
                                    <el-form-item
                                        label-width="0"
                                        :prop="'search.' + index + '.keyword'"
                                        :rules="{
													required: true, message: '不能为空!', trigger: 'blur'
												}"
                                    >
                                        <el-input v-model="item.keyword"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item
                                        label-width="0"
                                        :prop="'search.' + index + '.num'"
                                        :rules="{
													required: true, message: '不能为空!', trigger: 'blur'
												}"
                                    >
                                        <el-input v-model="item.num"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-button
                                        type="danger"
                                        :disabled="form.search.length<=1"
                                        class="ml20"
                                        @click="del(index)"
                                    >删除</el-button>
                                </el-col>
                            </div>
                        </el-row>
                    </el-col>
                    <div class="tip mt0 clear">
                        <p>发布时间设置</p>
                    </div>
                    <el-col class="clear" :span="8">
                        <el-form-item label="发布规则" prop="release_type">
                            <el-radio-group v-model="form.release_type" style="min-width:190px">
                                <el-radio label="1">急速发布</el-radio>
                                <el-radio label="2">平均发布</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="任务加赏(元)" prop="reward_money">
                            <el-input type="number" v-model="form.reward_money" placeholder="任务加赏"></el-input>
                            <small>(填0表示不加赏，加赏元额越高，越优先展示给用户)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.release_type == '2'">
                        <el-form-item label="开始时间" prop="release_start_time">
                            <el-date-picker
                                v-model="form.release_start_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.release_type == '2'">
                        <el-form-item label="结束时间" prop="release_end_time">
                            <el-date-picker
                                v-model="form.release_end_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.release_type == '2'">
                        <el-form-item label="是否到点取消" prop="is_time_out_cancel">
                            <el-radio-group v-model="form.is_time_out_cancel">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" v-if="form.type == '2'">
                        <el-form-item label="指定买手下单时间" prop="limit_buy_time">
                            <el-radio-group v-model="form.limit_buy_time">
                                <el-radio label="1">
                                    隔一天
                                    <small
                                        class="red"
                                    >({{getCostPrice.cur_limit_buy_time_1}} 元 /单)</small>
                                </el-radio>
                                <el-radio label="2">
                                    隔二天
                                    <small
                                        class="red"
                                    >({{getCostPrice.cur_limit_buy_time_2}} 元 /单)</small>
                                </el-radio>
                                <el-radio label="3">
                                    隔三天
                                    <small
                                        class="red"
                                    >({{getCostPrice.cur_limit_buy_time_3}} 元 /单)</small>
                                </el-radio>
                                <el-radio label="4">
                                    隔四天
                                    <small
                                        class="red"
                                    >({{getCostPrice.cur_limit_buy_time_4}} 元 /单)</small>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!--  -->
                    <div class="tip mt0 clear">
                        <p>商品留言</p>
                    </div>

                    <el-col class="clear" :span="16">
                        <el-form-item label="特殊需求" prop="other_ask">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 5}"
                                v-model="form.other_ask"
                                placeholder="重要！如果对用户有特别的要求，请在特殊需求里注明，用户在做任务时会看到，最多不能超过300字(特殊需求只是商家要求，我们只能做到传达给用户但不会强制用户按要求执行)"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="商品留言" prop="order_message">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 5}"
                                v-model="form.order_message"
                                placeholder="商品留言"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <div class="tip mt0 clear">
                        <p>千人千面增值服务</p>
                    </div>
                    <el-col :span="16">
                        <el-form-item label="区域限制">
                            <el-select
                                class="xz"
                                v-model="form.remove_area"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择区域限制"
                            >
                                <el-option
                                    v-for="item in Province"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                            <small class="red">(注意:限制不可接地区) ({{getCostPrice.limit_area}} 元 /单)</small>
                        </el-form-item>
                    </el-col>

                    <el-col :span="16">
                        <el-form-item label="年龄阶段">
                            <el-checkbox-group v-model="form.age">
                                <el-checkbox
                                    :label="index"
                                    :value="item.type"
                                    v-for="(item,index) in getAgeStages"
                                    :key="index"
                                >{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                            <small class="red">({{getCostPrice.limit_age}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="0">不限</el-radio>
                                <el-radio label="1">男</el-radio>
                                <el-radio label="2">女</el-radio>
                            </el-radio-group>
                            <small class="red ml20">({{getCostPrice.limit_sex}} 元 /单)</small>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="信用等级" prop="credit_level">
                            <el-select v-model="form.credit_level" placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in getCreditLevels"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.type"
                                ></el-option>
                            </el-select>
                            <small class="red ml20">({{getCostPrice.credit_zuanshi}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16" class="clear">
                        <el-form-item label="手机机型限制" prop="phone_type">
                            <el-radio-group v-model="form.phone_type">
                                <el-radio label="0">不限</el-radio>
                                <el-radio label="1">Android</el-radio>
                                <el-radio label="2">ios</el-radio>
                            </el-radio-group>
                            <small class="red ml20">({{getCostPrice.phone_type}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="高优质买号" prop="grade_buyer">
                            <el-radio-group v-model="form.grade_buyer">
                                <el-radio label="1">需要</el-radio>
                                <el-radio label="2">不需要</el-radio>
                            </el-radio-group>
                            <small class="red ml20">({{getCostPrice.grade_buyer}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需要加购物车" prop="is_add_shopping_cart">
                            <el-radio-group v-model="form.is_add_shopping_cart">
                                <el-radio label="0">不需要</el-radio>
                                <el-radio label="1">需要</el-radio>
                            </el-radio-group>
                            <small class="red">({{getCostPrice.cur_add_shopping_car}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需要关注店铺" prop="is_save_shop">
                            <el-radio-group v-model="form.is_save_shop">
                                <el-radio label="0">不需要</el-radio>
                                <el-radio label="1">需要</el-radio>
                            </el-radio-group>
                            <small class="red">({{getCostPrice.cur_save_shop}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需要收藏宝贝 " prop="is_save_product">
                            <el-radio-group v-model="form.is_save_product">
                                <el-radio label="0">不需要</el-radio>
                                <el-radio label="1">需要</el-radio>
                            </el-radio-group>
                            <small class="red">({{getCostPrice.cur_save_product}} 元 /单)</small>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="button">
                <el-button type="warning" v-if="!status" @click="submit('form')">提交核对价钱</el-button>
            </div>
        </div>
        <el-dialog title="确认任务" :visible.sync="status" center :lock-scroll="false">
            <div class="tableBox">
                <table class align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>项目</th>
                        <th>收费</th>
                        <th>小计</th>
                    </tr>
                    <tr>
                        <td class="b3" rowspan="3">本元</td>
                        <td>项目本元</td>
                        <td class="b3">{{calculate.price*calculate.product_num}}</td>
                        <td rowspan="3">{{calculate.unit_capital_cost}}</td>
                    </tr>
                    <tr>
                        <td>返款手续费</td>
                        <td class="b3">{{calculate.serve}}</td>
                    </tr>
                    <tr>
                        <td>快递费用</td>
                        <td class="b3">{{calculate.express}}</td>
                    </tr>
                    <tr>
                        <td rowspan="10" class="b3">佣元</td>
                        <td>佣元费用</td>
                        <td class="b3">{{calculate.cur_commision}}</td>
                        <td rowspan="10">{{calculate.unit_commision_cost}}</td>
                    </tr>
                    <tr>
                        <td>加赏费用</td>
                        <td class="b3">{{calculate.reward}}</td>
                    </tr>
                    <tr>
                        <td>地区限制</td>
                        <td class="b3">{{calculate.limit_area}}</td>
                    </tr>
                    <tr>
                        <td>年龄限制</td>
                        <td class="b3">{{calculate.limit_age}}</td>
                    </tr>
                    <tr>
                        <td>性别限制</td>
                        <td class="b3">{{calculate.limit_sex}}</td>
                    </tr>
                    <tr>
                        <td>信用等级限制</td>
                        <td class="b3">{{calculate.limit_credit}}</td>
                    </tr>
                    <tr>
                        <td>花呗号</td>
                        <td class="b3">{{calculate.huabei}}</td>
                    </tr>
                    <tr>
                        <td>高优质买号</td>
                        <td class="b3">{{calculate.grade_buyer}}</td>
                    </tr>
                    <tr>
                        <td>手机机型限制</td>
                        <td class="b3">{{calculate.phone_type}}</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            单数：
                            <span class="red">{{calculate.num}}</span>
                            总本元：
                            <span
                                class="red"
                            >{{calculate.total_capital_cost}}</span>
                            总佣元：
                            <span
                                class="red"
                            >{{calculate.total_commision_cost}}</span>
                            总价：
                            <span
                                class="red"
                            >{{calculate.total_cost}}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" @click="submit2('form')">确认提交任务</el-button>
                <el-button @click="status=false">上一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import EditJs from "./Edit.js";
export default EditJs;
</script>
<style scoped lang="less">
.avatar {
    width: 240px;
    height: 240px;
}
.avatar-uploader-icon {
    width: 240px;
    height: 240px;
    line-height: 240px;
}
.form {
    small {
        color: #999;
        display: inline-block;
        line-height: 18px;
    }
}

.button {
    text-align: center;
    margin-top: 40px;
    border-top: 1px solid #eee;
    padding: 40px 0 20px;
}
.title {
    clear: both;
    line-height: 40px;
}
.clear {
    clear: both;
}
.xz {
    width: 100%;
}
.imgBoxRelative {
    position: absolute;
    left: 60%;
    top: 80px;
}
.tableBox {
    max-height: 300px;
    overflow-y: auto;
    table {
        text-align: center;
        border: 1px solid #eee;
        border-width: 1px 1px 0 0;
        width: 100%;

        color: #666;
        th,
        .b3 {
            background: #f4f7fe;
        }

        td,
        th {
            border: 1px solid #eee;
            border-width: 0 0 1px 1px;
            padding: 10px 20px;
        }
    }
}
.Additional {
    position: relative;
    border-bottom: 1px dashed #eee;
    padding-top: 20px;
    .delItem {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -20px;
        z-index: 10;
    }
    &:first-child {
        border: none;
    }
    .AdditionalPic {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
    }
    .avatar-uploader-icon,
    .avatar {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
}
</style>
