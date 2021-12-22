<template>
    <div class="mask"></div>
    <div class="confirm">
        <div class="confirm-top">
            <router-link :to='`/shop/${this.$route.params.id}`'>
                <i class='iconfont confirm-top-icon'>&#xe600;</i>
            </router-link>
            <div class="confirm-top-text">确认订单</div>
        </div>
        <div class="confirm-info" @click='handleAdressClick'>
            <div class="confirm-info-left" v-if='allAdressList.length'>
                <div class="confirm-info-left-title">收货地址</div>
                <div class="confirm-info-left-adress">{{adressList?.city}}{{adressList?.school}}{{adressList?.doorplate}}</div>
                <div class="confirm-info-left-person">
                    <span class='confirm-info-left-person-name'>{{adressList?.name}}</span>
                    <span class='confirm-info-left-person-male'>  男士</span>
                    <span class='confirm-info-left-person-phone'>{{adressList?.phone}}</span>
                </div>
            </div>
            <div class="confirm-info-empty" v-else>还没有添加地址，快去添加吧</div>
            <i class='iconfont confirm-info-icon'>&#xe667;</i>
        </div>
    </div>
</template>
<script>
import store from '@/store/index.js'
export default {
  name: 'Adress',
  data () {
    return {
      allAdressList: store.state.adressList
    }
  },
  methods: {
    handleAdressClick () {
      this.$router.push({
        name: 'Adress',
        params: {
          id: this.$route.params.id
        }
      })
    }
  },
  computed: {
    adressId () {
      return this.$route.params.adressId
    },
    adressList () {
      const list = store.state.adressList
      const id = this.$route.params.adressId
      let data = null
      if (id) {
        list.forEach((item) => {
          if (item.id === parseInt(id)) {
            data = item
          }
        })
      } else {
        list.forEach((item) => {
          if (item.default) {
            data = item
          }
        })
      }
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor.scss';
@import '@/style/mixins.scss';
.mask{
    background: $inputColor;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}
.confirm{
    width: 100%;
    height: 1.42rem;
    background-image: linear-gradient(to top, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    &-top{
        padding-top: .245rem;
        color: #fff;
        display: flex;
        align-items: center;
        a{
            color:#fff
        }
        &-icon{
            margin-left: .185rem;
            font-size: .21rem;
        }
        &-text{
            font-size: .16rem;
            margin-left: 1.25rem;
        }
    }
    &-info{
        width: 3.39rem;
        height: 1.11rem;
        margin: .22rem auto 0;
        background: #fff;
        border-radius: .08rem;
        padding: .16rem;
        color:#666;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        &-left{
            &-title{
                font-size: .16rem;
                color:#333;
                font-weight: bolder;
            }
            &-adress{
                color:#333;
                font-size: .14rem;
                margin-top: .14rem;
                line-height: .2rem;
                @include multiellipsis;
            }
            &-person{
                & span{
                    margin-left: .1rem;
                }
                & span:first-of-type{
                    margin-left: 0;
                }
                margin-top: .06rem;
                font-size: .12rem;
                line-height: .17rem;
            }
        }
        &-empty{
          font-size: .16rem;
          color: $iconColor;
        }
        &-icon{
            flex:1;
            text-align: right;
        }
    }
}

</style>
