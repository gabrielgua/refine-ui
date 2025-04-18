<template>
  <TransitionGroup tag="div" name="layout-shift">
    <slot />
  </TransitionGroup>
</template>
<style lang="css" scoped>
.layout-shift-move,
.layout-shift-enter-active,
.layout-shift-leave-active {
  transition: all 300ms ease;
}

.layout-shift-leave-active {
  position: absolute;
  z-index: -1;
}

.layout-shift-enter-from,
.layout-shift-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
