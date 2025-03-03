<script setup lang="ts">
import { ref } from "vue";
import DropdownSelect from "@/components/DropDownBox.vue";
import Input from "@/components/Form/Input.vue";
import Button from "@/components/Button.vue";

// Options for report selection
const reportOptions = [
  { value: 1, label: "Clientes" },
  { value: 2, label: "Vendas" },
];

// Options for detail form dropdowns
const dataTypeOptions = [{ value: "Todos", label: "Todos" }];
const lojaOptions = [
  { value: "Erasto Gaertner", label: "Erasto Gaertner" },
  { value: "Hospice", label: "Hospice" },
  { value: "Irati", label: "Irati" },
];
const statusSaldoOptions = [
  { value: "Positivo", label: "Positivo" },
  { value: "Todos", label: "Todos" },
  { value: "Negativo", label: "Negativo" },
];

// Reactive properties for report selection
const selectedReport = ref<number | null>(null);
const reportName = ref("");

// Reactive properties for the Clientes detail form
const dateTypeClientes = ref("");
const dateFromClientes = ref("");
const dateToClientes = ref("");
const selectClientClientes = ref("");
const storesClientes = ref("");
const productClients = ref("");
const balanceStatusClientes = ref("");
const clientGroupClientes = ref("");

// Reactive properties for the Vendas detail form
const dateFromVendas = ref("");
const dateToVendas = ref("");
const selectClientVendas = ref("");
const productsVendas = ref("");
const storeVendas = ref("");
const operatorVendas = ref("");

// Handler for report selection
const handleSelection = (selectedValue: number | string) => {
  selectedReport.value = Number(selectedValue);
  reportName.value =
    reportOptions.find(opt => opt.value === selectedReport.value)?.label || "";
};

// Handlers for detail form dropdowns (Clientes)
const handleDataType = (selectedValue: number | string) => {
  dateTypeClientes.value = selectedValue as string;
};

const handleLoja = (selectedValue: number | string) => {
  storesClientes.value = selectedValue as string;
};

const handleStatusSaldo = (selectedValue: number | string) => {
  balanceStatusClientes.value = selectedValue as string;
};

// Handler for Vendas Loja dropdown
const handleLojaVendas = (selectedValue: number | string) => {
  storeVendas.value = selectedValue as string;
};

