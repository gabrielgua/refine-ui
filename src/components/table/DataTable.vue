<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from '../card/Card.vue';
import SpinnerBackdrop from '../SpinnerBackdrop.vue';
import Icon from '../Icon.vue';
import JumpInTransition from '../transitions/JumpInTransition.vue';

type ColumnType = 'text' | 'number' | 'date' | 'currency' | 'custom';

export type Column<T> = {
  label: string,
  field: keyof T,
  sortable?: boolean,
  type?: ColumnType,
  customSort?: (a: T, b: T) => number
}

const props = defineProps<{
  title: string;
  data: any[];
  loading?: boolean;
  columns: Column<any>[];
  defaultSort?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
}>();

const sortBy = ref<string | undefined>(props.defaultSort?.field ?? undefined)
const sortDesc = ref<boolean>(props.defaultSort?.direction === 'DESC')

const sortedData = computed(() => {
  if (!sortBy.value) return props.data;

  const column = props.columns.find(col => col.field === sortBy.value);
  if (!column) return props.data;

  return [...props.data].sort((a, b) => {
    // Handle null/undefined values consistently
    const aVal = a[sortBy.value!] ?? null;
    const bVal = b[sortBy.value!] ?? null;

    // Nulls last in both ascending and descending
    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    // Custom sort function takes precedence
    if (column.customSort) {
      return sortDesc.value ? column.customSort(b, a) : column.customSort(a, b);
    }

    // Type-specific sorting
    switch (column.type) {
      case 'date':
        return compareDates(aVal, bVal);
      case 'number':
      case 'currency':
        return compareNumbers(aVal, bVal);
      default: // text and undefined types
        return compareStrings(aVal, bVal);
    }
  });
});

// Helper comparison functions
function compareDates(a: any, b: any) {
  const aDate = new Date(a).getTime();
  const bDate = new Date(b).getTime();
  return sortDesc.value ? bDate - aDate : aDate - bDate;
}

function compareNumbers(a: any, b: any) {
  const aNum = Number(a);
  const bNum = Number(b);
  return sortDesc.value ? bNum - aNum : aNum - bNum;
}

function compareStrings(a: any, b: any) {
  const aStr = String(a);
  const bStr = String(b);
  return sortDesc.value
    ? bStr.localeCompare(aStr)
    : aStr.localeCompare(bStr);
}

function toggleSort(field: string) {
  if (sortBy.value === field) {
    sortDesc.value = !sortDesc.value
  } else {
    sortBy.value = field
    sortDesc.value = false
  }
}

</script>

<template>
  <Card size="small" class="relative">
    <SpinnerBackdrop v-if="loading" />
    <template #cardTitle>{{ title }}</template>
    <template v-if="!data.length" #cardBody>
      <p class="text-zinc-400">
        <slot name="empty-message">Table is empty.</slot>
      </p>
    </template>
    <table v-if="data.length" class="w-full text-left table-auto rounded-b-lg overflow-hidden transition-all">
      <thead>
        <tr class="divide-x divide-dashed divide-zinc-200 dark:divide-zinc-200/10 bg-sky-100 dark:bg-zinc-900 text-sm">
          <th v-for="col in columns" @click="col.sortable ? toggleSort(col.field as string) : null" class="px-4 py-2"
            :class="[{ 'cursor-pointer': col.sortable }, { 'bg-sky-600 text-white': sortBy === col.field }]">
            <span class="flex items-center justify-between">
              {{ col.label }}
              <JumpInTransition>
                <span v-if="col.sortable && sortBy === col.field">
                  <Icon icon="arrow-up" size="small" class="transition-all" :class="{ 'rotate-180': sortDesc }" />
                </span>
              </JumpInTransition>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedData" :key="index"
          class="divide-x divide-dashed divide-zinc-200 dark:divide-zinc-200/10 font-medium even:bg-zinc-50 dark:even:bg-zinc-700/30">
          <td v-for="col in columns" :key="col.field" class="text-xs font-light p-4">
            <slot :name="`cell-${col.field as string}`" :row="row">
              {{ row[col.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>
