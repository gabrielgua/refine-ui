<script setup lang="ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const { login } = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');

const submit = () => {
  login(email.value, password.value);
}
</script>
<template>
  <form @submit.prevent="submit" class="gap-4 h-dvh w-full flex flex-col items-center justify-center">
    <Logo />
    <div class="flex flex-col">
      <label for="email">E-mail</label>
      <input type="email" v-model="email" placeholder="Ex.: meuemail@refeitorio.com" required />
    </div>
    <div class="flex flex-col">
      <label for="password">Senha</label>
      <input type="password" v-model="password" required />
    </div>

    <Button type="submit">
      Entrar
      <Icon icon="fa-arrow-right" class="size-4" />
    </Button>
  </form>

</template>
