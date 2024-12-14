<template>
  <div class="container-width mx-auto">
    <slot />
  </div>

</template>

<style>
.container-width {
  --max-width: 1200px;
  --x-margin: 2rem;

  width: min(var(--max-width), 100% - calc(var(--x-margin) * 2));
}
</style>
