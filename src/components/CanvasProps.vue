<template>
  <div>
    <!-- 选中为空 -->
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleMenuOpen" @close="handleMenuClose">
      <el-submenu index="1">
        <template slot="title">
          <span style="fontSize:20px;font-weight:600">功能菜单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="loadJson" index="1-1">加载json</el-menu-item>
          <el-menu-item @click="showJson" index="1-2">显示json</el-menu-item>
          <el-menu-item @click="saveImg" index="1-3">保存图片</el-menu-item>
          <el-dialog title="加载json" :visible.sync="dialogVisibleLoad" width="80%" :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
              <editor v-model="newMsg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="663" ref="myEditor1"></editor>
              <el-button type="primary" @click="loadJsonData">加 载</el-button>
            </span>
          </el-dialog>
          <el-dialog title="显示json" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
              <editor v-model="editMsg" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="663" ref="myEditor"></editor>
            </span>
          </el-dialog>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div v-if="!props.node && !props.line && !props.multi">
      <div class="title"><p>使用指南</p></div>
      <div class="group">
        <li>方向键：控制节点移动5个像素</li>
        <li>Ctrl + 方向键：控制节点移动1个像素</li>
        <li>Ctrl + 鼠标移动：移动整个画布</li>
        <li>Ctrl + 鼠标滚轮：缩放</li>
        <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
      </div>
    </div>
    <!-- 选中节点 -->
    <div v-if="props.node">
      <div class="title"><p>位置和大小</p></div>
      <div class="items">
        <div class="flex grid">
          <div>X（px）</div>
          <div>
            <el-input-number v-model="props.node.rect.x" controls-position="right" @change="onChange"></el-input-number>
          </div>
          <div class="ml5">Y（px）</div>
          <div class="ml5">
            <el-input-number v-model="props.node.rect.y" controls-position="right" @change="onChange"></el-input-number>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div>宽（px）</div>
          <el-input-number v-model="props.node.rect.width" controls-position="right" @change="onChange"></el-input-number>
          <div class="ml5">高（px）</div>
          <el-input-number v-model="props.node.rect.height" controls-position="right" @change="onChange"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'//导入文件
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleLoad: false,
      editMsg: '',
      newMsg: ''
    }
  },
  props: {
    canvas: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    props: {
      type: Object,
      require: true
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    onChange() {
      this.$emit('change', this.props.node)
    },
    // json展示
    showJson() {
      this.dialogVisible = true
      this.editMsg = JSON.stringify(this.canvas.data, null, 2)
    },
    //加载json
    loadJson() {
      this.dialogVisibleLoad = true
    },
    loadJsonData() {
      this.dialogVisibleLoad = false
      this.canvas.open(JSON.parse(this.newMsg))
    },
    saveImg() {
      let date = moment().format('YYYY-MM-DD HH:mm:ss')
      this.canvas.saveAsImage(date + 'onplat')
    },
    handleClose(done) {
      done()
    },
    // 编辑器样式语言
    editorInit() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/javascript') // snippet
    },

    // 初始化init编辑器
    init() {
      let editor = this.$refs.myEditor.editor
      let editor1 = this.$refs.myEditor1.editor
      editor.setReadOnly(true) // 设置禁用
      editor.setFontSize(20)
      editor1.setFontSize(20)
    },

    handleMenuOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleMenuClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
.star {
  display: block;
  color: #f60 !important;
  text-decoration: underline;
}

.title {
  color: #0d1a26;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

.group {
  margin: 0.1rem 0 0.2rem 0.3rem;
  padding: 0;
  text-align: left;

  a,
  li {
    line-height: 2;
  }

  li {
    list-style: initial;
  }
}

.bottom {
  position: absolute;
  bottom: 0.1rem;
}

.items {
  padding: 0.05rem 0.15rem;

  .el-input-number {
    width: initial;
    line-height: 0.32rem;

    .el-input__inner {
      padding-left: 0;
      height: 2.34rem;
      line-height: 2.34rem;
    }

    .el-input-number__increase {
      line-height: 2.22rem;
    }
  }
}

.formItem {
  margin-bottom: 0.1rem;
}
.el-dialog__wrapper /deep/.el-dialog__body {
  padding: 0 !important;
}
</style>
