<template>
    <HeadContent/>
    <IconList/>
    <NearBy/>
    <TabBar :currentIndex='0'/>
</template>
<script>
import HeadContent from './components/head.vue'
import IconList from './components/iconList.vue'
import NearBy from './components/nearby.vue'
import TabBar from '../../components/tabbar.vue'
export default {
  name: 'Home',
  components: {
    HeadContent,
    IconList,
    NearBy,
    TabBar
  }
}
</script>
