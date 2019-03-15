/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
    name: 'login',
    created() {
        // if (this.$store.state.user.userinfo.status) {
        //     this.$router.push('/product/travel/list1'); //登录状态
        // }
        this.codeBox(1)
    },
    data() {
        return {
            backgroundImage: { //背景图片
                backgroundImage: "url(" + require("../../assets/images/loginBg.jpg") + ")",
            },
            loading: false,
            status:1,
            code:'',
            sms:'发送短信',
            disabled:false,
            loginData: {
                phone: '18888888882',
                password: '123456',
                verify_code:'',
                code_key:''
            },
            rule_data: {
                phone: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                verify_code: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            registerData: {
                phone: '',
                password: '',
                verify_code:'',
                password_check:'',
                invite_no:'',
                phone_code:'',
                qq:'',
            },
            registerRule: {
                phone: '',
                password: '',
                
                password_check:'',
                phone_code:'',
            },
        }
    },
    methods: {
        codeBox(status){
            let math = Math.random()
            this.loginData.code_key = math
             let type = '';
            switch(status){
                case 1:
                    type='login'
                    break;
                case 2:
                    type='register'
                    break;
                case 3:
                    type='resetPasswd'
                    break;
            }
            this.code = `http://yzh.jiqimao.uiping.com/Public/verify?type=${type}&code_key=${math}`
        },
        onLogin(ref, type) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$$api_user_login({
                        data: this[ref],
                        fn: data => {
                            this.$store.dispatch('update_userinfo', {
                                userinfo: data,
                            }).then(() => {
                               this.$route.push('/home')
                            });
                        },
                        errFn: (err) => {
                            this.$message.error(err.info);
                        },
                        tokenFlag: true
                    });
                }
            });
        },
        onMessage(status){
            let smsStatus = true;
            let data = {};
            data.type = status;
            data.code_key = this.loginData.code_key;
            if(this.registerData.phone===''){
                this.registerRule = Object.assign({}, this.registerRule, {
                    phone: '不能为空'
                })
                smsStatus = false;
            }else{
                data.phone = this.registerData.phone;
                this.registerRule = Object.assign({}, this.registerRule, {
                    phone: ''
                })
            }
            if(this.registerData.verify_code===''){
                this.registerRule = Object.assign({}, this.registerRule, {
                    verify_code: '不能为空'
                })
                smsStatus = false;
            }else{
                data.verify_code = this.registerData.verify_code;
                this.registerRule = Object.assign({}, this.registerRule, {
                    verify_code: ''
                })
            }
            
            // if(this.registerData.password_check.length==0 && this.registerData.password_check === this.registerData.password){
            //     this.registerRule.password_check = '两次输入不一致';
            //     smsStatus = false;
            //     data.phone = this.registerData.phone;
            // }

            if(smsStatus){
                this.$$api_user_sms_code({
                    data:data ,
                    fn: data => {
                        this.codeBox(2)
                        this.$message.success('发送短信成功');
                        this.disabled=true
                        let i = 60;
                        let time = setInterval(()=>{
                            if(i!==0){
                                i--
                                this.sms = `${i}秒`
                            }else{
                                this.sms = '发送短信'
                                clearInterval(time)
                                this.disabled=false
                            }
                        },1000);
                    },
                    errFn: (err) => {
                        this.$message.error(err.info);
                    },
                    tokenFlag: true
                });
            }
        },
        onRegister(){

        }
    },
    mounted() {}
}