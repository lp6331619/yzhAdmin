<template>
    <div>
        <header class="head-nav">
            <audio src="./static/6005.mp3" id="mp3" ></audio>
            <el-row>
                <el-col :span="4" class='logo-container'>
                  <router-link to="/product/home">
                    <img src="../../assets/logo-sm.png" class='logo' alt="">
                  </router-link>
                </el-col>
                <el-col :span="16">
                    <el-menu theme="dark" :default-active="$store.state.router.headerCurRouter" class="el-menu-demo"
                             mode="horizontal" unique-opened router>
                        <el-menu-item
                            v-for='(item,index) in $router.options.routes'
                            :index="item.path"
                            :key='item.path'
                            v-if='!item.hidden'>
                            {{item.name}}
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <!-- <span class='username'>
                        <i v-if="!user_info.avartar" class='iconfont icon-user'></i>
                        <span v-else class="imgBox">
                            <img :src="user_info.avartar" alt="">
                        </span>
                        {{this.user_info.realname}}
                    </span> -->
                    <span class='username'>
                        <el-dropdown
                            trigger="click"
                            @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                              <span class='username'>
                                  <i v-if="!user_info.avartar" class='iconfont icon-user'></i>
                                  <span v-else class="imgBox">
                                      <img :src="user_info.avartar" alt="">
                                  </span>
                                  {{this.user_info.realname}}
                              </span><i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item command='info'>修改信息</el-dropdown-item> -->
                                <el-dropdown-item
                                        command='pass'
                                        >修改密码</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <i class="fa fa-sign-out logout" @click='logout()'></i>
                </el-col>
            </el-row>
        </header>
        <el-dialog size="small" :title="title"
            :visible.sync="show_pass">
            <el-form style="margin:20px;width:80%;"
                     label-width="100px"
                     :model="passwordBox"
                     :rules="user_info_rules"
                     ref='passwordBox'>
                <el-form-item class='edit-form'
                              label="新密码"
                              prop='new_pwd'>
                    <el-input
                            type='password'
                            placeholder='新密码'
                            auto-complete='off'
                            v-model="passwordBox.new_pwd"></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="确认密码"
                              prop='confirm_pwd'>
                    <el-input
                            type='password'
                            placeholder='确认密码'
                            auto-complete='off'
                            v-model="passwordBox.confirm_pwd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_pass = false">取 消</el-button>
                <el-button type="primary" @click="updUserPass('passwordBox')">确 定</el-button>
            </span>
        </el-dialog>

        
    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>
<style scoped lang='less'>
    .logo-container {
        height: 60px;
    }

    .logo {
        height: 50px;
        width: auto;
        margin-left: 10px;
        margin-top: 5px;
    }

    .fa-user {
        position: relative;
        top: -2px;
        margin-right: 4px;
    }

    .head-nav{
        width: 100%;
        height: 60px;
        background: #23262E;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 99;
        color: #FFF;
        border-bottom: 1px solid #1F2D3D;
        .logout {
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            float: right;
            cursor: pointer;
        }


    }
    .userinfo {
        text-align: right;
        .username {
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            .el-dropdown {
                color: #FFF;
            }
        }
    }
</style>
