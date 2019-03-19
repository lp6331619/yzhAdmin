<template>
  <div class="edit">
    <h1 class="backTitle">
      {{data.title}}
      <p>发布时间：{{data.created_at}}</p>
    </h1>
    <div class="text">{{data.content}}</div>
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
      data: {}
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
          this.$message.error(err.msg);
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
  }
}
</style>
