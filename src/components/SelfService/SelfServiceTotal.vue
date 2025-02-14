<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import { toCurrency } from '@/utils/currency';
import { computed } from 'vue';
import { useScaleStore } from '@/stores/scale.store';
import { formatWeight } from '@/utils/decimal';
import { useScheduleStore } from '@/stores/schedule.store';

const cartStore = useCartStore();
const scaleStore = useScaleStore();
const atendimentoType = computed(() => useScheduleStore().current?.priceType);
const weight = computed(() => scaleStore.weight);
const cart = computed(() => cartStore.cart)

</script>

<template>
  <Card class="mt-auto">
    <CardTitle icon="fa-receipt">
      Precificação
    </CardTitle>
    <CardBody>
      <section v-if="cart.items.length" class="flex items-center justify-between gap-4">
        <div class="border-r border-r-zinc-100 dark:border-r-zinc-100/10 pr-4">
          <p class="text-sm">Preço bruto:</p>
          <p class="text-2xl"><span class="font-light text-base">R$</span>{{ toCurrency(cart.originalPrice) }}</p>
        </div>
        <div class="border-r border-r-zinc-100 dark:border-r-zinc-100/10 pr-4"
          v-if="atendimentoType === 'PRICE_PER_KG'">
          <p class="text-sm">Peso:</p>
          <p class="text-2xl">{{ formatWeight(weight) }}<span class="font-light text-base">kg</span></p>
        </div>
        <div>
          <p class="text-sm">Desconto:</p>
          <p class="text-2xl">
            <span class="font-light text-base">R$ -</span>{{ toCurrency(cart.discountedPrice) }}
            <span class="text-sm text-teal-600 rounded-xl">{{ cart.discount * 100 }}%</span>
          </p>
        </div>
        <div class="border-l border-l-zinc-100 dark:border-l-zinc-100/10 pl-4 ml-auto">
          <p class="text-sm">Total:</p>
          <p class="text-2xl">
            <span class="font-light text-base">R$</span>
            <span class="font-bold text-teal-500">
              {{ toCurrency(cart.finalPrice) }}
            </span>
          </p>
        </div>
      </section>
    </CardBody>
  </Card>

</template>
