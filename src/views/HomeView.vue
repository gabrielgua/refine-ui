<script setup lang="ts">
import RouterButton from '@/components/RouterButton.vue';

</script>

<template>

  <section class="router-link-grid p-4">
    <RouterButton to="/self-service" icon="utensils">
      Atendimento
    </RouterButton>
    <RouterButton to="/products" icon="box-archive">
      Produtos
    </RouterButton>
    <RouterButton to="/self-service" icon="receipt">
      Vendas
    </RouterButton>
  </section>
</template>

<style>
.router-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
}
</style>
