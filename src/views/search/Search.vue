<template>
    <div class="search">
        <router-link to='/'>
            <i class='iconfont search-icon'>&#xe600;</i>
        </router-link>
        <div class="search-bg">
            <i class='iconfont search-bg-icon'>&#xe651;</i>
            <input type="text" class="search-bg-input" placeholder="请输入商品名称搜索" v-model='searchText'>
            <span class="search-bg-clear" v-if='searchText' @click='handleTextClear'>X</span>
        </div>
        <div class="search-btn" @click='hanleSearchClick(searchText)'>搜索</div>
    </div>
    <div class="list">
        <div class="history"  v-if='historyList.length'>
            <div class="history-title">搜索历史
                <span class="history-title-clear">清楚搜索记录</span>
            </div>
            <div class="history-list">
                <div class="history-list-item" v-for="(item,index) of historyList" :key='index' @click='handleItemClick(item)'>{{item}}</div>
            </div>
        </div>
        <div class="hot">
            <div class="hot-title">热门搜索</div>
            <div class="hot-list">
                <div class="hot-list-item"  v-for="(item,index) of hotList" :key='index' @click='handleItemClick(item)'>{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store/index'
// import { get } from '@/util/public'
export default {
  name: 'OrderList',
  data () {
    return {
      searchText: '',
      hotList: ['尖椒肉丝', '鲜花', '苹果', '橘子', '酸奶', '牛奶', '蛋糕']
    }
  },
  methods: {
    // 清除搜索框
    handleTextClear () {
      this.searchText = ''
    },
    // 点击搜索按钮
    hanleSearchClick (data) {
      store.commit('searchHistory', this.searchText)
    //   const search = async () => {
    //     const result = await get('/api/shop/search', { data })
    //     console.log(result)
    //   }
    //   search()
    },
    // 点击列表搜索
    handleItemClick (item) {
      this.searchText = item
    }
  },
  computed: {
    historyList () {
      return store.state.searchList
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor.scss';
.search{
    margin-top:.16rem;
    display: flex;
    align-items: center;
    &-icon{
        font-size: .21rem;
        margin-left: .185rem;
    }
    &-bg{
        flex: 1;
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
        &-clear{
            display: inline-block;
            width: .15rem;
            height: .15rem;
            line-height: .15rem;
            text-align: center;
            border: .01rem solid $iconColor;
            border-radius: 50%;
            margin-right: .1rem;
        }
    }
    &-btn{
        margin: 0 .18rem 0 .12rem;
        color: $iconColor;
        font-size: .16rem;
    }
}
.list{
    position: absolute;
    top:.48rem;
    left: 0;
    right: 0;
    .history{
        margin: .24rem .18rem 0 .08rem;
        &-title{
            margin-left: .1rem;
            color: iconColor;
            font-size: .16rem;
            font-weight: bolder;
            overflow:hidden;
            &-clear{
                font-size: .14rem;
                font-weight:normal;
                float: right;
            }
        }
        &-list{
            display: flex;
            flex-wrap: wrap;
            &-item{
                font-size: .14rem;
                color: #666;
                padding: .08rem .1rem;
                background: $inputColor;
                border-radius: .03rem;
                margin-left: .1rem;
                margin-top: .12rem;
            }
        }
    }
    .hot{
        margin: .24rem .18rem 0 .08rem;
        &-title{
            margin-left: .1rem;
            color: iconColor;
            font-size: .16rem;
            font-weight: bolder;
            overflow:hidden;
        }
        &-list{
            display: flex;
            flex-wrap: wrap;
            &-item{
                font-size: .14rem;
                color: #666;
                padding: .08rem .1rem;
                background: $inputColor;
                border-radius: .03rem;
                margin-left: .1rem;
                margin-top: .12rem;
            }
        }
    }
}
</style>
