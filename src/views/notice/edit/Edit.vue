<template>
  <div class="edit">
    <h1 class="backTitle">
      {{data.title}}
      <p>发布时间：{{timeDate(data.created_at)}}</p>
    </h1>
    <div class="text" v-html="data.content"></div>
  </div>
</template>

<script>
export default {
  name: "list",
  created: function() {
    this.getList();
  },
  data() {
    return {
      loading: false,
      data: {
        created_at: "0",
        content: ""
      }
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.$$api_user_notice({
        data: { id: this.$route.query.id },
        fn: data => {
          this.data = data;
          this.loading = false;
        },
        errFn: err => {
          this.$message.error(err.info);
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.edit {
  .backTitle {
    text-align: center;
    font-size: 20px;
    p {
      font-size: 14px;
      color: #999;
    }
    img {
      max-width: 100%;
    }
  }
  .text {
    padding: 30px;
    img {
      max-width: 100%;
    }
  }
}
</style>
