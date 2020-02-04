<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">编辑器</router-link> |
      <router-link to="/comparison">对比工具</router-link>|
      <router-link to="/graph">图表</router-link>|
      <router-link to="/simplify">简化图表</router-link>|
      <router-link to="/simulation">模拟数据请求</router-link>|
      <router-link to="/tree">tree</router-link>|
      <router-link to="/biabliduixiang">遍历对象</router-link>|
      <router-link to="/jisuanshuxing">计算属性</router-link>|
      <router-link to="/watch">watch</router-link>|
      <router-link to="/bianlikey">遍历key</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
