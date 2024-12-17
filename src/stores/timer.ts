import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ETabs } from '@/utils/enums'
import { TimerAmounts } from '@/utils/constants'

export const useTimerStore = defineStore('timer', () => {
  const timer = ref({
    h: 0,
    m: 0,
    s: 0
  })

  const updateTimer = (h?: number, m?: number, s?: number) => {
    if (h !== undefined) {
      timer.value.h = h
    }
    if (m !== undefined) {
      timer.value.m = m
    }
    if (s !== undefined) {
      timer.value.s = s
    }
  }
  const updateTimerFromTab = (tab: ETabs) => {
    updateTimer(...TimerAmounts[tab])
  }
  const snooze = ({ h = 0, m = 0, s = 0 }: { h?: number, m?: number, s?: number }) => {
    updateTimer(timer.value.h + h, timer.value.m + m, timer.value.s + s)
  }

  return {
    timer,
    updateTimer,
    updateTimerFromTab,
    snooze
  }
})
