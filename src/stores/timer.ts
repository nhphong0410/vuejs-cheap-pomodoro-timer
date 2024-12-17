import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { EStatus } from '@/utils/enums'

export const useTimerStore = defineStore('timer', () => {
  const timer = ref({
    total: 0,
    remain: 0,
  })
  const status = ref<EStatus>(EStatus.Idle)
  const intervalId = ref<number | undefined>();

  const h = computed(() => Math.floor(timer.value.remain / 3600))
  const m = computed(() => Math.floor(timer.value.remain % 3600 / 60))
  const s = computed(() => timer.value.remain % 60)

  const setTimer = (payload: { amount?: number }) => {
    const { amount = 0 } = payload
    timer.value = {
      total: amount,
      remain: amount,
    }
  }
  const start = () => {
    if (status.value === EStatus.Running || intervalId.value !== undefined || timer.value.remain === 0) {
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
    clearInterval(intervalId.value)
    intervalId.value = undefined
    status.value = EStatus.Idle
    timer.value = {
      total: 0,
      remain: 0,
    }
  }
  const add = (payload: { amount?: number }) => {
    const { amount = 0 } = payload
    timer.value.remain += amount
    timer.value.total += amount
  }
  const countDown = () => {
    if (timer.value.remain === 0) {
      clearInterval(intervalId.value)
      intervalId.value = undefined
      status.value = EStatus.Finished
      return;
    }

    timer.value.remain -= 1
  }

  return {
    timer,
    h,
    m,
    s,
    status,
    setTimer,
    start,
    pause,
    reset,
    add
  }
})
