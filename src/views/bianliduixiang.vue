<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        one: {
          name: 'zhangsan',
          age: 18,
          address: '北京'
        },
        two: {
          name: 'lisi',
          age: 20,
          address: '哈尔滨'
        }
      },
      arr: [],
      linshiObj: {}
    }
  },
  created() {
    for (var i in this.obj) {
      let obj = {
        name:this.obj[i].name,
        age:this.obj[i].age
      }
      this.linshiObj[i]=obj
    }
    for (var j in this.linshiObj) {
      this.arr.push(this.linshiObj[j])
    }
    console.log(this.arr)
  }
}
</script>

<style></style>
