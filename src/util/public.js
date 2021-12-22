import store from '@/store/index.js'
export const handleChangeCount = (item, shopId, num, shopName) => {
  const storeItem = store.state.shopList?.[shopId]?.productsList[item._id]
  if (!storeItem) {
    item.count = 0
    item.isChecked = true
  } else {
    item.count = storeItem.count
    item.isChecked = true
  }
  item.count += num
  if (item.count <= 0) {
    item.isChecked = false
    item.count = 0
  }
  store.commit('changeCount', [shopId, shopName, item._id, item])
}
