<template>
    <div class="wrap">
        <div class="title">附近店铺</div>
        <template v-for='(item,index) of nearList' :key='item._id'>
            <router-link :to="`/shop/${index}`">
                <div class="item" >
                    <div class="item-img">
                        <img :src="item.imgUrl" alt="" class="item-img-content">
                    </div>
                    <div class="item-info">
                        <div class="item-info-title">{{item.name}}</div>
                        <div class="item-info-detail">
                            <span class="item-info-detail-sales">月售{{item.sales}}</span>
                            <span class="item-info-detail-limit">起送 ¥{{item.expressLimit}}</span>
                            <span class="item-info-detail-price">基础运费 ¥{{item.expressPrice}}</span>
                        </div>
                        <div class="item-info-activity">
                            <div class="item-info-activity-slogan">{{item.slogan}}</div>
                        </div>
                    </div>
                </div>
            </router-link>
        </template>
    </div>
</template>
<script>
import { get } from '../../../util/request'
export default {
  name: 'nearby',
  data () {
    return {
      nearList: null
    }
  },
  methods: {
  },
  mounted () {
    const near = async () => {
      const result = await get('/api/shop/hot-list')
      const data = result.data
      if ((data.errno === 0) && data.data.length) {
        this.nearList = data.data
      }
    }
    near()
  }
}
</script>
<style lang="scss" scoped>
@import '/src/style/allColor.scss';
.wrap{
    margin:.16rem 0 0 .18rem;
    color:$iconColor;
    .title{
        font-size: .18rem;
        font-weight: bolder;
    }
    .item{
        margin-top: .12rem;
        display: flex;
        &-img{
            width: .56rem;
            height: .56rem;
            &-content{
                width: 100%;
            }
        }
        &-info{
            flex:1;
            margin-left: .16rem;
            margin-right: .18rem;
            font-size:.13rem;
            padding-bottom:.12rem;
            border-bottom: .01rem solid #f1f1f1;
            &-title{
                font-size:.16rem;
                font-weight:600;
                color:$iconColor;
            }
            &-detail{
                margin-top: .08rem;
                color:$iconColor;
                & span{
                    margin-right: .16rem;
                }
            }
            &-activity{
                margin-top: .08rem;
                color:#E93B3B;
            }
        }
    }
}
</style>
