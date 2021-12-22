<template>
    <div class="wrap">
        <div class="item" v-for='item of iconList' :key='item.desc'>
            <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" class='item-icon'>
            <div class="item-name">{{item.imgName}}</div>
        </div>
    </div>
    <div class="line"></div>
</template>
<script>
export default {
  name: 'IconList',
  data () {
    return {
      iconList: [
        { imgName: '超市', desc: '超市便利' },
        { imgName: '菜市场', desc: '菜市场' },
        { imgName: '水果店', desc: '水果店' },
        { imgName: '鲜花', desc: '鲜花绿植' },
        { imgName: '医药健康', desc: '医药健康' },
        { imgName: '家居', desc: '家居时尚' },
        { imgName: '蛋糕', desc: '烘培蛋糕' },
        { imgName: '签到', desc: '签到' },
        { imgName: '大牌免运', desc: '大牌免运' },
        { imgName: '红包', desc: '红包套餐' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '/src/style/allColor.scss';
.wrap{
    margin: .16rem .06rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .16rem;
        &-icon{
            width: .4rem;
            height: .4rem;
            border-radius:50%;
        }
        &-name{
            margin-top: .06rem;
            font-size:.12rem;
            color:$iconColor;
        }
    }
}
.line{
     width: 100%;
     height: .1rem;
     background: #f1f1f1;
    }
</style>
