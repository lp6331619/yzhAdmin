<template>
    <div class="pageCpLogin" :style="backgroundImage">
        <div class="panelCont">
            <div class="leftPanel">
                <div class="inner">
                    <div class="login-logo">青游堂旅行</div>
                    <div class="btm">
                        The backstage management system<br>
                        后台管理系统
                    </div>
                </div>
            </div>
            <div class="rightPanel">
                <div class="userForm">
                    <div class="loginheader">后台登录</div>
                    <el-form
                            label-width="0px"
                            class="clearfix"
                            v-loading="loading"
                            element-loading-text='正在登录'
                            :model='loginData'
                            :rules="rule_data"
                            ref='loginData'>
                        <el-form-item
                                class="formRow"
                                prop='username'>
                                <i class="iconfont icon-zhanghao"></i>
                                <el-input
                                    type="text"
                                    class="form-control"
                                    placeholder="登录账号"
                                    v-model='loginData.username'>
                                </el-input>
                        </el-form-item>
                        <el-form-item
                                class="formRow"
                                prop='password'>
                                <i class="iconfont icon-mima"></i>
                                <el-input
                                    type="password"
                                    class="form-control"
                                    placeholder="登录密码"
                                    @keyup.native.enter="onLogin('loginData')"
                                    v-model='loginData.password'>
                                </el-input>
                        </el-form-item>
                        <el-form-item
                                class="btnWrap">
                                <el-button type="success" @click="onLogin('loginData')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import LoginJs from './Login.js';
	export default LoginJs;
</script>

<style lang='less'>
    @import url(Login.less);
</style>
