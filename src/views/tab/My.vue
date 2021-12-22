<template>
    <div class="top">
        <div class="ball"></div>
        <i class='iconfont top-icon'>&#xe68b;</i>
        <div class="top-info">
            <div class="top-info-photo">
                <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0607%252F99038e32j00qubdi9001vc000cn00o6c.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642231821&t=d264a9cbd23a48d109e585b9e46e1a56" alt="" class="top-info-photo-content">
            </div>
            <div class="top-info-name">霍先生</div>
            <div class="top-info-id">ID：32262236</div>
            <div class="top-info-wallet">
                <div class="item" v-for="(item,index) of wallet" :key='index'>
                    <div class="item-text">{{item.text}}</div>
                    <div class="item-count">{{item.count}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="content-item" v-for="(item,index) of list" :key='index'>
            <i class='iconfont content-item-icon' v-html="item.icon"></i>
            <span class="content-item-text">{{item.text}}</span>
            <i class='iconfont content-item-to'>&#xe667;</i>
        </div>
    </div>
    <TabBar :currentIndex='3'/>
</template>
<script>
import TabBar from '@/components/tabbar'
export default {
  name: 'OrderList',
  components: {
    TabBar
  },
  data () {
    return {
      wallet: [{ text: '红包', count: 218 },
        { text: '优惠券', count: 12 },
        { text: '仙豆', count: 88 },
        { text: '白条', count: 1000 }],
      list: [{ icon: '&#xe698;', text: '我的钱包' },
        { icon: '&#xe62c;', text: '我的地址' },
        { icon: '&#xe63b;', text: '客服与帮助' }]
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
    width: 3.75rem;
    height: 2.5rem;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    & .ball{
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-image: linear-gradient(239deg, #1a58f5 0%, #76d4fc 100%);
        position: absolute;
        bottom:0;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
    }
    &-icon{
        color:#fff;
        font-size: .24rem;
        position: absolute;
        top: .405rem;
        right:.21rem
    }
    &-info{
        width: 3.39rem;
        height: 2.03rem;
        background:#fff;
        border-radius: .08rem;
        box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
        margin: .915rem auto 0;
        position: relative;
        &-photo{
            width: .94rem;
            height: .94rem;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%,-50%);
            overflow: hidden;
            &-content{
                width: 100%;
            }
        }
        &-name{
            padding-top: .59rem;
            text-align: center;
            color: #262628;
            font-size: .24rem;
            line-height: .36rem;
        }
        &-id{
            padding-top: .02rem;
            text-align: center;
            color: #C1C0C9;
            line-height: .20rem;
        }
        &-wallet{
            margin-top: .12rem;
            border-top: .01rem solid #F1F1F1;
            padding: .12rem 0 .16rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            & .item{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                &-text{
                    color: #C1C0C9;
                    font-size: .12rem;
                    line-height: .17rem;
                }
                &-count{
                    color: #262628;
                    font-size: .20rem;
                    line-height: .28rem;
                }
            }
        }
    }
}
.content{
    position: absolute;
    top:3.105rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.39rem;
    height: 1.46rem;
    border-radius: 8px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .21rem;
        &-icon{
          font-size: .22rem;
          border-radius: .04rem;
        }
        &-text{
            flex: 1;
            margin-left: .12rem;
            justify-self: flex-start;
            color: #262626;
            font-size: .14rem;
            line-height: .20rem;
        }
        &-to{
            justify-self: flex-end;
        }
    }
}
</style>
