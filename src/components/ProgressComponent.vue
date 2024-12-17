<script lang='ts' setup>
import { useTimerStore } from '@/stores/timer';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const timerStore = useTimerStore()

const { timer } = storeToRefs(timerStore)

const progress = computed(() => ((1 - timer.value.remain / timer.value.total) * 100).toFixed(2))
</script>

<template>
  <div class='progress-container'>
    <div class='progress-bar' :style='{ width: progress + "%" }'></div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  height: 0.25rem;
  background-color: #333333;
  border-radius: 1rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #666666;
  transition: width 0.3s ease-out;
}
</style>
