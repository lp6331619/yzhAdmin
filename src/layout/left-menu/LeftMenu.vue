<template>
    <div class="left" style="width:275px" id="admin-left">
        <div class="logoBox">
            <div class="top">
                商户管理系统
                <router-link to="/notice/list">
                    <img src="../../assets/logo-sm.png" class="logo" alt>
                </router-link>
            </div>
            <div class="bottom">
                <div class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yongjin1"></use>
                    </svg>本金余额:
                    <strong class="green">{{balance_capital_money}}</strong>
                </div>
                <div class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yongjin"></use>
                    </svg>佣金余额:
                    <strong class="yello">{{balance_commision_money}}</strong>
                </div>
            </div>
        </div>
        <div
            class="tac"
            v-for="route in $router.options.routes"
            :key="route.path"
            v-if="!route.hidden && $route.matched.length && $route.matched[0].path===route.path"
        >
            <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :default-active="$route.path"
                :unique-opened="true"
                router
            >
                <!--第一层循环-->
                <template v-for="(item,indexItem) in route.children" v-if="!item.hidden">
                    <el-menu-item v-if="!item.child" :index="item.redirect" :key="indexItem">
                        <i :class="'iconfont icon-'+item.icon"></i>
                        {{item.name}}
                    </el-menu-item>
                    <el-submenu v-if="item.child" :index="item.path" :key="indexItem">
                        <template slot="title">
                            <i :class="'iconfont icon-'+item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <!--第二层循环-->
                        <template
                            v-for="(itemChild,indexChild) in item.children"
                            v-if="!itemChild.hidden"
                        >
                            <el-menu-item
                                v-if="!itemChild.child"
                                :key="indexChild"
                                :index="`${route.path}/${item.path}/${itemChild.path}`"
                            >--{{itemChild.name}}</el-menu-item>
                            <!-- <el-menu-item-group v-else :title="itemChild.name">
                                <el-menu-item
                                v-for="itemLast in itemChild.children"
                                v-if="!itemLast.hidden"
                                :key="itemLast.path"
                                :index="`${route.path}/${item.path}/${itemChild.path}/${itemLast.path}`"
                                >{{itemLast.name}}</el-menu-item>
                            </el-menu-item-group>-->
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import LeftMenu from "./LeftMenu.js";
export default LeftMenu;
</script>

<style scoped>
.el-menu {
    overflow-y: auto;
    height: calc(100% - 235px);
    border: none;
}
</style>
<style scoped lang='less'>
@import url(./LeftMenu.less);
</style>
