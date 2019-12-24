<!--  -->
<template>
        <div class="auth-form">
            <div class="panfish">
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="normal" v-show="showImg == 1"/>
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="greeting" v-show="showImg == 2"/>
                <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="blindfold" v-show="showImg == 3"/>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="account"  class="item-box">
                    <el-input v-model.number="ruleForm.account" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" @focus="changeImg(2)" @blur="changeImg(1)"></el-input>
                </el-form-item>
                <el-form-item prop="pass" class="item-box">
                    <el-input type="password" v-model="ruleForm.pass" prefix-icon="el-icon-lock" autocomplete="off" placeholder="请输入密码" @focus="changeImg(3)" @blur="changeImg(1)"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input class="code_input" prefix-icon="el-icon-key" type="password" v-model="ruleForm.code" autocomplete="off" placeholder="验证码" maxlength="4"></el-input>
                    <!-- <div class="code">
                        <img :src="imgUrl" alt="code" title="点击切换验证码" @click="changeCode">
                    </div> -->
                    <div class="code" v-html="imgUrl" title="点击切换验证码" @click="changeCode"></div>
                </el-form-item>
                <el-form-item class="btn-box item-box">
                    <el-button type="primary" class="login" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="prompt-box">没有账号？ <el-link type="primary" @click="goToRegistered">注册</el-link></div>
        </div>

</template>

<script>
import HttpCode  from '../../api/code'
import HttpLogin  from '../../api/user'
export default {
    data() {
        var accountPass = (rule, value, callback) => {
            if( value === '' ) {
                callback(new Error('请输入用户名'));
            }
            if(!/^[a-z0-9]+$/.test(value)) {
                callback(new Error('用户名仅支持小写字母或数字'));
            }
            if( value.lenth >= 4 && value.length <= 10 ) {
                callback(new Error('长度在 4 到 10 个字符'));
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        return {
            showImg:1,
            imgUrl:'',
            ruleForm: {
                account: '',
                pass: '',
                code: '',
                code_token:''
            },
            rules: {
                account: [
                    { validator: accountPass, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 1, max: 2, message: '请输入1到2位有效验证码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.getCode()
    },
    methods: {
        changeImg(value) {
            this.showImg = value;
        },
        goToRegistered() {
            this.$parent.showLogin = false;
        },
        async getCode() {
            let res = await HttpCode.getCode();
            let { code, data = {} } = res
            if (code === 200) {
                this.imgUrl = data.img
                this.ruleForm.code_token = data.token
            }
        },
        changeCode() {
            this.getCode()
        },
        async login() {
            let res = await HttpLogin.login({
                user_id: this.ruleForm.account,
                user_pwd: this.ruleForm.pass,
                code: this.ruleForm.code,
                code_token: this.ruleForm.code_token
            })
            let { code, data={}, msg } = res;
            console.log( 'res', res );
            
            if( code === 200 ) {
                
                this.$router.push({
                    path: '/'
                })
                this.$store.commit('saveUserData',{
                    _id: data._id,
                    token: data.token,
                    user_name: data.user_name
                })
            }else {
                this.$message.error(msg);
            }
        }
    }
};
</script>
<style lang="less" scoped>

.auth-form {
    position: relative;
    padding: 2rem;
    width: 20.5rem;
    max-width: 100%;
    font-size: 1.167rem;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
}
.btn-box {
    text-align: center;
    .login {
        width: 200px;
    }
}
.code_input {
    width: 140px;
    position: relative;
    font-size: 14px;
    display: inline-block;
}
.code {
    width: 100px;
    cursor: pointer;
    float: right;
    height: 38px;
    border: 1px solid #DCDFE6;
    img {
        width: 100%;
        height: 100%;
    }
}
.prompt-box {
    text-align: center;
    font-size: 14px;
}
.panfish {
    .normal {
        position: absolute;
        top: 0;
        left: 50%;
        width: 10rem;
        transform: translate(-50%, -83%);
        z-index: 1;
    }
    .greeting {
        position: absolute;
        top: 0;
        left: 50%;
        width: 10rem;
        transform: translate(-50%, -75.8%);
        z-index: 1;
    }
    .blindfold {
        position: absolute;
        top: 0;
        left: 50%;
        width: 8.6rem;
        transform: translate(-50%, -75%);
        z-index: 1;
    }
    #TCaptcha {
        width: 310px;
        height: 40px;
    }
}
</style>
