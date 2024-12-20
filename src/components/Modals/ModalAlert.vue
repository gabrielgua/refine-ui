<script lang="ts" setup>
import { useModalStore, type ModalType } from '@/stores/modal.store';
import Modal from '../Modal.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';


const modalStore = useModalStore();

const variant = new Map<ModalType, { color: string, ring: string, icon: string }>([
  ['success', { color: 'text-teal-500', ring: 'ring-teal-500 bg-teal-500/20', icon: 'fa-check' }],
  ['error', { color: 'text-rose-500', ring: 'ring-rose-500 bg-rose-500/20', icon: 'fa-xmark' }],
])

</script>
<template>
  <Modal :show="modalStore.opened" @on-close="modalStore.close">
    <div class="grid place-items-center gap-6 pt-2">
      <span class="grid place-items-center p-2 rounded-full ring" :class="variant.get(modalStore.type)?.ring">
        <Icon :icon="variant.get(modalStore.type)!.icon" :color="variant.get(modalStore.type)?.color" size="large" />
      </span>

      <div class="text-center">
        <p class="text-lg">{{ modalStore.title }}</p>
        <p class="text-zinc-500 text-sm">{{ modalStore.body }}</p>
      </div>

      <Button class="w-full justify-center" :click="modalStore.close">OK</Button>
    </div>


  </Modal>
</template>
