<template>
    <div class="login">
        <div class="login-img">
            <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="login-img-content">
        </div>
        <div class="login-phone">
            <input type="text" class="login-phone-content" placeholder="请输入手机号" v-model.number='userTel'>
            <i class='iconfont login-phone-icon' v-if='!telTest'>&#xe613;</i>
        </div>
        <div class="login-password">
            <input type="text" class="login-password-content" placeholder="请输入密码" v-model='userPsd'>
        </div>
        <div class="login-btn">
            <van-button type="primary" size='normal' @click='handleLoginClick' :disabled='!telTest'>登录</van-button>
        </div>
        <div class="login-info">
            <router-link to='/register'>
                <span class='login-info-register'>立即注册</span>|
            </router-link>
            <span class='login-info-forget'>忘记密码</span>
        </div>
    </div>
</template>
<script>
import { post } from '../../util/request'
import router from '../../router/index'
export default {
  name: 'Login',
  data () {
    return {
      userTel: '',
      userPsd: '',
      telTest: true
    }
  },
  methods: {
    handleLoginClick () {
      if (this.telTest) {
        const login = async () => {
          const result = await post('/api/user/login', this.data)
          if (result?.data?.errno === 0) {
            localStorage.user = this.userTel
            router.push('/')
          }
        }
        login()
      }
    }
  },
  computed: {
    data () {
      return {
        username: this.userTel,
        password: this.userPsd
      }
    }
  },
  watch: {
    userTel () {
      const reg = /^1\d{10}$/
      this.telTest = reg.test(this.userTel)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/allColor.scss';
@import '../../style/mixins.scss';
.login{
    font-size: .16rem;
    color:rgba(0,0,0,0.5);
    &-img{
        width: .66rem;
        height: .66rem;
        margin: 1.2rem auto 0;
        &-content{
            width: 100%;
        }
    }
    &-phone{
        @include inputContainer;
        &-content{
            @include input;
        }
        &-icon{
            color:rgba(255,0,0,.6);
            margin-right:.1rem
        }
    }
    &-password{
        @include inputContainer;
        margin-top: .16rem;
        &-content{
            @include input;
        }
    }
    &-btn{
        margin-top: .32rem;
        position: relative;
        .van-button--primary{
            width: 2.95rem;
            height: .48rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: .16rem;
        }
    }
    &-info{
        margin-top:.96rem;
        text-align: center;
        font-size: .14rem;
        & a{
            color:rgba(0,0,0,0.5)
        }
        & span{
            padding: 0 .1rem;
        }
    }
}

</style>
