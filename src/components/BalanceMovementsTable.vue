<script setup lang="ts">
import { useBalanceStore } from '@/stores/balance.store';
import { useReportStore } from '@/stores/report.store';
import { BalanceMovementType, type BalanceMovement } from '@/types/balance-movement.type';
import type { DropdownSelectOption } from '@/types/input';
import { toCurrency } from '@/utils/currency';
import { formatDateDefault } from '@/utils/dates';
import { useToggle } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import DropdownSelect from './forms/fields/DropdownSelect.vue';
import Input from './forms/fields/Input.vue';
import DataTable, { type Column } from './table/DataTable.vue';
import { useMotion } from '@vueuse/motion';
import SlideFromRight from './transitions/SlideFromRight.vue';
import LayoutShiftTransition from './transitions/LayoutShiftTransition.vue';

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
const reportStore = useReportStore();

const filterListRef = ref<HTMLElement>()

onMounted(() => useMotion(filterListRef, {
  initial: { x: 0, transition: { type: 'spring', stiffness: '300', damping: 20 } },
  leave: { x: 0 }
}))

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


        <LayoutShiftTransition class="flex items-center gap-2 relative">
          <div key="static-filters" class="flex items-center gap-2">
            <DropdownSelect ref="dropdownSizeRef" id="size" v-model="balanceStore.filters.size"
              :options="dropdownSizeOptions" size="small" variant="secondary" placeholder="Qtd. por página" />
            <DropdownSelect ref="dropdownSortRef" id="sortDirection" v-model="balanceStore.filters.sort"
              :options="dropdownSortDirectionOptions" size="small" placeholder="Ordernar por" variant="secondary" />
          </div>

          <div key="dinamic-filters" class="flex items-center gap-2 ps-2" v-if="showFilters">
            <form @submit.prevent="refetchBalanceMovements" class="flex items-center gap-2.5">
              <Input id="dateFrom" v-model="balanceStore.filters.dateFrom" label="de" label-inline type="datetime-local"
                variant="secondary" size="small" />
              <Input id="dateTo" v-model="balanceStore.filters.dateTo" label="até" label-inline type="datetime-local"
                variant="secondary" size="small" />

              <Button size="small">
                <Icon icon="magnifying-glass" size="small" />
                Filtrar
              </Button>
            </form>
          </div>
        </LayoutShiftTransition>
        <Button size="small" variant="secondary" :click="() => toggleFilters()">
          <Icon :icon="showFilters ? 'arrow-right' : 'filter'" size="small" />
          {{ showFilters ? 'Fechar' : 'Mais filtros' }}
        </Button>
        <div class="flex items-center gap-2 ps-2 z-10">
          <Button variant="success" size="small" :click="() => balanceStore.generateXLSXReport()"
            :loading="reportStore.state.xlsx.loading">
            <Icon icon="fa-regular fa-file-excel" />
            Excel
          </Button>
          <Button variant="danger" size="small" :loading="reportStore.state.pdf.loading" disabled>
            <Icon icon="fa-regular fa-file-pdf" />
            PDF
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

<style scoped>
.layout-shift-move,
.layout-shift-enter-active,
.layout-shift-leave-active {
  transition: all 300ms ease;
}

.layout-shift-leave-active {
  position: absolute;
  z-index: -1;
}

.layout-shift-enter-from,
.layout-shift-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
