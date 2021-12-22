<template>
    <div class="mask"></div>
    <div class="top">
        <i class='iconfont top-icon' @click='handleBackClick'>&#xe600;</i>
        <span class='top-administer'>新建收货地址</span>
        <span class='top-new' @click='handleSaveClick'>保存</span>
    </div>
    <div class="content">
        <div class="content-city">所在城市:
            <input type="text" class="content-city-input" placeholder="如北京市" v-model='data.city'>
        </div>
        <div class="content-school">小区/大学/大厦:
            <input type="text" class="content-school-input" placeholder="如清华大学" v-model='data.school'>
        </div>
        <div class="content-doorplate">楼号-门牌号:
            <input type="text" class="content-doorplate-input" placeholder="如A号楼" v-model='data.doorplate'>
        </div>
        <div class="content-person">收货人:
            <input type="text" class="content-person-input" placeholder="请填写收货人姓名" v-model.number='data.name'>
        </div>
        <div class="content-phone">联系电话:
            <input type="text" class="content-phone-input" placeholder="请填写收货人姓手机号" v-model='data.phone' pattern='^[0-9]{11}$'>
        </div>
    </div>
</template>
<script>
import store from '@/store/index.js'
export default {
  name: 'NewAdress',
  data () {
    return {
      data: {
        city: '',
        school: '',
        doorplate: '',
        name: '',
        phone: '',
        id: this.setAdressId()
      },
      adressId: this.$route.params.adressId
    }
  },
  methods: {
    //   返回
    handleBackClick () {
      this.$router.back()
    },
    // 保存
    handleSaveClick () {
      store.commit('saveAdress', this.data)
      this.$router.back()
    },
    // 设置地址ID
    setAdressId () {
      const num = Math.floor(Math.random() * 1000)
      return num
    },
    getadressList (id) {
      const list = store.state.adressList
      let data = null
      list.forEach((item) => {
        if (item.id === parseInt(id)) {
          data = item
        }
      })
      this.data = data
      if (!id) {
        this.data = {
          city: '',
          school: '',
          doorplate: '',
          name: '',
          phone: '',
          id: this.setAdressId()
        }
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getadressList(this.adressId)
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/allColor';
.mask{
  background: $inputColor;
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.top{
  width: 100%;
  height: .44rem;
  line-height: .44rem;
  display: flex;
  justify-content: space-between;
  font-size: .16rem;
  color: $iconColor;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  &-icon{
    margin-left: .184rem;
    color: #B6B6B6;
  }
  &-new{
    font-size: .14rem;
    margin-right: .18rem;
  }
}
.content{
    background: #fff;
    position: absolute;
    top: .56rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: scroll;
    & div{
        height: .44rem;
        line-height: .44rem;
        margin: 0 .18rem;
        font-size: .14rem;
        color:#666;
        border-bottom: .01rem solid  #F1F1F1;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        & input{
            flex: 1;
            height: .4rem;
            border: none;
            outline: none;
            color: #3F3F3F;
            text-indent: .1rem;
        }
    }
}
</style>
