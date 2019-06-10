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
            dataBox: {
                task_service2: []
            },
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
                    this.dataBox = data;
                    this.$set(this.dataBox, 'task_service2', [])
                    this.dataBox.task_service2.push(this.dataBox.task_service);
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
        formatterAge(item) {
            if (item.age && item.age.length > 0) {
                let arr = item.age.split(',')
                let t = ''
                arr.forEach((light) => {
                    t += item.age_stage[light] + ','
                })
                return t
            }
        },
        formatPhone_type(item) {

            let text = ''
            if (item.phone_type) {
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
            }
            return text
        },
        formatGrade(item, item2) {
            let text = ''
            if (item.grade_buyer) {
                switch (parseInt(item.grade_buyer)) {
                    case 1:
                        text = '需要'
                        break;
                    case 2:
                        text = '不需要'
                        break;
                }
            }
            return text
        },
        formatHuabei(item) {
            let text = ''
            if (item.huabei) {
                switch (parseInt()) {
                    case 1:
                        text = '不需要'
                        break;
                    case 2:
                        text = '需要'
                        break;
                }
            }
            return text
        },
    },
}