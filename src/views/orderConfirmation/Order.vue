<template>
    <Aderss/>
    <OrderList/>
</template>
<script>
import Aderss from './components/adress.vue'
import OrderList from './components/orderList.vue'
export default {
  name: 'Order',
  components: {
    Aderss,
    OrderList
  }
}
</script>
<style lang="scss" scoped>

</style>
