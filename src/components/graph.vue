<template>
  <div class="graph">
    <div class="chart" id="myChart" ref="echart"></div>
    <div class="showCode">
      <editor
        v-model="msg"
        @init="editorInit"
        lang="java"
        theme="xcode"
        width="100%"
        height="850"
        ref="myEditor"
      ></editor>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Graph',
  data () {
    return {
      categories: [],
      msg: `
      import java.awt.*;
          import java.awt.event.*;
          import javax.swing.*;/**包含JFrame*/
          public class AppGraphInOut {
              public static  void main(String args[]){
                  new AppFrame();
              }
          }
          
          class AppFrame extends  JFrame
          {
              JTextField in=new JTextField(10);
              JButton btn=new JButton("求平方");
              JLabel out=new JLabel("用于显示平方结果的标签");
              public AppFrame()
              {
                  setLayout(new FlowLayout());
                  getContentPane().add(in);
                  getContentPane().add(btn);
                  getContentPane().add(out);
                  btn.addActionListener(new BtnActionAdapter());
                  setSize(400,100);
                  setDefaultCloseOperation(DISPOSE_ON_CLOSE);
                  setVisible(true);
              }
          
              class BtnActionAdapter implements ActionListener
              {
                  public void actionPerformed(ActionEvent e)
                  {
                      String s=in.getText();
                      double d=Double.parseDouble(s);
                      double sq=d*d;
                      out.setText(d+"的平方是："+sq);
                  }
              }
          }
      `
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  created () {
    // 初始化echarts数据
    this.getData()
  },
  mounted () {
    this.drawLine()
    this.init()
  },
  methods: {
    // 编辑器---------
    editorInit () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/java') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/java') // snippet
    },
    init () {
      let editor = this.$refs.myEditor.editor
      editor.setReadOnly(true)// 设置禁用
      editor.setFontSize(20)
    },
    // 编辑器---------
    getData () {
      for (var i = 0; i < 3; i++) {
        this.categories[i] = {
          name: '层级' + i
        }
      }
    },
    drawLine () {
      var barDv = this.$refs.echart
      if (barDv) {
        let myChart = this.$echarts.init(barDv)
        var option = (option = {
          // 图的标题
          title: {
            text: 'ECharts 关系图'
          },
          // 提示框的配置
          tooltip: {
            formatter: function (item) {
              return item.data.des
            }
          },
          // 工具箱
          toolbox: {
            // 显示工具箱
            show: true,
            feature: {
              mark: {
                show: true
              },
              // 还原
              restore: {
                show: true
              },
              // 保存为图片
              saveAsImage: {
                show: true
              }
            }
          },
          legend: [
            {
              data: this.categories.map(function (item) {
                return item.name
              })
            }
          ],
          series: [
            {
              type: 'graph', // 类型:关系图
              layout: 'force', // 图的布局，类型为力导图
              symbolSize: 40, // 调整节点的大小
              roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [2, 10],
              edgeLabel: {
                normal: {
                  show: true,
                  formatter: function (item) {
                    return item.data.name
                  }
                }
              },
              force: {
                repulsion: 2500,
                edgeLength: [10, 50]
              },
              draggable: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#4b565b'
                }
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {}
                }
              },
              // 数据
              data: [
                {
                  name: 'java01',
                  des: '我是主文件',
                  symbolSize: 70,
                  category: 0
                },
                {
                  name: 'java02',
                  des: '我是java02',
                  symbolSize: 50,
                  category: 1
                },
                {
                  name: 'java03',
                  des: '我是java03',
                  symbolSize: 50,
                  category: 1
                },
                {
                  name: 'java04',
                  des: '我是java04',
                  symbolSize: 50,
                  category: 1
                },
                {
                  name: 'java05',
                  des: '我是java05',
                  symbolSize: 50,
                  category: 1
                },
                {
                  name: 'java06',
                  des: '我是java06',
                  symbolSize: 50,
                  category: 1
                },
                {
                  name: 'java07',
                  des: '我是java07',
                  symbolSize: 50,
                  category: 2
                }
              ],
              links: [
                {
                  source: 'java01',
                  target: 'java02',
                  name: '关系1',
                  des: '我是关系1'
                },
                {
                  source: 'java01',
                  target: 'java03',
                  name: '关系2',
                  des: '我是关系2'
                },
                {
                  source: 'java01',
                  target: 'java04',
                  name: '关系3',
                  des: '我是关系3'
                },
                {
                  source: 'java01',
                  target: 'java05',
                  name: '关系4',
                  des: '我是关系4'
                },
                {
                  source: 'java01',
                  target: 'java06',
                  name: '关系5',
                  des: '我是关系5'
                },
                {
                  source: 'java06',
                  target: 'java07',
                  name: '关系6',
                  des: '我是关系6'
                }
              ],
              categories: this.categories
            }
          ]
        })
        var that = this
        myChart.setOption(option)
        myChart.on('click', function (params) {
          console.log('您点击的是:' + params.data.name)
          that.msg = '您点击的是:' + params.data.name
        })
      } else {
        console.log('bar_dv为空!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.graph {
  display: flex;
  .chart,
  .showCode {
    flex: 3;
    height: 750px;
    width: 100%;
  }
  .showCode {
    flex: 7;
  }
}
</style>
