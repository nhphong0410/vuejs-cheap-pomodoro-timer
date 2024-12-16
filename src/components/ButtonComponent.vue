<script lang='ts' setup>
import { EButtonTypes } from '@/utils/enums'
import { computed } from 'vue'

export type ButtonProps = {
  type?: EButtonTypes;
  active?: boolean;
}

const props = defineProps<ButtonProps>()

const buttonType = computed(() => props.type ?? EButtonTypes.Contained)
const isActive = computed(() => props.active ?? false)

const isContainedButton = computed(() => buttonType.value === EButtonTypes.Contained)
const isTextButton = computed(() => buttonType.value === EButtonTypes.Text)
const isTabButton = computed(() => buttonType.value === EButtonTypes.Tab)

const buttonClasses = computed(() => ({
  'contained-button': isContainedButton.value,
  'text-button': isTextButton.value,
  'tab-button': isTabButton.value,
  active: isActive.value
}))
</script>

<template>
  <button :class='buttonClasses' @click='$emit("onClick")'>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #aaaaaa;
  transition: background-color 0.1s linear, color 0.1s linear;
}

button:hover {
  color: #eeeeee;
}

.contained-button,
.tab-button.active {
  background-color: #333333;
}

.contained-button:hover,
.tab-button:hover {
  background-color: #444444;
}

.text-button,
.tab-button {
  background-color: transparent;
}

.text-button {
  padding: 0.125rem;
}
</style>
