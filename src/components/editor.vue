<template>
  <div class="editor">
    <editor v-model="msg" @init="editorInit" lang="java" theme="xcode" width="100%" height="780" ref="myEditor"></editor>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
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
  mounted() {
    this.init()
  },
  methods: {
    editorInit() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/java') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/java') // snippet
    },
    init() {
      let editor = this.$refs.myEditor.editor
      editor.setReadOnly(true) // 设置禁用
      editor.setFontSize(20)
    }
  }
}
</script>

<style scoped lang="less"></style>
