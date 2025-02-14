<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { toCurrency } from '@/utils/currency';
import Button from '../Button.vue';
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';

const cartStore = useCartStore();

</script>

<template>

  <Card class="flex flex-col overflow-y-auto">
    <CardTitle icon="fa-shopping-cart">
      <p>Produtos</p>
    </CardTitle>
    <Scrollable class="px-4" :class="{ 'py-4': !cartStore.cart.items.length }">
      <li v-for="item in cartStore.cart?.items"
        class="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-100/10 py-4 last:border-b-0">
        <div>
          <p>{{ item.product.name }}</p>
          <p class="text-xs font-light" v-if="item.product.priceType === 'PRICE_PER_UNIT'">
            Quantidade:
            <span class="font-bold">{{ item.quantity }}</span>
          </p>
          <p class="text-xs font-light italic" v-else>self-service</p>
        </div>
        <div class="ml-auto flex items-center divide-x divide-zinc-100 dark:divide-zinc-100/10">
          <p class="text-xs font-light pe-4">
            <span v-if="item.product.priceType === 'PRICE_PER_UNIT'">Preço Uni.<br></span>
            <span v-else>Preço Kg<br></span>
            <span class="text-base font-normal">
              <span class="text-xs">R$</span>{{ toCurrency(item.unitPrice) }}
            </span>
          </p>
          <p class="text-xs font-light ps-4">
            Total<br>
            <span class="text-base font-normal">
              <span class="text-xs">R$</span>{{ toCurrency(item.totalPrice) }}
            </span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <Button variant="secondary">
            <Icon icon="fa-question" color="text-inherit" />
          </Button>
          <Button :disabled="item.product.priceType === 'PRICE_PER_KG'" variant="danger"
            :click="() => cartStore.removeItem(item.product.code)">
            <Icon icon="fa-xmark" color="text-inherit" />
          </Button>

        </div>
      </li>
    </Scrollable>
  </Card>
</template>
