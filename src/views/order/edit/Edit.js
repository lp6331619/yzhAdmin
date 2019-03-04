export default {
    name   : 'user',
    created: function () {
    },
    data() {
        return {
            loadingList:true,
            loading: false,
            user_data : {
                
            },
            userBox : {

            },
            sexlist: [{
                text: '男',
                value: 1
            }, {
                text: '女',
                value: 2
            }],
            user_rules: {
                email   : [{//正则
                    required: true,
                    message : '邮箱不能为空！',
                    trigger : 'blur'
                }, {
                    type   : 'email',
                    message: '格式不正确',
                    trigger: 'blur'
                }],
                mobile : [{
                    required: true,
                    message : '手机号不能为空！',
                    trigger : 'blur'
                },{
                    pattern : /^1[34578]\d{9}$/,
                    message : '手机号格式不正确',
                    trigger : 'blur'
                }],
                user_name : [{
                    required: true,
                    message : '用户名不能为空！',
                    trigger : 'blur'
                },{
                    pattern : /^[a-zA-Z]{1}[a-zA-Z0-9_]{2,15}$/,
                    message : '必须以字母开头,用户名为2～15位!',
                    trigger : 'blur'
                }],
                name : [{
                    required: true,
                    message : '姓名不能为空',
                    trigger : 'blur'
                },{
                    pattern : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,4}$/ ,
                    message : '姓名为2-4位中文字符！',
                    trigger : 'blur'
                }],
                sex: [
                    {
                        required : true,
                        message: '请选择性别',
                    }
                ],
            }
        }
    },
    methods: {
        save_user(userdata) {//修改／新增
            this.$refs[userdata].validate((valid)=>{
                if(valid){
                    this.loading = true;
                    //登录的用户更新用户信息
                    this.$$api_user_modify_info({
                        data     : this[userdata],
                        fn       : data => {
                            if(this.$route.query.user_id == this.$store.state.user.userinfo.userinfo.user.user_id){
                                //登录的用户更新用户信息
                                var user_info = this.$store.state.user.userinfo.userinfo;
                                    user_info.user.email = this.user_data.email;
                                    user_info.account.user_name = this.user_data.user_name;
                                    user_info.user.name = this.user_data.name;
                                    user_info.user.sex = this.user_data.sex;
                                    user_info.account.mobile = this.user_data.mobile;

                                    this.$store.dispatch('update_userinfo', {
                                        userinfo: {
                                            userinfo:user_info,
                                            state: this.$store.state.user.userinfo.state,
                                            token: this.$store.state.user.userinfo.token
                                        }
                                    }).then(() => {
                                        this.loading = false;
                                        this.$message.success('信息修改成功');
                                        // this.$router.push('/home');
                                    });
                            }else{

                            }
                        },
                        errFn    : (err) => {
                            this.$message.error(err.message);
                            this.loading = false;
                        }
                    });
                }
            });
        },
     
    },
    watch: {
        $route(to, from){
            this.reset_user();
        }
    },
    components:{
        // loading
    }
}
