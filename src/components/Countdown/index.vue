<template>
  <span>获取验证码({{ time }}s)</span>
</template>

<script setup lang='ts'>
import { ref,watch } from 'vue'
// 倒计时
const time = ref<number>(5)
// 接收父组件传递过来的flag
const props = defineProps(['flag'])
// 监听父组件传递过来的值的变化
watch(() => props.flag,() => {
  //开启定时器
  const timer = setInterval(() => {
    time.value --
    if(time.value == 0) {
      // 通知父组件倒计时结束
      $emit('getFlag',false)
      // 清除定时器
      clearInterval(timer)
    }
  },1000)
},{
  immediate: true
})

const $emit = defineEmits(['getFlag'])
</script>

<style scoped lang='scss'>

</style>