export default {
    name: 'left-menu',
    created() {
        this.setSize();
        this.$$lib_$(window).resize(() => {
            this.setSize();
        });
        this.updateCurMenu();
        this.getMoney();
    },
    data() {
        return {
            menu_list: [],
            menuNav: [],
            money: {},
            win_size: {
                height: '',
            },
        }
    },
    methods: {
        setSize() {
            this.win_size.height = this.$$lib_$(window).height() - 61 + "px";
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        routhForeach(name) {
            for (let k in this.$router.options.routes) {
                if (this.$router.options.routes[k].name == name) {
                    this.menuNav.push(this.$router.options.routes[k])
                }
            }
        },
        updateCurMenu(route) {
            var route = route || this.$route;
            if (route.matched.length) {
                var rootPath = route.matched[0].path,
                    fullPath = route.path;
                this.$store.dispatch('set_cur_route', {
                    rootPath,
                    fullPath
                });
                var routes = this.$router.options.routes;
                for (var i = 0; i < routes.length; i++) {
                    if (routes[i].path === rootPath && !routes[i].hidden) {
                        this.menu_list = routes[i].children;
                        break;
                    }
                }
            } else {
                this.$router.push('/404');
            }
        }, //获取钱
        getMoney() {
            this.$$api_customer_accountInfo({
                data: {},
                fn: data => {
                    this.loading = false;
                    this.money = data;
                    console.log(this.money)
                    this.$store.dispatch('update_remumber', {
                        remumber: this.money,
                    }).then(() => {});
                },
                errFn: (err) => {
                    this.$message.error(err.info);
                    this.loading = false;
                },
                tokenFlag: true
            });
        }
    },
    mounted() {

    },
    computed: {
        balance_capital_money() {
            return this.$store.state.user.remumber.balance_capital_money
        },
        balance_commision_money() {
            return this.$store.state.user.remumber.balance_commision_money
        }
    },
    watch: {
        $route(to, from) {
            this.updateCurMenu(to);
        },
    }
}