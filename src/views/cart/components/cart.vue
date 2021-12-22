<template>
  <div class="mask" v-if="isShowCart" @click='hanleMaskClick'></div>
  <div class="wrap">
    <div class="product" v-if='isShowCart'>
      <div class="product-header" v-if='Object.keys(cartList).length'>
        <div class="product-header-all">
          <div class="iconfont product-header-all-ischecked" v-html="AllChecked?'&#xe67e;':'&#xe67f;'"
          @click='hanleAllChecked(item,AllChecked)'></div>
          <div class="product-header-all-text">全选</div>
        </div>
        <div class="product-header-empty" @click='hanleClearCart'>清空购物车</div>
      </div>
      <div class="product-item" v-for='(item,index) of cartList' :key='index'>
          <i class='iconfont product-item-ischecked' v-html="item.isChecked?'&#xe67e;':'&#xe67f;'" @click='handleIsChecked(item)'></i>
          <div class="product-item-img">
              <img :src="item.imgUrl" alt="" class='product-item-img-content'>
          </div>
          <div class="product-item-detail">
              <div class="product-item-detail-title">{{item.name}}</div>
              <div class="product-item-detail-price">
                  <span class="product-item-detail-price-cur">{{item.price}}</span>
                  <span class="product-item-detail-price-old">{{item.oldPrice}}</span>
                  <span class='step'>
                      <i class="iconfont step-min" @click='handleChange(item,-1)'>&#xe66d;</i>
                      <span class="step-count">
                        {{store.shopList?.[shopId]?.productsList[item._id]?.count?store.shopList?.[shopId]?.productsList[item._id]?.count:0}}
                      </span>
                      <i class="iconfont step-plus" @click='handleChange(item,+1)'>&#xe8fe;</i>
                  </span>
              </div>
          </div>
      </div>
    </div>
    <div class="check">
        <div class="check-info">
            <i class='iconfont check-info-icon' @click.self='handleIsShow'>&#xe6af;
                <span class="check-info-icon-count"  v-if="allCount">{{allCount}}</span>
            </i>
            <span class="check-info-price" v-if="allCount">
              <span class="check-info-price-text">总计:</span>
              <span class="check-info-price-total">{{total}}</span>
            </span>
            <div class="check-info-empty" v-else>购物车是空的</div>
        </div>
        <div class="check-btn" @click='handlePayClick'>去结算</div>
    </div>
  </div>
