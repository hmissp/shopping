<template>
    <div class="wrap">
        <div class="list" >
            <div :class="{'list-item':true,'list-item-active':index === curIndex}" v-for='(item,index) of commodityList'
             :key='index' @click='handleListClick(item.tab,index)'>{{item.name}}</div>
        </div>
        <div class="products">
            <div class="products-item" v-for='(item,index) of contentList' :key='index'>
                <div class="products-item-img">
                    <img :src="item.imgUrl" alt="" class='products-item-img-content'>
                </div>
                <div class="products-item-detail">
                    <div class="products-item-detail-title">{{item.name}}</div>
                    <div class="products-item-detail-sale">月售{{item.sales}}</div>
                    <div class="products-item-detail-price">
                        <span class="products-item-detail-price-cur">{{item.price}}</span>
                        <span class="products-item-detail-price-old">{{item.oldPrice}}</span>
                        <span class='step'>
                            <i class="iconfont step-min" @click='handleChange(item,-1)'>&#xe66d;</i>
                            <span class="step-count">{{
                                store.shopList?.[shopId]?.productsList[item._id]?.count?store.shopList?.[shopId]?.productsList[item._id]?.count:0}}
                            </span>
                            <i class="iconfont step-plus" @click='handleChange(item,+1)'>&#xe8fe;</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { get } from '@/util/request'
import { handleChangeCount } from '@/util/public'
export default {
  name: 'Content',
  props: ['shopName'],
  data () {
    return {
      commodityList: [{ name: '全部商品', tab: 'all' },
        { name: '秒杀', tab: 'seckill' },
        { name: '新鲜水果', tab: 'fruit' }],
      contentList: null,
      curIndex: 0,
      store: this.$store.state
    }
  },
  methods: {
    handleListClick (tab, index) {
      this.getContentList(tab)
      this.setActiveClass(index)
    },
    // 根据点击列表获取相应数据
    getContentList (tab) {
      const getInfo = async () => {
        const result = await get(`/api/shop/${this.shopId}/products`, { tab })
        if (result?.data?.errno === 0) {
          this.contentList = result.data.data
        }
      }
      getInfo()
    },
    // 改变商品数量
    handleChange (item, num) {
      handleChangeCount(item, this.shopId, num, this.shopName)
    },
    // 点击切换激活样式
    setActiveClass (index) {
      this.curIndex = index
    }
  },
  computed: {
    shopId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getContentList()
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/allColor.scss';
.wrap{
    position: absolute;
    top: 1.54rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    display: flex;
    color:$iconColor;
    .list{
        width: .76rem;
        padding-bottom: 5rem;
        background: $inputColor;
        overflow-y: auto;
        &-item{
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            font-size: .14rem;
        }
        &-item-active{
            background: #fff;
        }
    }
    .products{
        flex:1;
        &-item{
            padding: .12rem .16rem;
            display: flex;
            border-bottom: .01rem solid #f1f1f1;
            &-img{
                width: .68rem;
                height: .68rem;
                &-content{
                    width:100%
                }
            }
            &-detail{
                flex:1;
                margin-left: .16rem;
                div{
                    margin-top: .06rem;
                }
                &-title{
                    font-size: .14rem;
                }
                &-sale{
                    font-size: .12rem;
                    line-height: 16px;
                }
                &-price{
                    position: relative;
                    display: flex;
                    align-items: center;
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
                        right: .1rem;
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
}
</style>
