<template>
    <div class="mask"></div>
    <div class="top">我的订单</div>
    <div class="content" v-if='isHaveOrder'>
        <div class="content-item" v-for='(item,index) of orderList' :key='index'>
            <div class="content-item-top">
                <div class="content-item-top-title">{{item.shopName}}</div>
                <div class="content-item-top-cancel">{{item.isCancel?'已取消':'已支付'}}</div>
            </div>
            <div class="content-item-list" >
                <div class="content-item-list-img" v-for='(innerItem,index) of item.productList' :key='index'>
                    <img :src="innerItem.imgUrl" alt="" class="content-item-list-img-content">
                </div>
                <div class="content-item-list-info">
                    <div class="content-item-list-info-price">¥{{item.total}}</div>
                    <div class="content-item-list-info-count">共{{item.allCount}}件</div>
                </div>
            </div>
        </div>
    </div>
    <div class="empty">
        <div class="empty-text">还没有下单，快去逛逛吧...</div>
    </div>
    <TabBar :currentIndex='2'/>
</template>
<script>
import TabBar from '@/components/tabbar'
import store from '@/store/index'
export default {
  name: 'Order',
  components: {
    TabBar
  },
  computed: {
    orderList () {
      const list = store.state.orderList
      for (const i in list) {
        let total = 0
        let allCount = 0
        list[i].productList.forEach((item) => {
          total += item.price * item.count
          allCount += item.count
        })
        list[i].total = total.toFixed(2)
        list[i].allCount = allCount
      }
      return store.state.orderList
    },
    //   是否已经有订单
    isHaveOrder () {
      const list = store.state.orderList
      let isHave = false
      if (list.length > 0) isHave = true
      return isHave
    }
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
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
}
.empty{
    background: $inputColor;
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    z-index: -1;
    &-text{
      margin-top: .3rem;
      text-align: center;
      font-size: .15rem;
      color: $iconColor;
    }
}
.content{
    background: $inputColor;
    width: 100%;
    position: absolute;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    overflow-y: scroll;
    &-item{
        width: 3.39rem;
        height: 1.1rem;
        margin: .16rem auto 0;
        border-radius: .05rem;
        background: #fff;
        padding: .16rem;
        box-sizing: border-box;
        &-top{
            display: flex;
            justify-content: space-between;
            &-title{
                color: $iconColor;
                font-size: .16rem;
                font-weight: bolder;
            }
            &-cancel{
                color: #999;
                font-size: .14rem;
            }
        }
        &-list{
            margin-top: .06rem;
            display: flex;
            align-items: center;
            &-img{
                width: .4rem;
                height: .4rem;
                display: flex;
                margin-left: .12rem;
                &-content{
                    width: 100%;
                }
                & img:first-of-type{
                margin-left: 0;
                }
            }
            &-info{
                flex: 1;
                text-align: right;
                &-price{
                    color: #E93B3B;
                    font-size: .14rem;
                }
                &-count{
                    color: $iconColor;
                    font-size: .12rem;
                }
            }
        }
    }
}
</style>
