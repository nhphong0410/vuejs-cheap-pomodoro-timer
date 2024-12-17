<script setup lang='ts'>
import { ref, watch } from 'vue'

import ButtonComponent from './components/ButtonComponent.vue'
import ProgressComponent from './components/ProgressComponent.vue'
import TimerComponent from './components/TimerComponent.vue'

import { EButtonTypes, ETabs } from './utils/enums'
import { useTimerStore } from './stores/timer'
import { TimerAmounts } from './utils/constants'

const activeTab = ref<ETabs>(ETabs.Focus)

const timerStore = useTimerStore()

const snoozeTimes = [25, 10, 5, 1]

const isActive = (tab: ETabs) => activeTab.value === tab
const snoozeButtonPostFix = (time: number) => Number(time) > 1 ? 's' : ''

const handleTabClick = (tab: ETabs) => {
  activeTab.value = tab
}
const handleStart = () => {
  timerStore.start()
}
const handlePause = () => {
  timerStore.pause()
}
const handleReset = () => {
  timerStore.reset()
  activeTab.value = ETabs.Focus
}

watch(
  activeTab,
  () => timerStore.setTimer({ amount: TimerAmounts[activeTab.value] }),
  { immediate: true }
)
</script>

<template>
  <main class='main'>
    <div class='container'>
      <div class='type-buttons-container'>
        <template v-for='(value) in ETabs' :key='value'>
          <ButtonComponent :type='EButtonTypes.Tab' :active='isActive(value)' @onClick='handleTabClick(value)'>
            {{ value }}
          </ButtonComponent>
        </template>
      </div>
      <TimerComponent />
      <ProgressComponent />
      <div class='snooze-buttons-container'>
        <template v-for='value in snoozeTimes' :key='value'>
          <ButtonComponent :type='EButtonTypes.Text' @onClick='timerStore.add({ amount: value * 60 })'>
            + {{ value }} min{{ snoozeButtonPostFix(value) }}
          </ButtonComponent>
        </template>
      </div>
      <div class='controls-container'>
        <ButtonComponent @onClick='handleStart'>{{ 'Start' }}</ButtonComponent>
        <ButtonComponent @onClick='handlePause'>{{ 'Pause' }}</ButtonComponent>
        <ButtonComponent @onClick='handleReset'>{{ 'Reset' }}</ButtonComponent>
      </div>
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
  gap: 2rem;
  width: fit-content;
  height: fit-content;
}

.type-buttons-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.snooze-buttons-container {
  display: flex;
  gap: 0.5rem;
}

.controls-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
