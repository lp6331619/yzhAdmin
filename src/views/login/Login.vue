<template>
    <div class="pageCpLogin" :style="backgroundImage">
        <div class="panelCont">
            <div class="leftPanel">
                <div class="inner">
                    <div class="login-logo">柚子汇</div>
                    <div class="btm">
                        The backstage management system<br>
                        柚子汇管理系统
                    </div>
                </div>
            </div>
            <div class="rightPanel">
                <div v-if="status===1" class="userForm">
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
                                prop='phone'>
                                <i class="iconfont icon-zhanghao"></i>
                                <el-input
                                    type="text"
                                    class="form-control"
                                    placeholder="电话号码"
                                    v-model='loginData.phone'>
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
                                    v-model='loginData.password'>
                                </el-input>
                        </el-form-item>
                        <el-form-item
                                class="formRow"
                                prop='verify_code'>
                                <!-- <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xxx"></use>
                                </svg> -->
                                <img class="verifyImg" alt="点击换一张" title="点击换一张" :src="code" @click="codeBox()">
                                <el-input
                                    class="form-control"
                                    placeholder="验证码"
                                    @keyup.native.enter="onLogin('loginData')"
                                    v-model='loginData.verify_code'>
                                </el-input>
                        </el-form-item>
                        <el-form-item
                                class="btnWrap">
                                <el-button type="success" @click="onLogin('loginData')">登录</el-button>
                                <el-button @click="status=2;codeBox(2)">注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="status===2" class="userForm">
                    <div class="loginheader">注册账号</div>
                    <el-form
                            label-width="0px"
                            class="clearfix"
                            v-loading="loading"
                            element-loading-text='正在注册'>
                        <el-form-item
                                class="formRow">
                                <el-input
                                    type="text"
                                    class="form-control"
                                    placeholder="电话号码"
                                    v-model='registerData.phone'>
                                </el-input>
                                <div class="el-form-item__error">{{registerRule.phone}}</div>
                        </el-form-item>
                        <el-form-item
                                class="formRow">
                                <img class="verifyImg" alt="点击换一张" title="点击换一张" :src="code" @click="codeBox()">
                                <el-input
                                    class="form-control"
                                    placeholder="验证码"
                                    v-model='registerData.verify_code'>
                                </el-input>
                                <div class="el-form-item__error">{{registerRule.verify_code}}</div>
                        </el-form-item>
                        <el-form-item
                                class="formRow">
                                <el-button class="smsBtn" size="mini" :disabled="disabled" type="success" @click="onMessage(1)">{{sms}}</el-button>
                                <el-input
                                    type="password"
                                    class="form-control"
                                    placeholder="短信验证码"
                                    v-model='registerData.phone_code'>
                                </el-input>
                                <div class="el-form-item__error">{{registerRule.phone_code}}</div>
                        </el-form-item>
                        <el-form-item
                                class="formRow">
                                <el-input
                                    type="password"
                                    class="form-control"
                                    placeholder="登录密码"
                                    v-model='registerData.password'>
                                </el-input>
                                <div class="el-form-item__error">{{registerRule.password}}</div>
                        </el-form-item>
                         <el-form-item
                                class="formRow">
                                <el-input
                                    type="password"
                                    class="form-control"
                                    placeholder="确认密码"
                                    v-model='registerData.password_check'>
                                </el-input>
                                <div class="el-form-item__error">{{registerRule.password_check}}</div>
                        </el-form-item>
                        
                        <el-form-item
                                class="btnWrap">
                                <el-button type="success" @click="onRegister('registerData')">注册</el-button>
                                <el-button @click="status=1;codeBox(1)">登录</el-button>
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
