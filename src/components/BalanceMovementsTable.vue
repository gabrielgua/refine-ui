<script setup lang="ts">
import { useBalanceStore } from '@/stores/balance.store';
import { BalanceMovementType, type BalanceMovement } from '@/types/balance-movement.type';
import { toCurrency } from '@/utils/currency';
import { formatDateDefault } from '@/utils/dates';
import DataTable, { type Column } from './table/DataTable.vue';
import { computed, nextTick, ref, watch } from 'vue';
import Icon from './Icon.vue';
import Input from './forms/fields/Input.vue';
import DropdownSelect from './forms/fields/DropdownSelect.vue';
import type { DropdownSelectOption } from '@/types/input';
import Button from './Button.vue';
import { useToggle } from '@vueuse/core';
import FadeTransition from './transitions/FadeTransition.vue';
import SlideFromTop from './transitions/SlideFromTop.vue';
import SlideFromRight from './transitions/SlideFromRight.vue';

export type BalanceMovementFilter = {
  size?: number,
  page?: number,
  dateFrom?: string,
  dateTo?: string,
  sort?: 'ASC' | 'DESC'
}

const props = defineProps<{ credential: string }>()
const balanceStore = useBalanceStore();
const balanceMovements = computed(() => balanceStore.balanceMovements);
const pagination = computed(() => balanceStore.pagination);

const columns: Column<BalanceMovement>[] = [
  { label: '#', field: 'id', sortable: true, type: 'number' },
  { label: 'Crachá', field: 'credential' },
  { label: 'Saldo anterior', field: 'oldBalance', sortable: true, type: 'number' },
  { label: 'Saldo atual', field: 'newBalance', sortable: true, type: 'number' },
  { label: 'Valor', field: 'amount', sortable: true, type: 'number' },
  { label: 'Motivo', field: 'type' },
  { label: 'Data', field: 'timestamp', sortable: true, type: 'date' }
]

const dropdownSizeOptions: DropdownSelectOption[] = [
  { label: '5 por página', value: 5 },
  { label: '10 por página', value: 10 },
  { label: '15 por página', value: 15 },
  { label: '20 por página', value: 20 },
]

const dropdownSortDirectionOptions: DropdownSelectOption[] = [
  { label: 'Mais antigos primeiro', value: 'ASC' },
  { label: 'Mais novos primeiro', value: 'DESC' },
]

const dropdownSizeRef = ref();
const dropdownSortRef = ref();

watch(() => balanceStore.filters.size, async () => {
  balanceStore.filters.page = 1;
  balanceStore.fetchBalanceMovementsByCredential(props.credential)

  await nextTick();
  dropdownSizeRef.value.blur()
}, { deep: true })

watch(() => balanceStore.filters.sort, async () => {
  balanceStore.filters.page = 1;
  balanceStore.fetchBalanceMovementsByCredential(props.credential)

  await nextTick();
  dropdownSortRef.value.blur()
}, { deep: true })

const refetchBalanceMovements = () => {
  balanceStore.fetchBalanceMovementsByCredential(props.credential);
}

const to = (page: number) => {
  balanceStore.filters.page = page;
  refetchBalanceMovements();
}

const next = () => {
  if (!pagination.value?.hasNext || !balanceStore.filters.page) {
    return;
  }

  balanceStore.filters.page++;
  refetchBalanceMovements();
}

const prev = () => {
  if (!pagination.value?.hasPrevious || !balanceStore.filters.page) {
    return;
  }

  balanceStore.filters.page--;
  refetchBalanceMovements();
}

const getCurrencyClasses = (value: number) => {
  return value < 0 ? 'text-rose-400' : 'text-teal-500';
}

const showFilters = ref<boolean>(false);
const toggleFilters = useToggle(showFilters);

</script>

<template>
  <DataTable title="Movimentações" :pagination="pagination"
    :loading="balanceStore.state.movements.loading || balanceStore.state.balance.loading" :data="balanceMovements"
    :columns="columns" :default-sort="{ field: 'timestamp', direction: 'DESC' }" @to="to" @prev="prev" @next="next">
    <template #table-filters>
      <div class="-m-1.5 flex items-center gap-2 divide-x divide-zinc-200 dark:divide-zinc-800">
        <div class="flex items-center gap-2">
          <DropdownSelect ref="dropdownSizeRef" id="size" v-model="balanceStore.filters.size"
            :options="dropdownSizeOptions" size="small" variant="secondary" placeholder="Qtd. por página" />
          <DropdownSelect ref="dropdownSortRef" id="sortDirection" v-model="balanceStore.filters.sort"
            :options="dropdownSortDirectionOptions" size="small" placeholder="Ordernar por" variant="secondary" />
        </div>

        <div class="flex items-center gap-2 ps-2">
          <SlideFromRight>
            <form @submit.prevent="refetchBalanceMovements" class="flex items-center gap-2.5" v-if="showFilters">

              <Input id="dateFrom" v-model="balanceStore.filters.dateFrom" label="de" label-inline type="datetime-local"
                variant="secondary" size="small" />
              <Input id="dateTo" v-model="balanceStore.filters.dateTo" label="até" label-inline type="datetime-local"
                variant="secondary" size="small" />

              <Button size="small" variant="secondary">
                <Icon icon="magnifying-glass" size="small" />
                Filtrar
              </Button>
            </form>
          </SlideFromRight>

          <Button size="small" variant="secondary" :click="() => toggleFilters()">
            <Icon :icon="showFilters ? 'arrow-right' : 'filter'" size="small" />
            {{ showFilters ? 'Fechar' : 'Mais filtros' }}
          </Button>
        </div>


      </div>
    </template>
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
