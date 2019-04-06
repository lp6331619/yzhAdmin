import Swiper from "swiper";
export default {
    name: 'head-nav',
    created() {
        this.getNotic()
        this.getQQ()
        console.log(this.$store.state.user, 3333)
    },
    data() {
        return {
            show_pass: false,
            user_info: this.$store.state.user.userinfo,
            noticleList: [],
            qq: ''
        }
    },
    mounted() {

    },
    methods: {
        switerBox() {
            new Swiper('.swiper-container', {
                direction: 'vertical',
                autoplay: true,
                grabCursor: true,
            })
        },
        getNotic() {
            this.$$api_user_notice_list({
                data: {
                    p: 1,
                    limit: 5
                },
                fn: data => {
                    this.noticleList = data.list
                    this.switerBox()
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                },
                tokenFlag: true
            });
        },
        getQQ() {
            this.$$api_user_getKeFuQQ({
                data: {},
                fn: data => {
                    // this.noticleList = data.list
                    this.qq = data.qq
                    console.log(data)
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                },
                tokenFlag: true
            });
        },
        logout() {
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