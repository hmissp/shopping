<template>
    <div class="order">
        <div class="order-title">{{shopName}}</div>
        <div class="order-item" v-for='(item,index) in List' :key='index'>
            <div class="order-item-img">
                <img :src="item.imgUrl" alt="" class="order-item-img-content">
            </div>
            <div class="order-item-info">
                <div class="order-item-info-title">{{item.name}}</div>
                <div class="order-item-info-detail">
                    <span class="order-item-info-detail-price">{{item.price}}x{{item.count}}</span>
                    <span class="order-item-info-detail-total">¥{{(item.price*item.count).toFixed(2)}}</span>
                </div>
            </div>
        </div>
        <div class="order-btn">共计{{products.length}}件/
            <i class='iconfont order-btn-icon' @click='hanleIsShowListClick' v-html="!isShowList?'&#xe62d;':'&#xe65b;'"></i>
        </div>
    </div>
    <div class="bottom">
        <div class="bottom-price">实付金额
            <span class="bottom-price-content">¥{{total.toFixed(2)}}</span>
        </div>
        <div class="bottom-btn" @click='handleCommitClick'>提交订单</div>
    </div>
    <van-dialog v-model:show="toastShow" title="确认要离开收银台？" message='请尽快完成支付，否则将被取消' confirm-button-text='确认支付' cancel-button-text='取消订单'
    :show-cancel-button='true' confirm-button-color='#4FB0F9' @confirm='handleConfirmClick(false)' @cancel='handleConfirmClick(true)'>
    </van-dialog>
</template>
<script>
import { post } from '@/util/request.js'
import store from '@/store/index.js'
export default {
  name: 'OrderList',
  data () {
    return {
      toastShow: false,
      List: '',
      isShowList: false
    }
  },
  methods: {
    // 控制确认支付模态框
    handleCommitClick () {
      this.toastShow = !this.toastShow
    },
    // 是否显示所有商品
    hanleIsShowListClick () {
      if (this.products.length <= 2) return
      this.isShowList = !this.isShowList
      if (!this.isShowList) {
        this.getList()
      } else {
        this.List = this.products
      }
    },
    // 数据赋值给List
    getList () {
      this.List = this.products.slice(0, 2)
    },
    // 提交订单
    handleConfirmClick (isCancel) {
      const confirmer = async () => {
        const order = {
          adressId: this.adressId,
          shopId: this.shopId,
          shopName: this.shopName,
          isCancel,
          products: this.products
        }
        const result = await post('/api/order', order)
        const data = result.data
        if (data.errno === 0 && !isCancel) {
          store.commit('submitOrder', order)
          this.$toast.success({
            message: '支付成功',
            duration: 1000,
            onClose: () => {
              // store.commit('submitOrderClear', this.shopId)
              this.$router.push({
                name: 'Order'
              })
            }
          })
        } else {
          store.commit('submitOrder', order)
          this.$toast.fail({
            message: '支付失败',
            duration: 1000,
            onClose: () => {
              this.$router.push({
                name: 'Order'
              })
            }
          })
        }
      }
      confirmer()
    }
  },
  computed: {
    shopId () {
      return this.$route.params.id
    },
    // 店铺名
    shopName () {
      return store.state.shopList?.[this.shopId]?.name
    },
    // 总额
    total () {
      let total = 0
      this.products.forEach((item) => {
        total += item.price * item.count
      })
      return total
    },
    // 获取商品列表
    products () {
      const shopList = store.state.shopList[this.shopId].productsList
      const productsList = []
      for (const i in shopList) {
        if (shopList[i].count > 0) {
          productsList.push(shopList[i])
        }
      }
      return productsList
    },
    // adressId
    adressId () {
      const adressList = store.state.adressList
      let adressId = null
      adressList.forEach((item) => {
        if (item.default) {
          adressId = item.id
        }
      })
      return adressId
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor.scss';

.order{
    box-sizing: border-box;
    width: 3.39rem;
    margin: .53rem auto 0;
    background: #fff;
    border-radius: .08rem;
    padding: .16rem;
    color:$iconColor;
    &-title{
        font-size: .16rem;
        font-weight: bolder;
    }
    &-item{
        display: flex;
        margin-top: .16rem;
        &-img{
            width: .46rem;
            height: .46rem;
            &-content{
                width: 100%;
            }
        }
        &-info{
            margin-left: .16rem;
            flex: 1;
            &-title{
                font-size:.14rem;
                line-height: .2rem;
            }
            &-detail{
                font-size: .1rem;
                color: #E93B3B;
                margin-top: .06rem;
                overflow: hidden;
                &-total{
                    color: #000;
                    float: right;
                }
            }
        }
    }
    &-btn{
        width: 3.07rem;
        height: .28rem;
        text-align: center;
        line-height: .28rem;
        border-radius: .03rem;
        background: $inputColor;
        margin: .16rem auto 0;
        color:#999;
        font-size: .14rem;
        &-icon{
            display: inline-block;
            vertical-align: middle;
            width: .16rem;
        }
    }
}
.bottom{
    width: 100%;
    height: .49rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    line-height: .49rem;
    &-price{
        flex:1;
        color:$iconColor;
        background: #fff;
        font-size: .14rem;
        padding-left: .24rem;
        &-content{
            color:#151515;
            font-size: .16rem;
            margin-left:.06rem;
        }
    }
    &-btn{
        width: .98rem;
        height: 100%;
        background: #4FB0F9;
        color: #fff;
        font-size: .14rem;
        text-align: center;
    }
}
</style>
