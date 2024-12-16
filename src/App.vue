<script setup lang='ts'>
import { ref } from 'vue'

import ButtonComponent from './components/ButtonComponent.vue'
import ProgressComponent from './components/ProgressComponent.vue'
import TimerComponent from './components/TimerComponent.vue'
import { ButtonType, Tabs } from './utils/enums'

const activeTab = ref<Tabs>(Tabs.Focus)

const isActive = (tab: Tabs) => activeTab.value === tab
const handleTabClick = (tab: Tabs) => activeTab.value = tab
</script>

<template>
  <main class='main'>
    <div class='container'>
      <div class='type-buttons-container'>
        <template v-for='tab in Object.values(Tabs)' :key='tab'>
          <ButtonComponent :type='ButtonType.Tab' :active='isActive(tab)' @onClick='handleTabClick(tab)'>
            {{ tab }}
          </ButtonComponent>
        </template>
      </div>
      <TimerComponent />
      <ProgressComponent />
      <div class='add-time-buttons-container'>
        <ButtonComponent :type='ButtonType.Text'>+ 25 min</ButtonComponent>
        <ButtonComponent :type='ButtonType.Text'>+ 10 min</ButtonComponent>
        <ButtonComponent :type='ButtonType.Text'>+ 5 min</ButtonComponent>
        <ButtonComponent :type='ButtonType.Text'>+ 1 min</ButtonComponent>
      </div>
      <div class='controls-container'>
        <ButtonComponent>{{ 'Start' }}</ButtonComponent>
        <ButtonComponent>{{ 'Pause' }}</ButtonComponent>
        <ButtonComponent>{{ 'Reset' }}</ButtonComponent>
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

.add-time-buttons-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.controls-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
