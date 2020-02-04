<template>
  <div>数据请求</div>
</template>

<script>
import api from '../axios/api.js'
export default {
  name: 'Simulation',
  data () {
    return {
      dataShow: []
    }
  },
  created () {
    this.getdata()
  },
  components: {
  },
  mounted () {
  },
  methods: {
    getdata: function () {
      api.mockdata('/data/index').then(res => {
        console.log(res)
        this.dataShow = res.data
      })
    }
  }
}
</script>

<style scoped>
</style>
