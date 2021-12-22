<template>
    <div class="position">
        <i class='iconfont position-pos'>&#xe619;</i>
        <span class='position-text'>北京理工大学国防科技园2号楼10层</span>
        <i class='iconfont position-remind'>&#xe650;</i>
    </div>
    <div class='search'>
        <i class='iconfont search-icon'>&#xe651;</i>
        <input type="text" placeholder="山姆会员商店优惠商品" class='search-input' @focus="handleSearchFocus">
    </div>
    <div class="banner">
        <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="双11狂欢" class='banner-img'>
    </div>
</template>
<script>
export default {
  name: 'HeadContent',
  methods: {
    // 搜索商品
    handleSearchFocus () {
      this.$router.push({ name: 'Search' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '/src/style/allColor.scss';
.position{
    margin: .16rem .18rem 0;
    display: flex;
    font-size: .16rem;
    align-items: center;
    position: relative;
    &-text{
        margin-left: .085rem;
    }
    &-remind{
        position: absolute;
        right:.01rem;
    }
    .iconfont{
        font-size: .19rem;
        color:$iconColor;
    }
}
.search{
    display: flex;
    align-items: center;
    width: 3.39rem;
    height: .32rem;
    margin: .16rem auto 0;
    background: #f5f5f5;
    border-radius: .16rem;
    color:#b7b7b7;
    &-input{
        border: none;
        outline: none;
        background: $inputColor;
        margin-left: .08rem;
        width: 2.6rem;
        font-size:.14rem;
    }
    .iconfont{
        color:$iconColor;
        font-size: .16rem;
        margin-left: .16rem;
    }
}
.banner{
    width: 3.39rem;
    height: .86rem;
    margin: .12rem auto 0;
    border-radius: .1rem;
    &-img{
        width: 100%;
    }
}
</style>
