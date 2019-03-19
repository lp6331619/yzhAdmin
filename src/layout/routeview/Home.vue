<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
  <div class="home">
    <head-nav></head-nav>
    <div class="left-fixed-right-auto">
      <left-menu></left-menu>
      <div class="right-content">
        <div class="content" style="margin-left:295px">
          <!-- <bread></bread> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadNav from "../head-nav/HeadNav.vue";
import LeftMenu from "../left-menu/LeftMenu.vue";
import Bread from "../bread/Bread.vue";
export default {
  name: "home",
  components: {
    HeadNav,
    LeftMenu,
    Bread
  }
};
</script>
<style scoped lang='less'>
.content {
  /*background: #f1f2f7;*/
  background: #fff;
  padding: 16px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
