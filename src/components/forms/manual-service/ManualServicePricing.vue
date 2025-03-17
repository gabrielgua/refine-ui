<script setup lang="ts">
import Card from '@/components/card/Card.vue';
import Icon from '@/components/Icon.vue';
import SpinnerBackdrop from '@/components/SpinnerBackdrop.vue';
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import { toCurrency } from '@/utils/currency';

const manualServiceCartStore = useManualServiceCartStore()

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
        <div class="px-4 first:pl-0 last:pr-0">
          <p class="text-sm">Subtotal</p>
          <p class="text-2xl"><span class="font-light text-base">R$ </span>{{
            toCurrency(manualServiceCartStore.cart.originalPrice)
          }}</p>
        </div>
        <div class="px-4 first:pl-0 last:pr-0">
          <p class="text-sm">Subsídio</p>
          <p class="text-2xl ">
            {{ manualServiceCartStore.cart.discount }}<span class="font-light text-base"> %</span>
          </p>
        </div>
        <div class="px-4 first:pl-0 last:pr-0">
          <p class="text-sm">Desconto</p>
          <p class="text-2xl text-teal-500">
            <span class="font-light text-base">-R$ </span>{{ toCurrency(manualServiceCartStore.cart.discountedPrice) }}
          </p>
        </div>
        <div class="px-4 first:pl-0 last:pr-0 ml-auto">
          <p class="text-sm">Total</p>
          <p class="text-2xl">
            <span class="font-light text-base">R$ </span>{{ toCurrency(manualServiceCartStore.cart.finalPrice) }}
          </p>
        </div>
      </section>
    </template>

    <SpinnerBackdrop v-if="manualServiceCartStore.state.loading" />
  </Card>
</template>
