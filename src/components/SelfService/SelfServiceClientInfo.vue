<script setup lang="ts">
import { useOrderStore } from '@/stores/order.store';
import { toCurrency } from '@/utils/currency';
import { computed } from 'vue';
import Avatar from '../Avatar.vue';
import Card from '../card/Card.vue';
import CardBody from '../card/CardBody.vue';
import CardTitle from '../card/CardTitle.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';

const orderStore = useOrderStore();
const client = computed(() => orderStore.client);
const state = computed(() => orderStore.state);

</script>

<template>
  <section>
    <Card>
      <CardTitle icon="fa-info-circle">Informações</CardTitle>
      <CardBody>
        <section v-if="!state.error && client">
          <div class="flex items-center gap-4">
            <Avatar :seed="client.name" size="small" />
            <div>
              <p class="text-xs">Cliente:</p>
              <p>{{ client.name }}</p>
            </div>
            <div class="ml-auto">
              <p class="text-xs">Crachá:</p>
              <p>{{ client.credential }}</p>
            </div>
          </div>

          <Divider class="my-4" />
          <div class="flex items-center gap-4 justify-between">
            <div class="flex items-center gap-2">
              <Icon icon="wallet" color="text-sky-600" />
              <p>Saldo:</p>
            </div>
            <p><span class="text-zinc-400">R$</span> {{ toCurrency(client.balance) }}</p>
          </div>
        </section>
      </CardBody>
    </Card>

  </section>

</template>
