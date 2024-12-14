<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar.store';
import { computed } from 'vue';
import Button from './Button.vue';
import Logo from './Logo.vue';
import Icon from './Icon.vue';


const width = 'min-w-[280px]';
const sidebarStore = useSidebarStore();

const shrunken = computed(() => sidebarStore.state === 'shrunken');

</script>
<template>
  <aside class="relative transition-all h-dvh p-4 border-r dark:border-r-zinc-100/10"
    :class="[shrunken ? 'min-w-0' : width]">
    <div class="flex items-center justify-between gap-4" :class="{ 'flex-col': shrunken }">
      <Logo />
      <Button variant="secondary" :click="sidebarStore.toggle">
        <Icon icon="arrow-right" />
      </Button>
    </div>
  </aside>
</template>

<style>
.pop-in-enter-active {
  transition: all 250ms ease 200ms;
}

.pop-in-leave-active {
  transition: none
}



.pop-in-enter-from,
.pop-in-leave-to {
  opacity: 0;
  scale: .85;
}
</style>
