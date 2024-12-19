<script setup lang="ts">
import { Teleport } from 'vue';
import Card from './Card/Card.vue';
import CardBody from './Card/CardBody.vue';
import CardTitle from './Card/CardTitle.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';

withDefaults(defineProps<{
  show: boolean,
  title?: string,
  actionButtons?: boolean,
  confirmText?: string,
  cancelText?: string
}>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar'
})
defineEmits(['on-close', 'on-confirm']);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div @click.self="$emit('on-close')" v-show="show"
        class="absolute z-20 top-0 left-0 bg-black/60 w-full h-full grid place-items-center">

        <Transition name="modal-content">
          <Card v-if="show" class="transition-all min-w-[450px]">
            <CardTitle v-if="title" class="justify-between p-2">
              <p class="pl-2">{{ title }}</p>
              <Button :click="() => $emit('on-close')" variant="secondary-text">
                <Icon icon="fa-xmark" />
              </Button>
            </CardTitle>
            <CardBody>
              <slot />
              <section class="flex gap-4 justify-end" v-if="actionButtons">
                <Button :click="() => $emit('on-close')" class="justify-center" variant="secondary-text">
                  {{ cancelText }}
                </Button>
                <Button :click="() => $emit('on-confirm')">
                  <Icon icon="fa-check" />
                  {{ confirmText }}
                </Button>
              </section>
            </CardBody>
          </Card>
        </Transition>
      </div>
    </Transition>
  </Teleport>

</template>

<style>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: all 250ms ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* cubic-bezier(.47,1.64,.41,.8); */
}

.modal-content-enter-from,
.modal-content-leave-to {
  scale: .85;
}
</style>
