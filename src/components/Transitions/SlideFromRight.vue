<template>
  <Transition name="slide-from-right" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 100ms ease;
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(25px);
  opacity: 0;
}
</style>
