<template>
    <div class="top">我的全部购物车(2)</div>
    <div class="mask"></div>
    <div class="content" v-if='isHaveProduct'>
      <template  v-for='(item,index,i) in List' :key='index'>
        <div class="item" v-if='item.productsList.length' @click='handleShopJump(i)'>
            <div class="item-name">{{item?.name}}</div>
            <div class="item-product"  v-for='(inneritem,index) in item?.productsList' :key='index'>
                <div class="item-product-img">
                    <img :src="inneritem?.imgUrl" alt="" class="item-product-img-content">
                </div>
                <div class="item-product-info">
                    <div class="item-product-info-name">{{inneritem?.name}}</div>
                    <div class="item-product-info-detail">
                        <span class="item-product-info-detail-count">{{inneritem?.price}}x{{inneritem?.count}}</span>
                        <span class="item-product-info-detail-total">¥{{(inneritem?.price*inneritem?.count).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
            <div class="item-btn" v-if='products[i].productsList.length>2'>
                共计{{products[i].productsList.length}}件/
                <i class='iconfont item-btn-icon' @click='setIsShow(i)' v-html="!item.isShow?'&#xe62d;':'&#xe65b;'"></i>
            </div>
        </div>
      </template>
    </div>
    <div class='empty' v-else>
      <div class="empty-text">购物车还没有商品，快去店铺逛逛吧...</div>
    </div>
    <TabBar :currentIndex='1'/>
</template>
<script>
import TabBar from '@/components/tabbar'
import store from '@/store/index'
export default {
  name: 'OrderList',
  data () {
    return {
      List: ''
    }
  },
  components: {
    TabBar
  },
  methods: {
    getList (index, isShow) {
      const allCartList = this.products
      const curList = JSON.parse(JSON.stringify(allCartList))
      let products = []
      if (isShow) {
        for (const i in allCartList[index].productsList) {
          products.push(allCartList[index].productsList[i])
        }
        curList[index].productsList = products
      } else {
        for (const i in allCartList[index].productsList) {
          products.push(allCartList[index].productsList[i])
        }
        products = products.slice(0, 2)
        curList[index].productsList = products
      }
      this.List = curList
    },
    // 点击隐藏商品列表
    setIsShow (index) {
      this.List[index].isShow = !this.List[index].isShow
      this.getList(index, this.List[index].isShow)
    },
    // 初始化隐藏商品列表
    InitIsShow () {
      this.IsHide()
      for (const i in this.List) {
        const item = this.List[i]
        item.isShow = false
      }
    },
    // 隐藏时
    IsHide () {
      const allCartList = this.products
      const curList = Object.create(allCartList)
      for (const i in allCartList) {
        const shopItem = allCartList[i]
        let curProducts = []
        curList[i] = {}
        curList[i] = allCartList[i]
        for (const j in shopItem.productsList) {
          const item = shopItem.productsList[j]
          if (item.count > 0) {
            curProducts.push(item)
          }
        }
        curProducts = curProducts.slice(0, 2)
        curList[i].productsList = curProducts
      }
      this.List = curList
    },
    // 点击跳转到店铺
    handleShopJump (id) {
      this.$router.push({
        name: 'Shop',
        params: {
          id
        }
      })
    }
  },
  computed: {
    // 商品列表
    products () {
      const allShopList = store.state.shopList
      const products = {}
      for (const i in allShopList) {
        const item = allShopList[i]
        products[i] = {}
        products[i].isShow = this.List[i]?.isShow || false
        products[i].name = item.name
        products[i].productsList = []
        for (const j in item.productsList) {
          if (item.productsList[j].count > 0) products[i].productsList.push(item.productsList[j])
        }
      }
      return products
    },
    // 购物车是否有商品
    isHaveProduct () {
      let isHave = false
      const productsList = store.state.shopList
      for (const i in productsList) {
        const shopItem = productsList[i]
        for (const j in shopItem.productsList) {
          if (shopItem.productsList[j].count > 0) isHave = true
        }
      }
      return isHave
    }
  },
  mounted () {
    this.InitIsShow()
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor.scss';
.top{
    width: 100%;
    height: .44rem;
    line-height: .44rem;
    background: #fff;
    text-align: center;
    font-size: .16rem;
    color: $iconColor;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.mask{
    background: $inputColor;
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    z-index: -1;
}
.empty{
    background: $inputColor;
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    &-text{
      margin-top: .3rem;
      text-align: center;
      font-size: .15rem;
      color: $iconColor;
    }
}
.content{
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    overflow-y: scroll;
    .item{
       width: 3.39rem;
       min-height: 1.78rem;
       border-radius: .05rem;
       background: #fff;
       margin: .16rem auto 0;
       padding:.16rem;
       box-sizing: border-box;
       &-name{
        color: $iconColor;
        font-size: .16rem;
        font-weight: bolder;
       }
       &-product{
            margin-top: .16rem;
            display: flex;
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
                &-name{
                    color: $iconColor;
                    font-size: .14rem;
                }
                &-detail{
                    margin-top: .06rem;
                    display: flex;
                    justify-content: space-between;
                    &-count{
                        color: #E93B3B;
                        font-size: .1rem;
                    }
                    &-total{
                        font-size: .1rem;
                        color: #000;
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
}
</style>
