<template>
  <div class="pageCpLogin" :style="backgroundImage">
    <div class="panelCont">
      <div class="leftPanel">
        <div class="inner">
          <div class="login-logo">柚子汇</div>
          <div class="btm">
            The backstage management system
            <br>柚子汇管理系统
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
            element-loading-text="正在登录"
            :model="loginData"
            :rules="rule_data"
            ref="loginData"
          >
            <el-form-item class="formRow" prop="phone">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhanghao-copy"></use>
              </svg>
              <el-input
                type="text"
                class="form-control"
                placeholder="电话号码"
                v-model="loginData.phone"
              ></el-input>
            </el-form-item>
            <el-form-item class="formRow" prop="password">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
              <el-input
                type="password"
                class="form-control"
                placeholder="登录密码"
                v-model="loginData.password"
              ></el-input>
            </el-form-item>
            <el-form-item class="formRow" prop="verify_code">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma1"></use>
              </svg>
              <img class="verifyImg" alt="点击换一张" title="点击换一张" :src="code" @click="codeBox(1)">
              <el-input
                class="form-control"
                placeholder="验证码"
                @keyup.native.enter="onLogin('loginData')"
                v-model="loginData.verify_code"
              ></el-input>
            </el-form-item>
            <el-form-item class="btnWrap">
              <el-button type="warning" @click="onLogin('loginData')">登录</el-button>
              <el-button @click="status=2;codeBox(2)">注册</el-button>
              <el-button @click="status=3;codeBox(3)">忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="status===2" class="userForm">
          <div class="loginheader">注册账号</div>
          <el-form
            label-width="0px"
            class="clearfix"
            v-loading="loading"
            element-loading-text="正在注册"
          >
            <el-form-item v-if="!registStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhanghao-copy"></use>
              </svg>
              <el-input
                type="text"
                class="form-control"
                placeholder="电话号码"
                v-model="registerData.phone"
              ></el-input>
              <div class="el-form-item__error">{{registerRule.phone}}</div>
            </el-form-item>
            <el-form-item v-if="!registStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma1"></use>
              </svg>
              <img class="verifyImg" alt="点击换一张" title="点击换一张" :src="code" @click="codeBox(2)">
              <el-input class="form-control" placeholder="验证码" v-model="registerData.verify_code"></el-input>
              <div class="el-form-item__error">{{registerRule.verify_code}}</div>
            </el-form-item>
            <el-form-item class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma1"></use>
              </svg>
              <el-button
                class="smsBtn"
                size="mini"
                :disabled="disabled"
                type="warning"
                @click="onMessage(1)"
              >{{sms}}</el-button>
              <el-input class="form-control" placeholder="短信验证码" v-model="registerData.phone_code"></el-input>
              <div class="el-form-item__error">{{registerRule.phone_code}}</div>
            </el-form-item>
            <el-form-item v-if="registStaus" class="formRow">
              <el-input
                type="password"
                class="form-control"
                placeholder="登录密码"
                v-model="registerData.password"
              ></el-input>
              <div class="el-form-item__error">{{registerRule.password}}</div>
            </el-form-item>
            <el-form-item v-if="registStaus" class="formRow">
              <el-input
                type="password"
                class="form-control"
                placeholder="确认密码"
                v-model="registerData.password_check"
              ></el-input>
              <div class="el-form-item__error">{{registerRule.password_check}}</div>
            </el-form-item>
            <el-form-item v-if="registStaus" class="formRow">
              <el-input class="form-control" placeholder="邀请码" v-model="registerData.invite_no"></el-input>
            </el-form-item>
            <el-form-item v-if="registStaus" class="formRow">
              <el-input class="form-control" placeholder="QQ" v-model="registerData.qq"></el-input>
            </el-form-item>
            <el-form-item class="btnWrap">
              <el-button v-if="registStaus" type="success" @click="onRegister('registerData')">注册</el-button>
              <el-button @click="status=1;codeBox(1)">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="status===3" class="userForm">
          <div class="loginheader">重置密码</div>
          <el-form
            label-width="0px"
            class="clearfix"
            v-loading="loading"
            element-loading-text="正在注册"
          >
            <el-form-item v-if="!resetStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhanghao-copy"></use>
              </svg>
              <el-input
                type="text"
                class="form-control"
                placeholder="电话号码"
                v-model="resetData.phone"
              ></el-input>
              <div class="el-form-item__error">{{resetRule.phone}}</div>
            </el-form-item>
            <el-form-item v-if="!resetStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma1"></use>
              </svg>
              <img class="verifyImg" alt="点击换一张" title="点击换一张" :src="code" @click="codeBox(3)">
              <el-input class="form-control" placeholder="验证码" v-model="resetData.verify_code"></el-input>
              <div class="el-form-item__error">{{resetRule.verify_code}}</div>
            </el-form-item>
            <el-form-item class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma1"></use>
              </svg>
              <el-button
                class="smsBtn"
                size="mini"
                :disabled="disabled"
                type="warning"
                @click="onMessage(2)"
              >{{sms}}</el-button>
              <el-input class="form-control" placeholder="短信验证码" v-model="resetData.phone_code"></el-input>

              <div class="el-form-item__error">{{resetRule.phone_code}}</div>
            </el-form-item>
            <el-form-item v-if="resetStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
              <el-input
                type="password"
                class="form-control"
                placeholder="登录密码"
                v-model="resetData.password"
              ></el-input>
              <div class="el-form-item__error">{{resetRule.password}}</div>
            </el-form-item>
            <el-form-item v-if="resetStaus" class="formRow">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
              <el-input
                type="password"
                class="form-control"
                placeholder="确认密码"
                v-model="resetData.password_check"
              ></el-input>
              <div class="el-form-item__error">{{resetRule.password_check}}</div>
            </el-form-item>
            <el-form-item class="btnWrap">
              <el-button v-if="resetStaus" type="success" @click="onReset()">重置密码</el-button>
              <el-button @click="status=1;codeBox(1)">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginJs from "./Login.js";
export default LoginJs;
</script>

<style lang='less'>
@import url(Login.less);
</style>
