<template>
  <div>
    <header class="head-nav">
      <el-row>
        <el-col :span="14" class="noticeBox">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item,index) in noticleList"
                :key="index"
                @click="$router.push(`/notice/detail?id=${item.id}`)"
              >{{item.title}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="userinfo">
          <span class="username">
            <a :href="`tencent://message/?uin=${qq}&Site=&Menu-=yes`" target="_blank" class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qq"></use>
              </svg>
              客服
            </a>
            <router-link to="/notice/list" class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi-copy"></use>
              </svg>消息中心
            </router-link>
            <!-- <span class="imgBox">
                  <img :src="user_info.avartar" alt>
            </span>-->
            <span class="item">当前用户：{{user_info.phone}}</span>
          </span>
          <i class="fa fa-sign-out logout" @click="logout()"></i>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
import HeadNavJs from "./HeadNav.js";

export default HeadNavJs;
</script>
<style scoped lang='less'>
.logo-container {
  height: 40px;
}

.logo {
  height: 40px;
  width: auto;
  margin-left: 10px;
  margin-top: 5px;
}
.swiper-container {
  display: inline-block;
  width: 500px;
  height: 40px;
  line-height: 40px;
  margin: 0;
  .swiper-slide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
}
.fa-user {
  position: relative;
  top: -2px;
  margin-right: 4px;
}

.head-nav {
  width: 100%;
  height: 40px;
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  color: #fff;
  border-bottom: 1px solid #eee;
  .logout {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    float: right;
    cursor: pointer;
  }
}
.userinfo {
  text-align: right;
  color: #333;
  padding-right: 20px;
  .username {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    .item {
      padding: 0 15px;
      border-left: 1px solid #eee;
      color: #333;
      &:first-child {
        border: none;
      }
    }
    .icon {
      width: 20px;
      height: 20px;
      vertical-align: -5px;
      margin-right: 5px;
    }
    .el-dropdown {
      color: #333;
    }
  }
}
.noticeBox {
  position: relative;
  padding-left: 325px;
  color: #333;
  .icon {
    position: absolute;
    left: 300px;
    top: 12px;
  }
}
</style>
