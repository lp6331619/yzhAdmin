<template>
    <div class="left" :style="{'height':win_size.height}" style="width:190px" id='admin-left'>
        <div class='tac'
            v-for="(route,index) in $router.options.routes"
            :key='route.path'
            v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :default-active="$route.path"
              :unique-opened="true"
              router>
              <!--第一层循环-->
                <template
                    v-for="(item,indexItem) in route.children"
                    v-if=" type == '1' || !item.hidden && item.type == type">
                        <el-menu-item v-if="!item.child" :index="item.redirect">
                            <i :class="'iconfont icon-'+item.icon"></i>
                            {{item.name}}
                        </el-menu-item>
                    <el-submenu
                        v-if="item.child"
                        :index="item.path" >
                        <template slot="title">
                            <i :class="'iconfont icon-'+item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <!--第二层循环-->
                        <template
                            v-for="(itemChild,indexChild) in item.children"
                            v-if="!itemChild.hidden && !itemChild.hidden">
                            <el-menu-item v-if="!itemChild.child" :index="`${route.path}/${item.path}/${itemChild.path}`">
                                {{itemChild.name}}
                            </el-menu-item>
                            <el-menu-item-group v-else :title="itemChild.name">
                                <!--第三层循环-->
                                <el-menu-item
                                    v-for="itemLast in itemChild.children"
                                    v-if="!itemLast.hidden"
                                    :key="itemLast.path"
                                    :index="`${route.path}/${item.path}/${itemChild.path}/${itemLast.path}`">{{itemLast.name}}
                                </el-menu-item>
                           </el-menu-item-group>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import LeftMenu from './LeftMenu.js';
    export default LeftMenu;
</script>

<style scoped lang='less'>
    @import url(./LeftMenu.less);
</style>
