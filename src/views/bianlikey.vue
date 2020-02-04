<template>
  <div>--{{ arr }}--</div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        SD16000000000001: [],
        SD16000000000002: [],
        data: {
          SD16000000000003: []
        },
        parmaVal: {},
        jsctext: 'sdsfsdfsfsdew'
      },
      arr: [],
      zzz: {}
    }
  },
  created() {
    this.bianlikey(this.data)
  },
  methods: {
    bianlikey(obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'object') {
          this.bianlikey(obj[key])
          this.arr.push(key)
        } else {
          this.arr.push(key)
        }
      }
    }
  }
}
</script>

<style></style>
