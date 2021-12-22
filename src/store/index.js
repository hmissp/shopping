import { createStore } from 'vuex'
// 获取缓存商品列表
const setShopList = (list) => {
  const data = JSON.stringify(list)
  localStorage.list = data
}
const getShopList = () => {
  try {
    const data = localStorage.list
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}
// 获取缓存地址
const setAdressList = (list) => {
  const data = JSON.stringify(list)
  localStorage.adress = data
}
const getAdressList = () => {
  try {
    const data = JSON.parse(localStorage.adress)
    return data
  } catch (e) {
    return []
  }
}
// 获取订单列表
const setOrderList = (list) => {
  localStorage.order = JSON.stringify(list)
}
const getOrderList = () => {
  try {
    const order = localStorage.order
    return JSON.parse(order)
  } catch (e) {
    return []
  }
}
// 搜索历史
const setSearchList = (list) => {
  localStorage.search = JSON.stringify(list)
}
const getSearchList = () => {
  try {
    const search = localStorage.search
    return JSON.parse(search)
  } catch (e) {
    return []
  }
}
export default createStore({
  state: {
    shopList: getShopList(),
    adressList: getAdressList(),
    orderList: getOrderList(),
    searchList: getSearchList()
  },
  // shopList: {
  //   店铺ID1:{
  //     name:'',
  //     productsList:{
  //        商品id1:{...},
  //        商品id1:{...},
  //      }
  //   },
  //   店铺ID2:{
  //     name:'',
  //     productsList:{
  //        商品id1:{...},
  //        商品id1:{...},
  //      }
  //   },
  // }
  mutations: {
    // 改变商品数量
    changeCount (state, [shopId, shopName, productId, item]) {
      if (!state.shopList[shopId]) {
        state.shopList[shopId] = {}
        state.shopList[shopId].productsList = {}
      }
      state.shopList[shopId].name = shopName
      state.shopList[shopId].productsList[productId] = item
      setShopList(state.shopList)
    },
    // 清空购物车
    clearCart (state, shopId) {
      state.shopList[shopId] = {}
      state.shopList[shopId].productsList = {}
      setShopList(state.shopList)
    },
    // 改变商品选中状态
    changeCheckStatus (state, [shopId, productId]) {
      state.shopList[shopId].productsList[productId].isChecked = !state.shopList[shopId].productsList[productId].isChecked
      setShopList(state.shopList)
    },
    // 改变所有商品选中状态
    changeAllStatus (state, [shopId, allstatus]) {
      const shopIdProducts = state.shopList[shopId].productsList
      if (!allstatus) {
        for (const i in shopIdProducts) {
          const product = shopIdProducts[i]
          product.isChecked = true
        }
      } else {
        for (const j in shopIdProducts) {
          const product = shopIdProducts[j]
          product.isChecked = false
        }
      }
    },
    // 保存地址
    saveAdress (state, adress) {
      const list = state.adressList
      const id = adress.id
      let isHave = false
      if (list.length === 0) {
        list.push(adress)
      } else {
        list.forEach((item, index) => {
          if (item.id === id) {
            isHave = true
          }
        })
        if (!isHave) list.push(adress)
      }
      setAdressList(list)
    },
    // 更改默认地址
    changeDefaultAdress  (state, id) {
      const list = state.adressList
      list.forEach((item, index) => {
        item.default = false
        if (item.id === id) {
          item.default = true
        }
      })
      setAdressList(list)
    },
    // 提交订单
    submitOrder (state, { adressId, shopId, shopName, isCancel, products }) {
      if (!state.orderList) state.orderList = []
      const item = {}
      item.adressId = adressId
      item.shopName = shopName
      item.isCancel = isCancel
      item.productList = products
      state.orderList.push(item)
      setOrderList(state.orderList)
    },
    // 提交订单清空购物车
    submitOrderClear (state, shopId) {
      const productsList = state.shopList[shopId].productsList
      for (const i in productsList) {
        productsList[i].count = 0
      }
      setShopList(state.shopList)
    },
    // 搜索历史
    searchHistory (state, data) {
      if (!state.searchList) state.searchList = []
      let isHave = false
      let isHaveIndex = null
      state.searchList.forEach((item, index) => {
        if (data === item) {
          isHave = true
          isHaveIndex = index
        }
      })
      if (isHave) {
        state.searchList.splice(isHaveIndex, 1)
        state.searchList.unshift(data)
      } else {
        state.searchList.unshift(data)
      }
      setSearchList(state.searchList)
    }
  },
  actions: {
  },
  modules: {
  }
})
