<script setup lang="ts">
import { useSelfServiceOrderStore } from '@/stores/self-service-order-store';
import { useScheduleStore } from '@/stores/schedule.store';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import Card from '../card/Card.vue';
import Divider from '../Divider.vue';
import DividerDot from '../DividerDot.vue';
import Icon from '../Icon.vue';
import Spinner from '../Spinner.vue';
import JumpInTransition from '../transitions/JumpInTransition.vue';
import { useCartStore } from '@/stores/cart.store';

const scheduleStore = useScheduleStore();
const interval = setInterval(() => {
  scheduleStore.fetch();
}, 10000);

onMounted(() => {
  scheduleStore.fetch();
})

onBeforeUnmount(() => {
  clearInterval(interval);
})



const schedule = computed(() => scheduleStore.schedule);
const orderStore = useSelfServiceOrderStore();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart)
const client = computed(() => orderStore.client);

const formatTime = (time: string) => {
  return time.slice(0, 5) //HH:mm
}

const getMessage = () => {
  if (!schedule.value?.current) {
    return 'Não estamos servindo no momento, <br>Aguarde o próximo atendimento.'
  }
  if (!client.value) { return 'Para abrir a comanda, <br>passe seu crachá.'; }
  if (client.value && !cart.value.items.length) {
    return 'Passe um produto no leitor <br/> para adicioná-lo ao carrinho.';
  }

  return 'Passe um produto no leitor<br/> ou seu crachá para <span class="text-teal-500">Confirmar</span>.';
};

</script>

<template>
  <section class="grid grid-rows-[auto_1fr] flex-grow gap-4">
    <Card>
      <template #cardTitleIcon>
        <Icon icon="fa-utensils" class="text-sky-600" />
      </template>
      <template #cardTitle>
        <p class="mr-auto">Atendimento</p>
        <JumpInTransition>
          <Spinner v-if="scheduleStore.state.loading" />
        </JumpInTransition>
      </template>


      <template #cardBody>
        <JumpInTransition>
          <section v-if="schedule">
            <div>
              <p class="text-rose-500 text-2xl" v-if="!schedule.current || !schedule.serving">Não estamos servindo.</p>
              <p class="text-teal-500 text-2xl" v-else>{{ schedule.current.name }}</p>
            </div>

            <Divider class="my-4" />
            <div class="flex flex-col items-start md:flex-row md:items-center justify-between gap-4 text-sm">
              <div class="min-w-max" v-if="schedule.current">
                <p>{{ schedule.current.name }}</p>
                <div class="text-xs dark:text-zinc-400 flex items-center gap-1.5">
                  <p>Servindo</p>
                  <DividerDot />
                  <p>
                    {{ formatTime(schedule.current.timeStart) }} às {{ formatTime(schedule.current.timeEnd) }}
                  </p>
                </div>
              </div>
              <div class="min-w-max" v-else>
                <p>{{ schedule.previous.name }}</p>
                <div class="text-xs font-light dark:text-zinc-400 flex items-center gap-1.5">
                  <p>Anterior</p>
                  <DividerDot />
                  <p>
                    {{ formatTime(schedule.previous.timeStart) }} às {{ formatTime(schedule.previous.timeEnd) }}
                  </p>
                </div>
              </div>
              <div class="hidden w-full md:flex md:items-center">
                <Divider class="w-full" />
                <Icon icon="fa-arrow-right" color="text-sky-600" size="small" />
              </div>
              <div class="flex flex-col w-full md:hidden">
                <Icon icon="fa-arrow-down" color="text-sky-600" size="small" />
              </div>

              <div class="min-w-max">
                <p>{{ schedule.next.name }}</p>
                <div class="text-xs font-light dark:text-zinc-400 flex items-center gap-1.5">
                  <p>Próximo</p>
                  <DividerDot />
                  <p>
                    {{ formatTime(schedule.next.timeStart) }} às {{ formatTime(schedule.next.timeEnd) }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </JumpInTransition>

      </template>
    </Card>
    <Card class="grid place-items-center">
      <template #cardBody>
        <p class="text-2xl" v-html="getMessage()"></p>
      </template>
    </Card>
  </section>
</template>
