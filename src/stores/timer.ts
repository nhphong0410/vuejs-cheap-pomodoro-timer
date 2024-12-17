import { ref } from 'vue'
import { defineStore } from 'pinia'

import { EStatus, ETabs } from '@/utils/enums'
import { TimerAmounts } from '@/utils/constants'

export const useTimerStore = defineStore('timer', () => {
  const timer = ref({
    h: 0,
    m: 0,
    s: 0
  })
  const status = ref<EStatus>(EStatus.Idle)
  const intervalId = ref<number | undefined>();

  const updateTimer = ({ h = 0, m = 0, s = 0 }: { h?: number, m?: number, s?: number }) => {
    let nextS = s
    let nextM = m + Math.floor(nextS / 60)
    const nextH = h + Math.floor(nextM / 60)
    nextS = nextS % 60
    nextM = nextM % 60

    timer.value = { h: nextH, m: nextM, s: nextS }
  }
  const updateTimerFromTab = (tab: ETabs) => {
    pause()
    updateTimer(TimerAmounts[tab])
  }
  const snooze = ({ h = 0, m = 0, s = 0 }: { h?: number, m?: number, s?: number }) => {
    updateTimer({ h: timer.value.h + h, m: timer.value.m + m, s: timer.value.s + s })
  }
  const countDown = () => {
    if (timer.value.h === 0 && timer.value.m === 0 && timer.value.s === 0) {
      pause()
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
  const start = () => {
    if (status.value === EStatus.Running || intervalId.value !== undefined) {
      return
    }
    intervalId.value = setInterval(countDown, 1000)
    status.value = EStatus.Running
  }
  const pause = () => {
    clearInterval(intervalId.value)
    intervalId.value = undefined
    status.value = EStatus.Paused
  }
  const reset = () => {
    pause()
    status.value = EStatus.Idle
  }

  return {
    timer,
    status,
    updateTimerFromTab,
    snooze,
    start,
    pause,
    reset
  }
})
