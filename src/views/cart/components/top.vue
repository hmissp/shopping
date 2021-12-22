<template>
    <div class="wrap">
        <div class="search">
            <router-link to='/'>
                <i class='iconfont search-icon'>&#xe600;</i>
            </router-link>
            <div class="search-bg">
                <i class='iconfont search-bg-icon'>&#xe651;</i>
                <input type="text" class="search-bg-input" placeholder="请输入商品名称搜索">
            </div>
        </div>
        <div class="item">
            <div class="item-img">
                <img src="http://www.dell-lee.com/imgs/vue3/near.png" alt="" class="item-img-content">
            </div>
            <div class="item-info">
                <div class="item-info-title">{{dataList.name}}</div>
                <div class="item-info-detail">
                    <span class="item-info-detail-sales">起售{{dataList.sales}}</span>
                    <span class="item-info-detail-limit">起送 ¥{{dataList.expressLimit}}</span>
                    <span class="item-info-detail-price">基础运费 ¥{{dataList.expressPrice}}</span>
                </div>
                <div class="item-info-activity">
                    <div class="item-info-activity-slogan">{{dataList.slogan}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'headContent',
  props: ['dataList']
}
</script>
<style lang="scss" scoped>
@import '../../../style/allColor.scss';
.iconfont{
    color:#b6b6b6;
}
.wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 3;
}
.search{
    margin-top:.16rem;
    display: flex;
    align-items: center;
    &-icon{
        font-size: .21rem;
        margin-left: .185rem;
    }
    &-bg{
        width: 3.1rem;
        height: .32rem;
        background: $inputColor;
        border-radius: .16rem;
        margin-left: 16px;
        display: flex;
        align-items: center;
        &-icon{
            font-size: .16rem;
            margin-left: .16rem;
        }
        &-input{
            border:none;
            outline: none;
            margin: 0 .12rem;
            flex: 1;
            font-size: .14rem;
            background: $inputColor;
        }
    }
}
.item{
    margin-top: .16rem;
    display: flex;
    &-img{
        width: .56rem;
        height: .56rem;
        margin-left:.18rem;
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
</style>
