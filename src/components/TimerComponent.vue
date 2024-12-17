<script lang='ts' setup>
import { useTimerStore } from '@/stores/timer';

const timerStore = useTimerStore()

const formatTime = (time: number) => time.toString().padStart(2, '0')
</script>

<template>
  <div class='timer-container'>
    <span>{{ formatTime(timerStore.h) }}</span>
    <span>:</span>
    <span>{{ formatTime(timerStore.m) }}</span>
    <span>:</span>
    <span>{{ formatTime(timerStore.s) }}</span>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 5rem;
  font-weight: 700;
}
</style>
