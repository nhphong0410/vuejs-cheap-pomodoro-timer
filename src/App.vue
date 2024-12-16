<script setup lang='ts'>
import { computed, ref } from 'vue';

import ButtonComponent from './components/ButtonComponent.vue';
import ProgressComponent from './components/ProgressComponent.vue'
import TimerComponent from './components/TimerComponent.vue'
import { ButtonType, Tabs } from './utils/enums';

const activeTab = ref<Tabs>(Tabs.Focus);

const isFocus = computed(() => activeTab.value === Tabs.Focus)
const isShortBreak = computed(() => activeTab.value === Tabs.ShortBreak)
const isLongBreak = computed(() => activeTab.value === Tabs.LongBreak)
</script>

<template>
  <main class='main'>
    <div class='container'>
      <div class='type-buttons-container'>
        <ButtonComponent :type='ButtonType.Tab' :active='isFocus'>{{ Tabs.Focus }}</ButtonComponent>
        <ButtonComponent :type='ButtonType.Tab' :active='isShortBreak'>{{ Tabs.ShortBreak }}</ButtonComponent>
        <ButtonComponent :type='ButtonType.Tab' :active='isLongBreak'>{{ Tabs.LongBreak }}</ButtonComponent>
      </div>
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
  gap: 2rem;
  width: fit-content;
  height: fit-content;
}
.type-buttons-container {
  display: flex;
  gap: 1rem;
}
</style>
