<template>
    <div class="login">
        <div class="login-img">
            <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="login-img-content">
        </div>
        <div class="login-phone">
            <input type="text" class="login-phone-content" placeholder="请输入手机号">
        </div>
        <div class="login-password">
            <input type="password" class="login-password-content" placeholder="请输入密码">
        </div>
        <div class="login-confirm">
            <input type="password" class="login-confirm-content" placeholder="请输入密码">
        </div>
        <div class="login-btn">
            <van-button type="primary" size='normal'>登录</van-button>
        </div>
        <div class="login-info">
            <router-link to="/login">
                <span class='login-info-login'>已有账号去登录</span>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  methods: {
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
    }
    &-password{
        @include inputContainer;
        margin-top: .16rem;
        &-content{
            @include input;
        }
    }
    &-confirm{
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
