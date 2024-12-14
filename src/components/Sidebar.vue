<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar.store';
import { computed } from 'vue';
import Logo from './Logo.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Divider from './Divider.vue';


const widthExpanded = 'min-w-[280px]';
const widthShrunken = 'min-w-[88px]';

const sidebarStore = useSidebarStore();


</script>
<template>
  <aside class="bg-white dark:bg-zinc-900 transition-all h-dvh border-r dark:border-r-zinc-100/10"
    :class="[sidebarStore.isShrunken ? widthShrunken : widthExpanded]">
    <div class="relative p-5">
      <Logo :show-name="!sidebarStore.isShrunken" />

      <Transition name="pop-in" mode="out-in">
        <div class="absolute grid w-full left-0 mt-5 place-items-center" v-if="sidebarStore.isShrunken">
          <Button variant="primary-text" :click="sidebarStore.toggle">
            <Icon icon="angles-right" />
          </Button>
        </div>

        <div class="absolute grid w-full left-0 px-5 top-[21px] place-items-end" v-else>
          <Button variant="primary-text" :click="sidebarStore.toggle">
            <Icon icon="angles-left" />
          </Button>
        </div>
      </Transition>
    </div>
  </aside>
</template>

<style>
.pop-in-enter-active {
  transition: all 250ms ease 50ms;
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
