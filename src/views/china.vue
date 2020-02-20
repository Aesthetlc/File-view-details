<template>
  <div>
    <input type="text" v-model="addressName" /><button @click="searchCity">查询</button>
    <div ref="myChart" style="width:1000px;height:800px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      location: '',
      chartData: [],
      addressName: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    searchCity() {
      this.$jsonp('http://api.map.baidu.com/geocoding/v3/?address='+this.addressName+'&output=json&ak=iyufQYBqqtynBcxiq2wpedoZc4kKnaDr&callback=showLocation')
        .then(res => {
          this.location = res.result.location
          this.chartData.push({
            name: this.addressName,
            value: [this.location.lng, this.location.lat]
          })
          this.drawMap()
        })
        .catch(error => {
          console.log(error)
        })
    },
    drawMap() {
      let myChart = this.$echarts.init(this.$refs.myChart)
      var option = {
        backgroundColor: '#404a59',
        title: {
          text: '2016要去的地方',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: '地址',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.chartData,
            symbolSize: function() {
              return 10
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
