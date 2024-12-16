<script lang='ts' setup></script>

<template>
  <div class='progress-container'>
    <div class='progress-bar' style="width: 50%;"></div>
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
}
</style>
