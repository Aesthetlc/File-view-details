<template>
  <div>
    <code-diff :old-string="oldStr" :new-string="newStr" :context="9999" outputFormat="side-by-side" />
  </div>
</template>

<script>
import CodeDiff from 'vue-code-diff'
export default {
  components: { CodeDiff },
  data () {
    return {
      oldStr: `
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
              `,
      newStr: `
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
              JButton btn=neew JButton("求平方");
              JLabel out=new JLabel("用于显示平方结果的标签");
              public AppFrame()
              {
                  setLayout(new FlowLayout());
                  getContentPane().add(in);
                  getContentPane().add(btn);
                  getContentePane().add(out);
                  btn.addActionListener(new BtnActionAdapter());
                  setSize(400,100);
                  setDefaultCloseOperation(DISPOSE_ON_CLOSE);
                  setVisible(true);
              }
              `
    }
  }
}
</script>
