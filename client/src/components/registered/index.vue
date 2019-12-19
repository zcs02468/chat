<!--  -->
<template>
        <div class="auth-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="account"  class="item-box">
                    <el-input v-model="ruleForm.account" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="name"  class="item-box">
                    <el-input v-model="ruleForm.name" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item prop="pass" class="item-box">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码" maxlength="64"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码" maxlength="64"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input class="code_input" type="password" v-model="ruleForm.code" autocomplete="off" placeholder="验证码" maxlength="4"></el-input>
                    <div class="code" v-html="imgUrl" title="点击切换验证码" @click="changeCode"></div>
                    <!-- <div class="code">
                        <img :src="imgUrl" alt="code" title="点击切换验证码" @click="changeCode">
                    </div> -->
                </el-form-item>
                <el-form-item class="btn-box item-box">
                    <el-button type="primary" class="registered" @click="registered">注册</el-button>
                </el-form-item>
            </el-form>
            <div class="text-box">
                <el-link type="primary" class="goToLogin" @click="goToLogin">已有账号登录</el-link>
            </div>
        </div>

</template>

<script>
import HttpCode  from '../../api/code'
import HttpUser  from '../../api/user'

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
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            showImg:1,
            ruleForm: {
                name: '',
                account:'',
                pass: '',
                checkPass: '',
                code:'',
                code_token:''
            },
            imgUrl: '',
            rules: {
                account: [
                    {validator: accountPass, trigger: 'blur'}
                ],
                name: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { len: 4, message: '请输入4位有效验证码', trigger: 'blur' }
                ]
            },
            svgCode:''
        }
    },
    created() {
        this.getCode()
    },
    methods: {
        goToLogin() {
            this.$parent.showLogin = true;       
        },
        async getCode() {
            let res = await HttpCode.getCode();
            let { code, data = {} } = res
            if (code === 200) {
                this.imgUrl = data.img
                this.ruleForm.code_token = data.token
                this.svgCode = data.svg.svg
            }
        },
        changeCode() {
            this.getCode()
        },
        async registered() {
            let obj = {
                user_id: this.ruleForm.account,
                user_name: this.ruleForm.name,
                user_pwd: this.ruleForm.pass,
                re_user_pwd: this.ruleForm.checkPass,
                code: this.ruleForm.code,
                code_token: this.ruleForm.code_token
            }
            // let obj = {
            //     user_id: '1180018',
            //     user_name: '1180018',
            //     user_pwd: '1180018',
            //     re_user_pwd: '1180018',
            //     code: this.ruleForm.code,
            //     code_token: this.ruleForm.code_token
            // }
            let res = await HttpUser.registered(obj);
            console.log( 'res', res );
            
            let { code , msg } = res;
            if( code === 200 ) {
                this.$message({
                    message: '恭喜你，注册成功,前去登录吧!',
                    type: 'success'
                });
            }else {
                this.$message({
                    message: msg,
                    type: 'error',
                })
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
    .registered {
        width: 100%;
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
.text-box {
    text-align: center;
}
.prompt-box {
    text-align: center;
    font-size: 14px;
}
.goToLogin {
    text-align: center;
}
</style>