</template>
<script>
import { handleChangeCount } from '@/util/public'
import store from '@/store/index.js'
export default {
  name: 'Cart',
  data () {
    return {
      store: this.$store.state,
      isShowCart: false,
      isChecked: true
    }
  },
  methods: {
    // 点击遮罩隐藏
    hanleMaskClick () {
      this.isShowCart = false
    },
    // 改变商品数量
    handleChange (item, num) {
      handleChangeCount(item, this.shopId, num)
    },
    // 清空购物车
    hanleClearCart () {
      this.isShowCart = false
      store.commit('clearCart', this.shopId)
    },
    // 是否显示购物车列表
    handleIsShow () {
      this.isShowCart = !this.isShowCart
    },
    // 更改商品选中状态
    handleIsChecked (item) {
      store.commit('changeCheckStatus', [this.shopId, item._id])
    },
    // 更改所有商品选中状态
    hanleAllChecked (item, allstatus) {
      store.commit('changeAllStatus', [this.shopId, allstatus])
    },
    // 去结算
    handlePayClick () {
      if (this.allCount) {
        this.$router.push({
          name: 'OrderConfirmation',
          query: {
            id: this.$route.params.id
          }
        })
      }
    }
  },
  computed: {
    // 获取商品数量
    allCount () {
      let count = 0
      for (const i in store.state.shopList[this.shopId]?.productsList) {
        const item = store.state.shopList[this.shopId].productsList[i]
        if (item.isChecked) count += item.count
      }
      return count
    },
    // 获取加入购物车的商品
    shopId () {
      return this.$route.params.id
    },
    // 获取购物车信息
    cartList () {
      const products = store.state.shopList[this.shopId]?.productsList || {}
      const list = {}
      for (const i in products) {
        const product = products[i]
        if (product.count > 0) {
          list[i] = products[i]
        }
      }
      return list
    },
    // 获取总价
    total () {
      const products = store.state.shopList[this.shopId]?.productsList || {}
      let total = 0
      for (const i in products) {
        const product = products[i]
        if (product.isChecked && product.count > 0) total += product.price * product.count
      }
      return total.toFixed(2)
    },
    // 是否全选
    AllChecked () {
      const products = store.state.shopList[this.shopId]?.productsList
      let result = true
      for (const i in products) {
        const product = products[i]
        if (!product.isChecked) result = false
      }
      return result
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/allColor.scss';
.iconfont{
  color: #0091FF;
  font-size: .2rem;
}
.mask{
  background: rgba(0,0,0,.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}
.wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    .product{
      &-header{
        width: 100%;
        height: .52rem;
        background: #fff;
        border-bottom: .01rem solid #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .14rem;
        color: $iconColor;
        &-all{
          margin-left: .18rem;
          display: flex;
          align-items: center;
          &-checked,&-unchecked{
            margin-left: .084rem;
          }
        }
        &-empty{
          margin-right:.18rem;
        }
      }
      &-item{
            display: flex;
            align-items: center;
            background: #fff;
            padding-top: .16rem;
            &-ischecked{
              margin-left: .18rem;
            }
            &-img{
                width: .46rem;
                height: .46rem;
                margin-left: .16rem;
                &-content{
                    width:100%
                }
            }
            &-detail{
                flex:1;
                margin-left: .16rem;
                position: relative;
                &-title{
                    font-size: .14rem;
                }
                &-price{
                    display: flex;
                    align-items: center;
                    margin-top: .06rem;
                    &-cur{
                        color:#E93B3B;
                        font-size: .1rem;
                    }
                    &-old{
                        color:#999;
                        font-size: .1rem;
                        text-decoration: line-through;
                        margin-left: .06rem;
                    }
                    .step{
                        position: absolute;
                        right:.18rem;
                        top: 50%;
                        transform: translateY(-50%);
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        *{
                            display: inline-block;
                            text-align: center;
                            width: .2rem;
                            height: .2rem;
                            margin: .025rem;
                        }
                        &-count,&-plus{
                            line-height: .2rem;
                        }
                        &-min,&-plus{
                            font-size: .2rem;
                        }
                        &-plus{
                            background: #0091FF;
                            border-radius: 50%;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .check{
        color:$iconColor;
        width: 100%;
        height: .49rem;
        display: flex;
        align-items: center;
        &-info{
            height:100%;
            flex: 1;
            background: #fff;
            display: flex;
            align-items: center;
            &-icon{
                display: inline-block;
                font-size: .28rem;
                margin-left: .24rem;
                position: relative;
                &-count{
                    display: inline-block;
                    min-width: 0;
                    height: .2rem;
                    font-size: .1rem;
                    text-align: center;
                    line-height: .2rem;
                    color:#fff;
                    background: #E93B3B;
                    border-radius: .1rem;
                    padding: 0 .1rem;
                    position: absolute;
                    top: -0.05rem;
                    left: .18rem;
                    transform: scale(.7);
                    transform-origin: left top;
                }
            }
            &-price{
              display: flex;
              align-items: center;
              &-text{
                  margin-left: .32rem;
              }
              &-total{
                  color: #E93B3B;
                  font-size: .18rem;
                  margin-left: .06rem;
              }
            }
            &-empty{
              margin-left: .32rem;
              font-size: .12rem;
            }
        }
        a{
          display: block;
          height: 100%;
        }
        &-btn{
            width: .98rem;
            color: #fff;
            height: 100%;
            background: #4FB0F9;
            font-size: .14rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
