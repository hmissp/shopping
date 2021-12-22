<template>
    <TopContent  :dataList='data'/>
    <ContentList :shopName='data.name'/>
    <Cart/>
</template>
<script>
import { get } from '@/util/request'
import TopContent from './components/top.vue'
import ContentList from './components/content.vue'
import Cart from './components/cart.vue'
export default {
  name: 'cart',
  data () {
    return {
      data: ''
    }
  },
  components: {
    TopContent,
    ContentList,
    Cart
  },
  methods: {
    getShopList () {
      const getInfo = async () => {
        const result = await get(`/api/shop/${this.$route.params.id}`)
        if (result?.data?.errno === 0) {
          this.data = result?.data.data
        }
      }
      getInfo()
    }
  },
  mounted () {
    this.getShopList()
  }
}
</script>
<style lang="scss" scoped>

</style>
