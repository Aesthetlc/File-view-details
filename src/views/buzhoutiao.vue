<template>
  <div>
    <button @click="hengxiang">横向</button>&nbsp;
    <button @click="zongxiang">纵向</button>
    <h1></h1>
    <div v-show="showFlag">
      <div class="step">
        <el-steps :active="active" align-center finish-status="success" process-status="wait">
          <el-step title="步骤1"></el-step>
          <el-step title="步骤2"></el-step>
          <el-step title="步骤3"></el-step>
        </el-steps>

        <el-steps :active="active" finish-status="success" process-status="wait" simple>
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
      <div class="content">
        <div v-show="step1Flag">
          <editor v-model="step1Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor1"></editor>
        </div>
        <div v-show="step2Flag">
          <editor v-model="step2Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor2"></editor>
        </div>
        <div v-show="step3Flag">
          <editor v-model="step3Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor3"></editor>
        </div>
      </div>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    </div>

    <div v-show="!showFlag">
      <div>
        <el-steps direction="vertical" :active="active" finish-status="success" process-status="wait">
          <el-step title="步骤 1">
            <template slot="description">
              <div :class="step1ZFlag ? 'content' : ''">
                <div v-show="step1ZFlag">
                  <editor v-model="step1Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor1Z"></editor>
                </div>
              </div>
            </template>
          </el-step>
          <el-step title="步骤 2">
            <template slot="description">
              <div :class="step2ZFlag ? 'content' : ''">
                <div v-show="step2ZFlag">
                  <editor v-model="step2Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor2Z"></editor>
                </div>
              </div>
            </template>
          </el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字">
            <template slot="description">
              <div :class="step3ZFlag ? 'content' : ''">
                <div v-show="step3ZFlag">
                  <editor v-model="step3Msg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="400" ref="myEditor3Z"></editor>
                </div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      step1Msg: 'var step = "step1"',
      step2Msg: 'var step = "step2"',
      step3Msg: 'var step = "step3"',
      step1Flag: true,
      step2Flag: false,
      step3Flag: false,
      step1ZFlag: true,
      step2ZFlag: false,
      step3ZFlag: false,
      showFlag: true
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  mounted() {
    this.init()
  },
  computed: {},
  watch: {
    active() {
      if (this.active === 1) {
        this.step1Flag = true
        this.step2Flag = false
        this.step3Flag = false
        this.step1ZFlag = true
        this.step2ZFlag = false
        this.step3ZFlag = false
      }
      if (this.active === 2) {
        this.step2Flag = true
        this.step1Flag = false
        this.step3Flag = false
        this.step2ZFlag = true
        this.step1ZFlag = false
        this.step3ZFlag = false
      }
      if (this.active === 3) {
        this.step3Flag = true
        this.step1Flag = false
        this.step2Flag = false
        this.step3ZFlag = true
        this.step1ZFlag = false
        this.step2ZFlag = false
      }
    }
  },
  methods: {
    zongxiang() {
      this.showFlag = false
    },
    hengxiang() {
      this.showFlag = true
    },
    pre() {
      this.active--
    },
    next() {
      this.active++
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
      let editor1 = this.$refs.myEditor1.editor
      let editor2 = this.$refs.myEditor2.editor
      let editor3 = this.$refs.myEditor3.editor
      let editor1Z = this.$refs.myEditor1Z.editor
      let editor2Z = this.$refs.myEditor2Z.editor
      let editor3Z = this.$refs.myEditor3Z.editor
      editor1.setFontSize(20)
      editor2.setFontSize(20)
      editor3.setFontSize(20)
      editor1Z.setFontSize(20)
      editor2Z.setFontSize(20)
      editor3Z.setFontSize(20)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-step__head.is-success,
/deep/ .el-step__title.is-success {
  color: #409eff;
  border-color: #409eff;
}
.content {
  margin-top: 20px !important;
  height: 100%;
  width: 80vw;
  border: 1px solid #999;
  margin: 0 auto;
}
/deep/ .el-steps--simple {
  width: 65%;
  margin: 0 auto;
  margin-top: 30px;
}
/deep/ .el-steps--vertical {
  width: 65%;
  margin: 0 auto;
}
</style>
