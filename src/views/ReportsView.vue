<!-- src/views/ReportsView.vue -->
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

        <!-- Conditionally render form based on report selection -->
        <template v-if="reportName === 'Clientes'">
          <!-- Grid of 8 inputs (2 rows, 4 columns each) -->
          <div class="grid grid-cols-4 gap-4">
            <!-- Box 1: Tipo da Data -->
            <div class="p-4">
              <DropdownSelect
                :options="tipoDataOptions"
                label="Tipo da Data"
                placeholder="Selecione..."
                @selected="handleTipoData"
              />
            </div>

            <!-- Box 2: De (Date input) -->
            <div class="p-4">
              <Input
                id="dataDe"
                type="date"
                label="De"
                placeholder="Data de início"
                v-model="dataDe"
              />
            </div>

            <!-- Box 3: Até (Date input) -->
            <div class="p-4">
              <Input
                id="dataAte"
                type="date"
                label="Até"
                placeholder="Data de fim"
                v-model="dataAte"
              />
            </div>

            <!-- Box 4: Selecionar Cliente (Text input) -->
            <div class="p-4">
              <Input
                id="selecionarCliente"
                type="text"
                label="Selecionar Cliente"
                placeholder="Nome do Cliente"
                v-model="selecionarCliente"
              />
            </div>
          </div>

          <!-- Second row: 4 inputs -->
          <div class="grid grid-cols-4 gap-4 mt-4">
            <!-- Box 5: Cidade (Dropdown select) -->
            <div class="p-4">
              <DropdownSelect
                :options="cidadeOptions"
                label="Cidade"
                placeholder="Selecione Cidade..."
                @selected="handleCidade"
              />
            </div>

            <!-- Box 6: Buscar por produto (Text input) -->
            <div class="p-4">
              <Input
                id="buscarProduto"
                type="text"
                label="Buscar por produto"
                placeholder="Digite o produto..."
                v-model="buscarProduto"
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
                v-model="grupoClientes"
              />
            </div>
          </div>
        </template>

        <template v-else-if="reportName === 'Vendas'">
          <!-- Single input for Vendas -->
          <div class="p-4">
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Digite o nome..."
              v-model="name"
            />
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

// Options for detail form dropdowns (for Clientes)
const tipoDataOptions = [{ value: "Todos", label: "Todos" }];
const cidadeOptions = [
  { value: "Hospice", label: "Hospice" },
  { value: "Erasto Gaertner", label: "Erasto Gaertner" },
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
const tipoData = ref("");
const dataDe = ref("");
const dataAte = ref("");
const selecionarCliente = ref("");
const cidade = ref("");
const buscarProduto = ref("");
const statusSaldo = ref("");
const grupoClientes = ref("");

// Reactive property for the Vendas detail form
const name = ref("");

// Handler for report selection
const handleSelection = (selectedValue: number | string) => {
  selectedReport.value = Number(selectedValue);
  reportName.value =
    reportOptions.find(opt => opt.value === selectedReport.value)?.label || "";
};

// Handlers for detail form dropdowns (Clientes)
const handleTipoData = (selectedValue: number | string) => {
  tipoData.value = selectedValue as string;
};

const handleCidade = (selectedValue: number | string) => {
  cidade.value = selectedValue as string;
};

const handleStatusSaldo = (selectedValue: number | string) => {
  statusSaldo.value = selectedValue as string;
};

// Report generation function
const generateReport = () => {
  if (reportName.value === "Clientes") {
    alert(`Gerando relatório de Clientes:
Tipo de Data: ${tipoData.value},
De: ${dataDe.value},
Até: ${dataAte.value},
Selecionar Cliente: ${selecionarCliente.value},
Cidade: ${cidade.value},
Buscar por produto: ${buscarProduto.value},
Status do Saldo: ${statusSaldo.value},
Grupo de Clientes: ${grupoClientes.value}`);
  } else if (reportName.value === "Vendas") {
    alert(`Gerando relatório de Vendas:
Name: ${name.value}`);
  }
};
</script>

<style scoped>
/* Smooth fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
