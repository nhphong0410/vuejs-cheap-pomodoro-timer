<script setup lang='ts'>
import ProgressComponent from './components/ProgressComponent.vue'
import TimerComponent from './components/TimerComponent.vue'

</script>

<template>
  <main class='main'>
    <div class='container'>
      <TimerComponent />
      <ProgressComponent />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: fit-content;
  height: fit-content;
}
</style>
