<script setup lang="ts">
import { useBalanceStore } from '@/stores/balance.store';
import { BalanceMovementType, type BalanceMovement } from '@/types/balance-movement.type';
import { toCurrency } from '@/utils/currency';
import { formatDateDefault } from '@/utils/dates';
import DataTable, { type Column } from './table/DataTable.vue';
import { computed } from 'vue';
import Icon from './Icon.vue';

const balanceStore = useBalanceStore();

const getCurrencyClasses = (value: number) => {
  return value < 0 ? 'text-rose-400' : 'text-teal-500';
}

const balanceMovements = computed(() => balanceStore.balanceMovements);

const columns: Column<BalanceMovement>[] = [
  { label: '#', field: 'id', sortable: true, type: 'number' },
  { label: 'Crachá', field: 'credential' },
  { label: 'Saldo anterior', field: 'oldBalance', sortable: true, type: 'number' },
  { label: 'Saldo atual', field: 'newBalance', sortable: true, type: 'number' },
  { label: 'Valor', field: 'amount', sortable: true, type: 'number' },
  { label: 'Motivo', field: 'type' },
  { label: 'Data', field: 'timestamp', sortable: true, type: 'date' }
]
</script>

<template>
  <DataTable title="Movimentações" :loading="balanceStore.state.movements.loading || balanceStore.state.balance.loading"
    :data="balanceMovements" :columns="columns" :default-sort="{ field: 'timestamp', direction: 'DESC' }">

    <template #empty-message>Cliente não possui movimentações de saldo anteriores.</template>
    <template #cell-oldBalance="{ row }">
      <span>{{ toCurrency(row.oldBalance, { suffix: true }) }}</span>
    </template>
    <template #cell-newBalance="{ row }">
      <span>{{ toCurrency(row.newBalance, { suffix: true }) }}</span>
    </template>
    <template #cell-amount="{ row }">
      <span :class="getCurrencyClasses(row.amount)" class="font-medium flex items-center justify-between">
        {{ toCurrency(row.amount, { suffix: true }) }}
        <Icon :icon="row.amount > 0 ? 'arrow-up' : 'arrow-down'" size="small" />
      </span>
    </template>
    <template #cell-type="{ row }">
      <span class="px-1.5 font-medium rounded-md text-white"
        :class="[row.type === BalanceMovementType.ADJUSTMENT ? 'bg-purple-500' : 'bg-teal-700']">
        {{ row.type === BalanceMovementType.ADJUSTMENT ? 'AJUSTE' : 'COMPRA' }}
      </span>
    </template>
    <template #cell-timestamp="{ row }">
      <span class="flex items-center gap-4">
        <Icon icon="fa-regular fa-calendar" size="small" class="opacity-60" />
        {{ formatDateDefault(new Date(row.timestamp)) }}
      </span>
    </template>
  </DataTable>

</template>
