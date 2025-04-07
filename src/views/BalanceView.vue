<script setup lang="ts">
import Button from '@/components/Button.vue';
import Card from '@/components/card/Card.vue';
import Divider from '@/components/Divider.vue';
import DebounceSearch from '@/components/forms/fields/DebounceSearch.vue';
import Input from '@/components/forms/fields/Input.vue';
import Section from '@/components/Section.vue';
import SpinnerBackdrop from '@/components/SpinnerBackdrop.vue';
import { useBalanceStore } from '@/stores/balance.store';
import { BalanceMovementType } from '@/types/balance-movement.type';
import { toCurrency } from '@/utils/currency';
import { formatDateDefault } from '@/utils/dates';
import { computed, onBeforeUnmount, ref } from 'vue';

onBeforeUnmount(() => balanceStore.reset());

const balanceStore = useBalanceStore();
const debounceOptions = computed(() => {
  return balanceStore.foundClients
    .map(client => ({ value: client.credential, label: `${client.credential} / ${client.name}` }))
})

const client = computed(() => balanceStore.client)
const balanceToMove = ref<number>(0);

const isFormValid = computed(() => balanceToMove.value !== 0);

const submit = () => {
  if (!isFormValid.value) {
    return;
  }

  balanceStore.adjustClientBalance(balanceToMove.value);
  balanceToMove.value = 0;
}

const getCurrencyClasses = (value: number) => {
  return value < 0 ? 'text-rose-400' : 'text-teal-500';
}


</script>

<template>
  <Section>

    <Card class="max-w-[400px]">
      <template #cardBody>
        <DebounceSearch id="user-balance-search" label="Pesquisar cliente" placeholder="Buscar por nome ou crachá..."
          :options="debounceOptions" @selected="balanceStore.setSelected" @search="balanceStore.searchClientsByTerm"
          @reset="balanceStore.resetFoundClients" />
      </template>
    </Card>
    <Divider />
    <Card v-if="client">
      <template #cardTitle>Gerenciar saldo</template>
      <template #cardBody>
        <div class="grid grid-cols-[2fr_1fr] divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
          <div class="flex items-end gap-4 pe-4 *:grow">
            <Input id="client-credential" v-model="client.credential" label="Crachá" disabled />
            <Input id="client-name" v-model="client.name" label="Nome" disabled />
            <Input id="client-balance" :model-value="toCurrency(client.balance ? client.balance : 0, { suffix: true })"
              label="Saldo atual" disabled />
          </div>
          <form @submit.prevent="submit" class="ps-4 flex items-end gap-4 *:grow">
            <Input id="balance" type="number" v-model="balanceToMove" step="0.01" label="Movimentar saldo" required />
            <Button type="submit" :disabled="!isFormValid"
              :loading="balanceStore.state.balance.loading">Adicionar</Button>
          </form>
        </div>
      </template>
    </Card>
    <Divider v-if="client" />
    <Card size="small" v-if="client" class="relative">
      <SpinnerBackdrop v-if="balanceStore.state.movements.loading || balanceStore.state.balance.loading" />
      <template #cardTitle>Movimentações</template>
      <template v-if="!balanceStore.balanceMovements.length" #cardBody>
        <p class="text-zinc-400">Cliente não possui movimentações de saldo anteriores.</p>
      </template>
      <table v-if="balanceStore.balanceMovements.length"
        class="w-full text-left table-auto rounded-b-lg overflow-hidden">
        <thead>
          <tr
            class="divide-x divide-dashed divide-zinc-200 dark:divide-zinc-200/10 bg-sky-100 dark:bg-zinc-900 text-sm">
            <th scope="col" class="px-4 py-2">#</th>
            <th scope="col" class="px-4 py-2">Crachá</th>
            <th scope="col" class="px-4 py-2">Valor</th>
            <th scope="col" class="px-4 py-2">Saldo anterior</th>
            <th scope="col" class="px-4 py-2">Saldo atual</th>
            <th scope="col" class="px-4 py-2">Motivo</th>
            <th scope="col" class="px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mov in balanceStore.balanceMovements" :key="mov.id"
            class="divide-x divide-dashed divide-zinc-200 dark:divide-zinc-200/10 font-medium even:bg-zinc-50 dark:even:bg-zinc-700/30">
            <td class="text-xs font-light p-4">{{ mov.id }}</td>
            <td class="text-xs font-light p-4">{{ mov.credential }}</td>
            <td class="text-xs font-light p-4" :class="getCurrencyClasses(mov.amount)">{{ toCurrency(mov.amount, {
              suffix:
                true
            }) }}</td>
            <td class="text-xs font-light p-4" :class="getCurrencyClasses(mov.oldBalance)">{{ toCurrency(mov.oldBalance,
              {
                suffix: true
              }) }}</td>
            <td class="text-xs font-light p-4" :class="getCurrencyClasses(mov.newBalance)">{{ toCurrency(mov.newBalance,
              {
                suffix: true
              }) }}</td>
            <td class="text-xs font-light p-4">
              <span class="px-1.5 font-medium rounded-md text-white"
                :class="[mov.type === BalanceMovementType.ADJUSTMENT ? 'bg-purple-500' : 'bg-teal-700']">
                {{ mov.type === BalanceMovementType.ADJUSTMENT ? 'AJUSTE' : 'COMPRA' }}
              </span>
            </td>
            <td class="text-xs font-light p-4">{{ formatDateDefault(new Date(mov.timestamp)) }}</td>
          </tr>

        </tbody>
      </table>
    </Card>
  </Section>
</template>
