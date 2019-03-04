<template>
    <div class="iframe">
        <iframe class="iframe" :src="url" frameborder="0" width="375" height="667"></iframe>
    </div>
</template>
<script>
export default {
	name   : 'login',
	created() {
		if(this.$route.query){
			this.url = 'http://wxapp.quitang.com/home/detail2?id='+this.$route.query.id+''
		}
	},
	data() {
		return {
			url:''
		}
	}
}
</script>
<style  >
	.iframe{display: block; margin: 20px auto;}
</style>
