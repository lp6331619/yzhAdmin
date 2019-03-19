import Swiper from "swiper";
export default {
    name: 'head-nav',
    created() {
        this.getNotic()
        console.log(this.user_info,3333)
    },
    data() {
        return {
            show_pass: false,
            user_info: this.$store.state.user.userinfo,
            noticleList: [],

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
                data: { p: 1, limit: 10 },
                fn: data => {
                    this.noticleList = data.list
                    this.switerBox()
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                },
                tokenFlag: true
            });
        }

    }
}