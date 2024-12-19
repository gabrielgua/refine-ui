<script setup lang="ts">
import { useScheduleStore } from '@/stores/schedule.store';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import DividerDot from '../DividerDot.vue';
import SelfServiceStatus from './SelfServiceStatus.vue';
import Spinner from '../Spinner.vue';
import JumpInTransition from '../Transitions/JumpInTransition.vue';
import { useUserOrderStore } from '@/stores/user.order.store';

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
const userOrderStore = useUserOrderStore();

const formatTime = (time: string) => {
  return time.slice(0, 5) //HH:mm
}

</script>

<template>
  <section class="grid grid-rows-[auto_1fr] flex-grow gap-4">
    <Card>
      <CardTitle icon="fa-utensils">
        <p class="mr-auto">Atendimento atual</p>
        <JumpInTransition>
          <Spinner v-if="scheduleStore.state.loading" />
        </JumpInTransition>
      </CardTitle>

      <CardBody class="relative">
        <JumpInTransition>
          <section v-if="schedule">
            <div class="flex items-center justify-between">
              <p class="text-rose-500 text-2xl" v-if="!schedule.serving">Não estamos servindo.</p>
              <p class="text-teal-500 text-2xl" v-else>{{ schedule.current?.name }}</p>
            </div>

            <Divider class="my-4" />
            <div class="flex items-center justify-between gap-4 text-sm">
              <div class="min-w-max">
                <p>{{ schedule.previous.name }}</p>
                <div class="text-xs dark:text-zinc-400 flex items-center gap-1.5">
                  <p>Anterior</p>
                  <DividerDot />
                  <p>
                    {{ formatTime(schedule.previous.timeStart) }} às {{ formatTime(schedule.previous.timeEnd) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center w-full">
                <Divider class="w-full" />
                <Icon icon="fa-arrow-right" color="text-sky-600" size="small" />
              </div>
              <div class="min-w-max">
                <p>{{ schedule.next.name }}</p>
                <div class="text-xs dark:text-zinc-400 flex items-center gap-1.5">
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

      </CardBody>
    </Card>
    <Card class="grid place-items-center">
      <CardBody>
        <section v-if="!schedule?.current">
          <p class="text-2xl">Não estamos servindo no momento, <br>Aguarde o próximo atendimento.</p>
        </section>
        <section v-else>
          <p class="text-2xl" v-if="!userOrderStore.user">Para abrir a comanda, <br>passe seu crachá.</p>
          <p class="text-2xl" v-else>
            Passe o produto no leitor, <br>
            ou seu crachá para
            <span class="text-teal-500">Confirmar</span>.
          </p>
        </section>
      </CardBody>
    </Card>
  </section>
</template>
