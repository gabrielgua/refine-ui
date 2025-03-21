<script setup lang="ts">
import Button from '@/components/Button.vue';
import Card from '@/components/card/Card.vue';
import Icon from '@/components/Icon.vue';
import SpinnerBackdrop from '@/components/SpinnerBackdrop.vue';
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import type { OrderItem } from '@/types/order.item.type';
import { toCurrency } from '@/utils/currency';
import { formatWeight } from '@/utils/decimal';

const manualServiceCartStore = useManualServiceCartStore();

const showOrderItemWeight = (item: OrderItem) => {
  return item.product.priceType === 'PRICE_PER_KG' && item.weight;
}

</script>

<template>
  <Card size="small" class="relative">
    <template #cardTitleIcon>
      <Icon icon="shopping-cart" size="small" class="text-sky-600"></Icon>
    </template>
    <template #cardTitle>Carrinho</template>
    <template #cardBody>
      <ul>
        <li v-for="item in manualServiceCartStore.cart.items" :key="item.id"
          class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 py-4 first:pt-0 last:pb-0 last:border-b-0">
          <p class="text-xs font-light pe-4">
            Produto<br>
            <span class="text-sm font-normal">
              {{ item.product.name }}
            </span>
          </p>
          <div class="ml-auto flex items-center divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
            <p class="text-xs font-light pe-4">
              <span>
                {{ item.product.priceType === 'PRICE_PER_UNIT' ? 'Preço Un.' : 'Preço Kg' }}<br>
              </span>
              <span class="text-base font-normal">
                <span class="text-xs">R$ </span>{{ toCurrency(item.unitPrice) }}
              </span>
            </p>
            <p class="text-xs font-light px-4">
              Qnt<br>
              <span class="text-base font-normal">
                x {{ item.quantity }}
              </span>
            </p>
            <p v-if="showOrderItemWeight(item)" class="text-xs font-light px-4">
              Peso<br>
              <span class="text-base font-normal">
                {{ formatWeight(item.weight!, { suffix: 'kilogram' }) }}
              </span>
            </p>
            <p class="text-xs font-light ps-4">
              Total<br>
              <span class="text-base font-normal">
                <span class="text-xs">R$ </span>{{ toCurrency(item.totalPrice) }}
              </span>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <Button type="button" variant="danger" :click="() => manualServiceCartStore.removeItem(item.product.code)">
              <Icon icon="fa-xmark" color="text-inherit" />
            </Button>
          </div>
        </li>
      </ul>
    </template>

    <SpinnerBackdrop v-if="manualServiceCartStore.state.loading" />
  </Card>
</template>
