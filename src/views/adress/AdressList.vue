<template>
  <div class="mask"></div>
  <div class="top">
    <i class='iconfont top-icon' @click='handleBackClick'>&#xe600;</i>
    <span class='top-administer'>管理收货地址</span>
    <router-link to='/newadress'>
      <span class='top-new'>新建</span>
    </router-link>
  </div>
  <div class="content">
    <div class="content-title">我的收货地址</div>
    <div class="content-item" v-for='(item,index) in adressList' :key='index' @click=hanleItemClick(item.id)>
      <div class="content-item-info">
        <div class="content-item-info-title">
          <span class="content-item-info-title-name">{{item.name}}</span>
          <span class="content-item-info-title-phone">{{item.phone}}</span>
        </div>
        <div class="content-item-info-adress">{{item.city}}{{item.school}}{{item.doorplate}}</div>
      </div>
      <i class='iconfont content-item-icon'  @click.self='hanleResetAdress(item.id)'>&#xe667;</i>
    </div>
  </div>
</template>
<script>
import store from '@/store/index.js'
export default {
  name: 'AdressList',
  methods: {
    handleBackClick () {
      this.$router.back()
    },
    // 点击item编辑地址
    hanleResetAdress (adressId) {
      this.$router.push({
        name: 'NewAdress',
        params: {
          adressId: adressId
        }
      })
    },
    // 选择地址
    hanleItemClick (adressId) {
      store.commit('changeDefaultAdress', adressId)
      this.$router.push({
        name: 'OrderConfirmation',
        params: {
          id: this.$route.params.id,
          adressId: adressId
        }
      })
    }
  },
  computed: {
    adressList () {
      return store.state.adressList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor';
@import '@/style/mixins';
.mask{
  background: $inputColor;
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.top{
  width: 100%;
  height: .44rem;
  line-height: .44rem;
  display: flex;
  justify-content: space-between;
  font-size: .16rem;
  color: $iconColor;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  a{
    color: $iconColor;
  }
  &-icon{
    margin-left: .184rem;
    color: #B6B6B6;
  }
  &-new{
    font-size: .14rem;
    margin-right: .18rem;
  }
}
.content{
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: .16rem .18rem;
  color: $iconColor;
  overflow-y: scroll;
  &-title{
    font-size: .14rem;
  }
  &-item{
    margin-top: .12rem;
    width: 3.39rem;
    height: 1.04rem;
    background: #fff;
    padding: .18rem .16rem;
    box-sizing: border-box;
    border-radius: .06rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-info{
      align-self: stretch;
      flex: 1;
      &-title{
        color: #999;
        font-size: .14rem;
        white-space: nowrap;
        &-phone{
          margin-left: .66rem;
        }
      }
      &-adress{
        margin-top: .08rem;
        font-size: .14rem;
        color: $iconColor;
        line-height: .2rem;
        @include multiellipsis;
      }
    }
    &-icon{
      margin-left: .39rem;
      color: #999;
      font-size: .16rem;
    }
  }
}
</style>
