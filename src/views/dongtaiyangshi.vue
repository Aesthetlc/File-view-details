<template>
  <div>
    <!-- 三元表达式的形式 -->
    <div :class="isActive ? 'active' : ''">我是第一个</div>
    <br />
    <!-- 对象的形式 -->
    <div :class="{ active: isActive }">我是第二个</div>
    <br />
    <ul v-for="(item, index) in arr" :key="index">
      <li>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      arr: ['哈尔滨', '上海', '北京', '天津']
    }
  }
}
</script>

<style>
.active {
  border: 1px solid red;
}
</style>
