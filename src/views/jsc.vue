<template>
  <div class="main">
    <editor v-model="textarea" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="380" ref="myEditor"></editor>
    <el-button type="primary" @click="zhixing">执行</el-button>

    <div v-show="dialogVisible" class="tan">
      <button @click="close">关闭</button>
      <test1 v-show="showFlag"></test1>
    </div>
  </div>
</template>

<script>
import test1 from '@/components/test1.vue'
export default {
  data() {
    return {
      textarea: '',
      dialogVisible: false,
      showFlag: false
    }
  },
  components: {
    test1,
    editor: require('vue2-ace-editor')
  },
  mounted() {
    this.init()
  },
  created() {},
  methods: {
    zhixing() {
      let start = this.textarea.indexOf('.')
      let end = this.textarea.indexOf('(')
      if (this.textarea.substring(start + 1, end) === 'first') {
        this.dialogVisible = true
        this.showFlag = true
        eval(this.textarea)
      }
    },
    editorInit() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/javascript') // snippet
    },
    init() {
      let editor = this.$refs.myEditor.editor
      editor.setFontSize(20)
    },
    close(){
      this.dialogVisible = false
    }
  }
}
</script>

<style>
.main{
  /* position: relative; */
  width: 100%;
  height: 100%;
}
.tan{
  position: absolute;
  top: 10%;
  left: 25%;
  width: 1000px;
  background-color: #fff;
  z-index: 10000;
  border: 1px solid #000;
  padding: 5px;
}

</style>
