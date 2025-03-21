<template>
  <Transition name="fade" mode="out-in">
    <slot />
  </Transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: .9;
}
</style>
