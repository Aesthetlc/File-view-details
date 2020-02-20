<template>
  <div id="myChart" :style="{ width: '1300px', height: '600px' }"></div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts', show: true, subtext: '我就是一个复标题', left: 'center', borderColor: 'red', borderWidth: 1 },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true
            },
            restore: {
              show: true
            },
            dataZoom: {
              show: true
            },
            saveAsImage: {
              show: true
            },
            magicType: {
              type: ['line', 'bar']
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter:function(params){
              console.log(params)
              return params.name + '<br/>' + params.value
          }
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            markPoint: {
              data: [
                {
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      })
    }
  }
}
</script>

<style></style>
