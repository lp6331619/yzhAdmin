export default {
    name: 'list',
    created: function () {
        this.getList()
    },
    data() {
        return {
            loading: false,
            tableData: Array,
            pageShow: false,
            url: {}
        }
    },
    methods: {
        getList() {
            this.$$api_user_getSpreadUrl({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.url = data
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        doCopy(val) {
            this.$copyText(val).then((e) => {
                this.$message.success('恭喜您!复制成功!')
            }, function (e) {
                this.$message.success('复制失败!')
            })
        }
    },
}