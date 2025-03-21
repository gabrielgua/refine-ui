<script setup lang="ts">
import Card from '@/components/card/Card.vue';
import Icon from '@/components/Icon.vue';
import SpinnerBackdrop from '@/components/SpinnerBackdrop.vue';
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';

const manualServiceCartStore = useManualServiceCartStore()
const manualServiceStore = useManualServiceStore();

</script>

<template>
  <Card size="small" class="relative">
    <template #cardTitleIcon>
      <Icon icon="receipt" size="small" class="text-sky-600"></Icon>
    </template>
    <template #cardTitle>Precificação</template>
    <template #cardBody>
      <section v-if="manualServiceCartStore.cart.items.length"
        class="flex items-center justify-between divide-x divide-dashed divide-zinc-200 dark:divide-zinc-200/20">

        <p class="text-xs font-light px-4 first:pl-0 last:pr-0">
          Subtotal<br>
          <span class="text-base font-semibold">
            <span class="text-xs">R$ </span>{{ toCurrency(manualServiceCartStore.cart.originalPrice) }}
          </span>
        </p>

        <p class="text-xs font-light px-4 first:pl-0 last:pr-0">
          Subsídio<br>
          <span class="text-base font-semibold">
            {{ manualServiceCartStore.cart.discount }}<span class="text-xs"> %</span>
          </span>
        </p>

        <p class="text-xs font-light px-4 first:pl-0 last:pr-0">
          Desconto<br>
          <span class="text-base font-semibold text-teal-500">
            <span class="text-xs">-R$ </span>{{ toCurrency(manualServiceCartStore.cart.discountedPrice) }}
          </span>
        </p>

        <p class="text-xs font-light px-4 first:pl-0 last:pr-0" v-if="manualServiceStore.client?.freeOfCharge">
          Cliente Isento (SND - Produção)<br>

          <span class="text-base text-teal-500">
            <Icon icon="check-circle" />
          </span>
        </p>
        <p class="text-xs font-light px-4 first:pl-0 last:pr-0 ms-auto ">
          Total<br>
          <span class="text-base font-semibold">
            <span class="text-xs">R$ </span>{{ toCurrency(manualServiceCartStore.cart.finalPrice) }}
          </span>
        </p>
      </section>
    </template>

    <SpinnerBackdrop v-if="manualServiceCartStore.state.loading" />
  </Card>
</template>
