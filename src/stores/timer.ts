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

  const updateTimer = ({ h = 0, m = 0, s = 0 }: { h?: number, m?: number, s?: number }) => {
    let nextS = s
    let nextM = m + Math.floor(nextS / 60)
    const nextH = h + Math.floor(nextM / 60)
    nextS = nextS % 60
    nextM = nextM % 60

    timer.value = { h: nextH, m: nextM, s: nextS }
  }
  const updateTimerFromTab = (tab: ETabs) => {
    updateTimer(TimerAmounts[tab])
  }
  const snooze = ({ h = 0, m = 0, s = 0 }: { h?: number, m?: number, s?: number }) => {
    updateTimer({ h: timer.value.h + h, m: timer.value.m + m, s: timer.value.s + s })
  }
  const countDown = () => {
    if (timer.value.h === 0 && timer.value.m === 0 && timer.value.s === 0) {
      return
    }

    let nextS = timer.value.s - 1
    let nextM = timer.value.m
    let nextH = timer.value.h

    if (nextS < 0) {
      nextS = 59
      nextM -= 1
    }
    if (nextM < 0) {
      nextM = 59
      nextH -= 1
    }

    updateTimer({ h: nextH, m: nextM, s: nextS })
  }

  return {
    timer,
    updateTimer,
    updateTimerFromTab,
    snooze,
    countDown
  }
})
