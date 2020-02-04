<template>
  <div class="two">
    <table border="1px solid #666" style="width:500px;">
      <thead>
        <tr>
          <th>序号</th>
          <th>商品名称</th>
          <th>商品单价</th>
          <th>购买数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shop, index) in shoplist" :key="index">
          <td>{{ shop.id }}</td>
          <td>{{ shop.name }}</td>
          <td>{{ shop.price }}</td>
          <td>
            <button @click="reduce(shop)" :disabled="shop.count === 1">-</button>
            {{ shop.count }}
            <button @click="add(shop)">+</button>
          </td>
          <td>
            <button @click="remove(index)">移除</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>总价：</td>
          <td colspan="5">￥{{ totalCount }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟数据
      shoplist: [
        { id: 1, name: 'phone7', price: 2000, count: 1 },
        { id: 2, name: 'phone8', price: 1000, count: 1 },
        { id: 3, name: 'phone6', price: 3000, count: 1 },
        { id: 4, name: 'phone9', price: 1500, count: 1 }
      ]
    }
  },
  computed: {
    // 计算商品总价
    totalCount() {
      let totalprice = 0
      // for(let i = 0; i < this.shoplist.length; i++){
      //     let item = this.shoplist[i]
      //     console.log(item)
      //     totalprice +=item.price * item.count
      // }
      // 遍历拿到每一个商品对象的价格 和 数量，然后把乘积返回
      this.shoplist.forEach(a => {
        totalprice += a.price * a.count
      })
      return totalprice
    }
  },
  //方法
  methods: {
    // 商品数量--的操作函数
    reduce(shop) {
      // 判断 如果数量为1时，不让数量再减
      if (shop.count === 1) return
      //  否则的话就每次点击减1
      shop.count--
    },
    // 反之，加加操作就简单了 ，直接把数量点击加1就行了
    add(shop) {
      // console.log(index)
      shop.count++
      // this.shoplist[index].count++
    },
    //删除按钮，因为是练习模拟一下，真实项目需要点击删除的时候获取商品的id，然后传到后台的接口进行删除
    remove(index) {
      this.shoplist.splice(index, 1)
    }
  }
}
</script>

<style>
table tr {
  text-align: center;
}
</style>
