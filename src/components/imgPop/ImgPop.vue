<template>
  <div class="list">
    <div class="imgBoxPop" @click="closeBox()">
      <img :src="data.url">
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  created: function() {},
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    closeBox() {
      this.$emit("closeImg", false);
    }
  }
};
</script>
<style  lang='less'>
</style>
