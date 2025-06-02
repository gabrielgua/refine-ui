<script setup lang="ts">
import { useCredentialRangeStore } from '@/stores/credential-range.store';
import { useReportStore } from '@/stores/report.store';
import { CrendentialRangePaymentType, type CredentialRange } from '@/types/credential-range.type';
import type { DropdownSelectOption } from '@/types/input';
import { formatDateDefault } from '@/utils/dates';
import { formatWithLeadingZeros } from '@/utils/decimal';
import { computed, nextTick, ref, watch } from 'vue';
import Button from '../Button.vue';
import DropdownSelect from '../forms/fields/DropdownSelect.vue';
import Icon from '../Icon.vue';
import DataTable, { type Column } from '../table/DataTable.vue';
import DropdownSelectSize from '../table/DropdownSelectSize.vue';

const emit = defineEmits(['edit', 'remove']);

const reportStore = useReportStore();
const credentialRangeStore = useCredentialRangeStore();

const pagination = computed(() => credentialRangeStore.pagination);
const credentialRanges = computed(() => credentialRangeStore.credentialRanges);

const columns: Column<CredentialRange>[] = [
  { label: '#', field: 'id', type: 'number', sortable: true },
  { label: 'Nome', field: 'name', type: 'text' },
  { label: 'Min', field: 'min', type: 'number', sortable: true },
  { label: 'Max', field: 'max', type: 'number', sortable: true },
  { label: 'Tipo Pagamento', field: 'paymentType', type: 'text' },
  { label: 'Criado em', field: 'createdAt', type: 'date', sortable: true },
]

const formatPaymentType = new Map<CrendentialRangePaymentType, { label: string, textColor: string }>([
  [CrendentialRangePaymentType.BALANCE_DEBIT, { label: 'Saldo em conta', textColor: 'text-teal-600 dark:text-emerald-300' }],
  [CrendentialRangePaymentType.PAYROLL_DEBIT, { label: 'Pagamento em folha', textColor: 'text-purple-500  dark:text-purple-300' }],
  [CrendentialRangePaymentType.COURTESY, { label: 'Cortesia', textColor: 'text-yellow-500  dark:text-yellow-200' }],
])

const paymentTypeIcons = new Map<CrendentialRangePaymentType, string>([
  [CrendentialRangePaymentType.BALANCE_DEBIT, 'wallet'],
  [CrendentialRangePaymentType.PAYROLL_DEBIT, 'file-invoice-dollar'],
  [CrendentialRangePaymentType.COURTESY, 'handshake-angle'],
])

const dropdownPaymentTypeOptions: DropdownSelectOption[] = [
  { label: 'Pagamento em folha', value: 'PAYROLL_DEBIT' },
  { label: 'Saldo em conta', value: 'BALANCE_DEBIT' },
  { label: 'Cortesia', value: 'COURTESY' },
]

const dropdownSizeRef = ref<HTMLElement>()
const dropdownPaymentTypeRef = ref<HTMLElement>()

watch(() => credentialRangeStore.filter.size, async () => {
  if (!credentialRangeStore.credentialRanges.length) {
    return;
  }

  credentialRangeStore.filter.page = 1;
  credentialRangeStore.fetchAll();
  await nextTick();
  dropdownSizeRef.value?.blur();
}, { deep: true })


watch(() => credentialRangeStore.filter.paymentType, async () => {
  credentialRangeStore.filter.page = 1;
  credentialRangeStore.fetchAll();
  await nextTick();
  dropdownPaymentTypeRef.value?.blur();
}, { deep: true })

const next = () => {
  if (!pagination.value?.hasNext || !credentialRangeStore.filter.page) {
    return;
  }

  credentialRangeStore.filter.page++
  credentialRangeStore.fetchAll();
}

const prev = () => {
  if (!pagination.value?.hasPrevious || !credentialRangeStore.filter.page) {
    return;
  }

  credentialRangeStore.filter.page--;
  credentialRangeStore.fetchAll();
}

const goTo = (page: number) => {
  credentialRangeStore.filter.page = page;
  credentialRangeStore.fetchAll();
}


const edit = (range: CredentialRange) => {
  emit('edit', range);
}

const remove = (id: number) => {
  emit('remove', id)
}

</script>

<template>
  <DataTable title="Gerenciar ranges" :data="credentialRanges" :columns="columns"
    :default-sort="{ field: 'id', direction: 'ASC' }" :action-column="{ label: 'Ações' }"
    :loading="credentialRangeStore.state.listing.loading" :error="credentialRangeStore.state.listing.error"
    :pagination="pagination" @next="next" @prev="prev" @to="goTo">
    <template #empty-message>Não existem Ranges de Crachá cadastradas.</template>
    <template #error-message>Erro ao tentar buscar as Ranges de Crachá.</template>
    <template #table-filters>
      <div class="-m-1.5 flex items-center divide-x divide-zinc-200 dark:divide-zinc-800">
        <div class="flex items-center gap-2 first:pe-2 last:pe-0">

          <DropdownSelectSize ref="dropdownSizeRef" v-model="credentialRangeStore.filter.size" />
          <DropdownSelect ref="dropdownPaymentTypeRef" id="credential-ranges-payment-type-filter"
            v-model="credentialRangeStore.filter.paymentType" :options="dropdownPaymentTypeOptions"
            placeholder="Tipo de pagamento" variant="secondary" size="small" />
          <Button v-if="credentialRangeStore.filter.paymentType" :click="() => credentialRangeStore.resetFilter()"
            variant="secondary" size="small">
            <Icon icon="arrow-rotate-left" size="small" />
            Resetar filtros
          </Button>
        </div>
        <div class="flex items-center gap-2 ps-2 z-10">
          <Button variant="success" size="small" :click="() => credentialRangeStore.generateXLSXReport()"
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

    <template #cell-min="{ row }">
      {{ formatWithLeadingZeros(row.min) }}
    </template>
    <template #cell-max="{ row }">
      {{ formatWithLeadingZeros(row.max) }}
    </template>
    <template #cell-paymentType="{ row }">
      <div class="flex items-center gap-2" :class="formatPaymentType.get(row.paymentType)?.textColor">
        <Icon :icon="paymentTypeIcons.get(row.paymentType)!" size="small"
          :class="formatPaymentType.get(row.paymentType)?.textColor" />
        <span class="py-0.5 px-1.5 rounded-lg uppercase font-medium">
          {{ formatPaymentType.get(row.paymentType)?.label }}
        </span>
      </div>
    </template>
    <template #cell-createdAt="{ row }">
      <span class="flex items-center gap-4">
        <Icon icon="fa-regular fa-calendar" size="small" class="opacity-60" />
        {{ formatDateDefault(row.createdAt) }}
      </span>
    </template>
    <template #action-column="{ row }">
      <div class="flex items-center gap-2.5">
        <Button size="large" variant="secondary" :click="() => edit(row)">
          <Icon size="small" icon="pen" />
        </Button>
        <Button size="large" variant="danger" :click="() => remove(row.id)">
          <Icon size="small" icon="trash-can" />
        </Button>
      </div>
    </template>
  </DataTable>
</template>
