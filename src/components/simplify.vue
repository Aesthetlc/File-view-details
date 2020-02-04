<template>
  <div class="simplify">
    <div class="chart" id="myChart" ref="echart"></div>
    <!-- Tab -->
    <el-tabs
      class="tabs"
      v-model="editableTabsValue"
      @tab-add="init"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <div class="package">
          <ul>
            <li v-for="item in 5" :key="item" @click="goPackageParticulars(packageMsg)">{{packageMsg}}</li>
          </ul>
        </div>
        <editor
          v-model="item.content"
          @init="editorInit"
          lang="java"
          theme="xcode"
          width="100%"
          height="663"
          ref="myEditor"
        ></editor>
      </el-tab-pane>
    </el-tabs>
    <!-- Tab -->
  </div>
</template>

<script>
export default {
  name: 'Simplify',
  data () {
    return {
      code: `
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
      `,
      packageMsg: `import java.awt.event.`,
      editableTabsValue: 0,
      editableTabs: [],
      tabIndex: 0
    }
  },

  // 注册编辑器组件
  components: {
    editor: require('vue2-ace-editor')
  },

  created () {},

  mounted () {
    // 创建echarts
    this.drawLine()
    // tooltip注册点击事件
    var that = this
    window.goMsgEcharts = function (tooltipName, tooltipCode) {
      var toolData = {
        name: tooltipName,
        // index: 1,
        content: tooltipCode
      }
      var params = {}
      params.data = toolData
      that.addTab(params)
      that.init()
    }
  },

  methods: {
    // 获取文件import包的详情(写的死的数据需要到时候请求)
    goPackageParticulars (packageMsg) {
      var toolData = {
        name: packageMsg,
        content: packageMsg
      }
      var params = {}
      params.data = toolData
      this.addTab(params)
      this.init()
    },

    // 添加Tab
    addTab (params) {
      let index = ''
      let flag = this.editableTabs.some(item => {
        return item.title === params.data.name
      })

      if (!flag) {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: params.data.name,
          name: newTabName,
          content: params.data.content
        })
      }

      // 重复点击的时候定位到指定tab标签页上
      let arr = this.editableTabs.map(item => {
        return item.title
      })

      index = arr.indexOf(params.data.name)

      if (index !== -1) {
        this.editableTabsValue = index + 1 + ''
      }
    },

    // 删除Tab
    removeTab (targetName) {
      // targetName 当前要删除索引
      let tabs = this.editableTabs // editableTabs/tabs 数组
      let activeName = this.editableTabsValue // editableTabsValue/activeName 第几个tab
      if (activeName === targetName) {
        console.log('反正你又进不来')
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.editableTabsValue = activeName
              this.tabIndex = activeName
            } else {
              activeName = 0
              this.tabIndex = 0
            }
          }
        })
      }
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      if (this.editableTabs.length > 0) {
        this.editableTabs.map((item, index) => {
          item.name = index + 1 + ''
        })
        this.editableTabsValue = this.editableTabs[this.editableTabs.length - 1].name
        this.tabIndex = this.editableTabs.length
      }
    },

    // 编辑器样式语言
    editorInit () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/java') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/java') // snippet
    },

    // 初始化init编辑器
    init () {
      this.$nextTick(() => {
        let editor = this.$refs.myEditor[this.$refs.myEditor.length - 1]['editor']
        editor.setReadOnly(true) // 设置禁用
        editor.setFontSize(20)
        editor.gotoLine(33) // 跳转到指定行
      })
    },

    // 绘画echarts
    drawLine () {
      var that = this
      var barDv = this.$refs.echart
      if (barDv) {
        let myChart = this.$echarts.init(barDv)
        var option = {
          tooltip: {
            backgroundColor: 'rgb(178, 178, 178)',
            formatter: function (data) {
              var html = ''
              var tooltipCode = ''
              if (
                data.data.name !== undefined &&
                data.data.children !== undefined
              ) {
                // 循环提示框的内容
                for (var i = 0; i < data.data.children.length; i++) {
                  // data.data.children[i].id ------>id--------->查询出来一个结果
                  // 模拟一个结果
                  tooltipCode = '我就是代码我就是public'
                  html += `<span class="returnTootip" onclick="goMsgEcharts('${data.data.children[i].name}','${tooltipCode}')"> ${data.data.children[i].name}</span><br/>`
                }
                return html
              }
            },
            triggerOn: 'click', // 触发方式
            enterable: true // 鼠标可移入tooltip中
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              color: 'rgb(175, 163, 245)',
              roam: false,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['arrow', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              data: [
                {
                  name: '文件A',
                  // index: 1,
                  content: `
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
      `,
                  children: [{ name: '我是10086', id: 1 }, { name: '我是10010', id: '2' }],
                  x: 0,
                  y: 0
                },
                {
                  name: '文件B',
                  // index: 2,
                  content: 'java2',
                  children: 1,
                  x: 5,
                  y: 0
                },
                {
                  name: '文件C',
                  // index: 3,
                  content: 'java3',
                  children: 1,
                  x: 10,
                  y: 0
                },
                {
                  name: '文件D',
                  // index: 4,
                  content: 'java4',
                  children: 1,
                  x: 15,
                  y: 0
                },
                {
                  name: '文件E',
                  // index: 5,
                  content: 'java5',
                  children: 1,
                  x: 20,
                  y: 0
                }
              ],
              links: [
                {
                  source: '文件A',
                  target: '文件B',
                  symbolSize: [5, 20],
                  lineStyle: {
                    normal: {
                      width: 2,
                      curveness: 0.2
                    }
                  }
                },
                {
                  source: '文件B',
                  target: '文件C',
                  symbolSize: [5, 20],
                  lineStyle: {
                    normal: {
                      width: 2,
                      curveness: 0.2
                    }
                  }
                },
                {
                  source: '文件C',
                  target: '文件D',
                  symbolSize: [5, 20],
                  lineStyle: {
                    normal: {
                      width: 2,
                      curveness: 0.2
                    }
                  }
                },
                {
                  source: '文件D',
                  target: '文件E',
                  symbolSize: [5, 20],
                  lineStyle: {
                    normal: {
                      width: 2,
                      curveness: 0.2
                    }
                  }
                }
              ],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        }
        myChart.setOption(option)
        myChart.on('click', function (params) {
          if (params.data.name !== undefined) {
            // 增加Tab的方法
            that.addTab(params)
            // 初始化ace代码编辑器的样式
            that.init()
          }
        })
      } else {
        console.log('bar_dv为空!')
      }
    }

  }
}
</script>

<style lang="less">
.simplify {
  width: 99.5%;
  border: 1px solid;
  .chart {
    height: 130px;
    border-bottom: 1px solid;
    .returnTootip {
      cursor: pointer;
      pointer-events: all;
    }
  }
  .package {
    overflow: auto;
    cursor: pointer;
    font-size: 20px;
    text-align: left;
    border-bottom: 1px solid;
  }
}
</style>
