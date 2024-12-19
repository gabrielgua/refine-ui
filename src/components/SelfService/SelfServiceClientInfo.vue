<script setup lang="ts">
import { useUserOrderStore } from '@/stores/user.order.store';
import { toCurrency } from '@/utils/currency.';
import { computed } from 'vue';
import Avatar from '../Avatar.vue';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';

const userOrderStore = useUserOrderStore();
const user = computed(() => userOrderStore.user);
const state = computed(() => userOrderStore.state);

</script>

<template>
  <section>
    <Card>
      <CardTitle icon="fa-info-circle">Informações</CardTitle>
      <CardBody>
        <section v-if="!state.error && user">
          <div class="flex items-center gap-4 justify-between">
            <div class="flex items-center gap-4">
              <Avatar :seed="user.name" size="small" />
              <div>
                <p class="text-sm">Cliente:</p>
                <p>{{ user.name }}</p>
              </div>
            </div>
            <div>
              <p class="text-sm">Crachá:</p>
              <p>{{ user.credential }}</p>
            </div>

          </div>
          <Divider class="my-4" />
          <div class="flex items-center gap-4 justify-between">
            <div class="flex items-center gap-2">
              <Icon icon="wallet" color="text-sky-600" />
              <p>Saldo:</p>
            </div>
            <p><span class="text-zinc-400">R$</span> {{ toCurrency(user.balance) }}</p>
          </div>
        </section>
      </CardBody>
    </Card>

  </section>

</template>