// Report generation function
const generateReport = () => {
  if (reportName.value === "Clientes") {
    alert(`Gerando relatório de Clientes:
      Tipo de Data: ${dateTypeClientes.value},
      De: ${dateFromClientes.value},
      Até: ${dateToClientes.value},
      Selecionar Cliente: ${selectClientClientes.value},
      Loja: ${productClients.value},
      Loja: ${storesClientes.value},
      Status do Saldo: ${balanceStatusClientes.value},
      Grupo de Clientes: ${clientGroupClientes.value}`);
  } else if (reportName.value === "Vendas") {
    alert(`Gerando relatório de Vendas:
      De: ${dateFromVendas.value},
      Até: ${dateToVendas.value},
      Selecionar Cliente: ${selectClientVendas.value},
      Produtos: ${productsVendas.value},
      Loja: ${storeVendas.value},
      Operador: ${operatorVendas.value}`);
  }
};
</script>
<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Escolha uma Opção</h1>

    <!-- Report selection Dropdown in a limited-width box -->
    <div class="mb-4 p-4 border rounded-lg inline-block">
      <DropdownSelect
        :options="reportOptions"
        label="Selecione um Relatório"
        placeholder="Escolha um relatório..."
        @selected="handleSelection"
      />
    </div>

    <!-- Detailed form appears after report selection -->
    <Transition name="fade">
      <div
        v-if="selectedReport !== null"
        class="mt-6 p-4 pb-20 border rounded-lg bg-gray-100 dark:bg-zinc-800/60 relative"
      >
        <h2 class="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">
          Preencha os detalhes
        </h2>

        <!-- Clientes Form (unchanged) -->
        <!-- Clientes Form -->
        <template v-if="reportName === 'Clientes'">
          <!-- First row: 4 inputs -->
          <div class="grid grid-cols-4 gap-4">
            <!-- Box 1: Tipo da Data -->
            <div class="p-4">
              <DropdownSelect
                :options="dataTypeOptions"
                label="Tipo da Data"
                placeholder="Selecione..."
                @selected="handleDataType"
              />
            </div>

            <!-- Box 2: De (Date input) -->
            <div class="p-4">
              <Input
                id="dataDe"
                type="date"
                label="De"
                placeholder="Data de início"
                v-model="dateFromClientes"
              />
            </div>

            <!-- Box 3: Até (Date input) -->
            <div class="p-4">
              <Input
                id="dataAte"
                type="date"
                label="Até"
                placeholder="Data de fim"
                v-model="dateToClientes"
              />
            </div>

            <!-- Box 4: Selecionar Cliente (Text input) -->
            <div class="p-4">
              <Input
                id="selecionarCliente"
                type="text"
                label="Selecionar Cliente"
                placeholder="Nome do Cliente"
                v-model="selectClientClientes"
              />
            </div>
          </div>

          <!-- Second row: 4 inputs -->
          <div class="grid grid-cols-4 gap-4 mt-4">
            <!-- Box 5: Loja (Dropdown select) -->
            <div class="p-4">
              <DropdownSelect
                :options="lojaOptions"
                label="Loja"
                placeholder="Selecione Loja..."
                @selected="handleLoja"
              />
            </div>

            <!-- Box 6: Buscar por produto (Text input) -->
            <div class="p-4">
              <Input
                id="buscarProduto"
                type="text"
                label="Buscar por produto"
                placeholder="Digite o produto..."
                v-model="productClients"
              />
            </div>

            <!-- Box 7: Status do Saldo (Dropdown select) -->
            <div class="p-4">
              <DropdownSelect
                :options="statusSaldoOptions"
                label="Status do Saldo"
                placeholder="Selecione Status..."
                @selected="handleStatusSaldo"
              />
            </div>

            <!-- Box 8: Grupo de Clientes (Text input) -->
            <div class="p-4">
              <Input
                id="grupoClientes"
                type="text"
                label="Grupo de Clientes"
                placeholder="Digite o grupo..."
                v-model="clientGroupClientes"
              />
            </div>
          </div>
        </template>

        <!-- Updated Vendas Form -->
        <template v-else-if="reportName === 'Vendas'">
          <!-- First row: 4 fields -->
          <div class="grid grid-cols-4 gap-4">
            <div class="p-4">
              <Input
                id="dataDeVendas"
                type="date"
                label="De"
                placeholder="Data de início"
                v-model="dateFromVendas"
              />
            </div>
            <div class="p-4">
              <Input
                id="dataAteVendas"
                type="date"
                label="Até"
                placeholder="Data de fim"
                v-model="dateToVendas"
              />
            </div>
            <div class="p-4">
              <Input
                id="selecionarClienteVendas"
                type="text"
                label="Selecionar Cliente"
                placeholder="Nome do Cliente"
                v-model="selectClientVendas"
              />
            </div>
            <div class="p-4">
              <Input
                id="produtos"
                type="text"
                label="Produtos"
                placeholder="Digite os produtos"
                v-model="productsVendas"
              />
            </div>
          </div>
          <!-- Second row: 3 fields -->
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="p-4">
              <DropdownSelect
                :options="lojaOptions"
                label="Loja"
                placeholder="Selecione Loja..."
                @selected="handleLojaVendas"
              />
            </div>
            <div class="p-4">
              <Input
                id="operador"
                type="text"
                label="Operador"
                placeholder="Digite o nome do operador"
                v-model="operatorVendas"
              />
            </div>
          </div>
        </template>

        <!-- Static positioned button -->
        <Button variant="primary" @click="generateReport" class="absolute bottom-4 right-4">
          Gerar
        </Button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
