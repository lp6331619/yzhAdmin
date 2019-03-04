export default{
    install(Vue,options){
        Vue.prototype.logout = function (obj) {
            /**
             * 退出登录
             */
            if(obj == 1){
                // this.$$api_user_authLogout({
                //      data     : {},
                //      fn       : data => {
                //         if(this.$store.state.user.remumber.remumber_flag!=true){
                        this.$store.dispatch('remove_remumber')
                        // }
                        this.$store.dispatch('remove_userinfo')
                        this.$router.push('/login');
                //      },
                //      errFn    : (err) => {
                //          this.$message.error(err.message);
                //      }
                // })
            }else{
                this.$confirm('你确定退出登录么?', '确认退出', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$$api_user_authLogout({
                    //      data     : {},
                    //      fn       : data => {
                    //         if(this.$store.state.user.remumber.remumber_flag!=true){
                            this.$store.dispatch('remove_remumber')
                            // }
                            this.$store.dispatch('remove_userinfo')
                            this.$router.push('/login');
                    //      },
                    //      errFn    : (err) => {
                    //          this.$message.error(err.message);
                    //      }
                    // })

                });
            }
        }
    }
}
