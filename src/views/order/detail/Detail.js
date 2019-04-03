import imgPop from "cps/imgPop/imgPop.vue";
export default {
    name: 'list',
    created: function () {
        // this.getType()
        this.getList()
    },
    components: {
        'imgPop': imgPop
    },
    data() {
        return {
            imgPopData: {
                url: '',
                status: false
            },
            loading: false,
            dataBox: {},
        }
    },
    methods: {
        openImg(url) {
            this.imgPopData = {
                url: url,
                status: true
            }
        },
        closeImg(status) {
            this.imgPopData.status = status
        },
        getList() { //获取列表数据
            this.loading = true;
            this.$$api_order_detail({
                data: this.$route.query,
                fn: data => {
                    this.loading = false;
                    this.dataBox = data
                    // console.log(data, 111)
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        created_atTime(item) {
            if (item == '0') {
                return '暂无时间'
            } else {
                return new Date(parseInt(item) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
            }
        },
    },
}