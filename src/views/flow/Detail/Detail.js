import imgPop from "cps/imgPop/imgPop.vue";
import flowList from "cps/flowList/flowList.vue";
export default {
    name: 'list',
    created: function () {
        this.getType()
        if (this.selectData.status == '100') {
            this.getDetail()
        }
    },
    components: {
        'imgPop': imgPop,
        'flowList': flowList
    },
    data() {
        return {
            loading: false,
            imgPopData: {
                url: '',
                status: false
            },
            data: {
                task_service: {},
                search: [],
                task_price: {}
            },
            pageShow: false,

            selectData: { //搜索条件
                limit: 10,
                p: this.$route.query.p ? parseInt(this.$route.query.p) : 1,
                task_type: 2,
                status: this.$route.query.status ? this.$route.query.status : '100',
                start_time: this.$route.query.start_time ? this.$route.query.start_time : '',
                id: this.$route.query.id ? this.$route.query.id : '',
                tid: this.$route.query.tid ? this.$route.query.tid : '',
                sid: this.$route.query.sid ? this.$route.query.sid : '',
                oid: this.$route.query.oid ? this.$route.query.oid : '',
                member_name: this.$route.query.member_name ? this.$route.query.member_name : '',
                order_no: this.$route.query.order_no ? this.$route.query.order_no : '',
                money: this.$route.query.money ? this.$route.query.money : '',
            },
            status: [],
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
        getType() {
            this.$$api_order_getOrderStatus({
                data: {},
                fn: data => {
                    this.loading = false;
                    for (let i in data) {
                        this.status.push({
                            type: i,
                            name: data[i]
                        })
                    }
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
            });
        },
        getDetail() {
            this.loading = true;
            this.$$api_task_detail({
                data: this.$route.query,
                fn: data => {
                    this.loading = false;
                    this.data = data
                    this.$set(this.data, 'task_service2', [])
                    this.data.task_service2.push(this.data.task_service);
                    this.$set(this.data, 'task_price2', [])
                    this.data.task_price2.push(this.data.task_price)
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        },
        Revoke() { //撤销
            this.$confirm('是否撤销任务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                this.$$api_task_cancelTask({
                    data: {
                        id: this.data.id
                    },
                    fn: data => {
                        this.loading = false;
                        this.$message.success('撤销成功!')
                        this.$router.push('/flow')
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                        this.loading = false;
                    },
                    tokenFlag: true
                });
            }).catch(() => {

            });
        },
        formatHuabei(item) {
            let text = ''
            switch (parseInt(item.huabei)) {
                case 1:
                    text = '不需要'
                    break;
                case 2:
                    text = '需要'
                    break;
            }
            return text

        },
        formatPhone_type(item) {
            let text = ''
            switch (parseInt(item.phone_type)) {
                case 0:
                    text = '不限'
                    break;
                case 1:
                    text = 'Android'
                    break;
                case 2:
                    text = 'Ios'
                    break;
            }
            return text
        },
        formatGrade(item, item2) {
            let text = ''
            switch (parseInt(item.grade_buyer)) {
                case 1:
                    text = '需要'
                    break;
                case 2:
                    text = '不需要'
                    break;
            }
            return text
        },
        handleClick() {
            this.$router.push({
                path: '/flow/detail',
                query: {
                    tid: this.$route.query.tid,
                    status: this.selectData.status
                }
            })
            if (this.selectData.status == '100') {
                this.getDetail()
            }
        },
        formatterAge(item) {
            if (item.age.length > 0) {
                let arr = item.age.split(',')
                let t = ''
                arr.forEach((light) => {
                    t += item.age_stage[light] + ','
                })
                return t
            }
        },
    },
}