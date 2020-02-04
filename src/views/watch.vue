<template>
  <div>
    {{ value }}
    <button @click="demo.name++">点击改变值</button>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      demo: {
        name: 0
      },
      value: ''
    }
  },
  computed: {
    newName() {
      return this.demo.name
    }
  },
  watch: {
    newName(val) {
      this.value = val
    }
  }
}
</script>
