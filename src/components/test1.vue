<template>
  <div class="editor">
    <editor v-model="msg" @init="editorInit" lang="java" theme="xcode" width="100%" height="390" ref="myEditor"></editor>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      msg: ''
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  created() {
  },
  mounted() {
    window.first = this.init
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
    init(value) {
      if(value !== undefined && value!==''){
         this.msg = value 
      }
      let editor = this.$refs.myEditor.editor
      editor.setReadOnly(true) // 设置禁用
      editor.setFontSize(20)
    }
  }
}
</script>

<style scoped lang="less"></style>
