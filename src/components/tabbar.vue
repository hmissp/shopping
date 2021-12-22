<template>
    <div class="tabbar">
        <div :class='{"item":true,"item-active":index===currentIndex}'
        v-for='(item,index) of dataList' :key='index' @click='handleTabClick(index)'>
            <i class="iconfont item-icon" v-html='item.icon'></i>
            <div class="item-text">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'tabbar',
  props: ['currentIndex'],
  data () {
    return {
      dataList: [{ name: '首页', icon: '&#xe7c6;' },
        { name: '购物车', icon: '&#xe6af;' },
        { name: '订单', icon: '&#xe737;' },
        { name: '我的', icon: '&#xe78b;' }]
    }
  },
  methods: {
    handleTabClick (index) {
      if (index === 0) this.$router.push({ name: 'Home' })
      if (index === 1) this.$router.push({ name: 'ShoppingCart' })
      if (index === 2) this.$router.push({ name: 'Order' })
      if (index === 3) this.$router.push({ name: 'My' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/allColor.scss';
.tabbar{
    width: 100%;
    height: .49rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1px 1px 0 #F1F1F1;
    z-index: 5;
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        &-icon{
            font-size:.2rem
        }
        &-text{
            font-size: .1rem;
        }
    }
}
.item-active{
    color:$tabActiveColor;
}
</style>
