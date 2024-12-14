<script setup lang="ts">
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import { ClockIcon, XMarkIcon } from '@heroicons/vue/16/solid';
import { ArchiveBoxIcon, CurrencyDollarIcon, IdentificationIcon, ListBulletIcon, QueueListIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';


const element = ref<HTMLElement>();

const { toggle } = useFullscreen(element);
</script>
<template>

  <section ref="element" class="h-dvh bg-white text-black dark:bg-zinc-800 dark:text-white">
    <SelfServiceHeader @fullscreen="toggle" />
    <section class="grid grid-cols-2 p-8 gap-8">
      <div>
        <section class="text-2xl rounded">
          <Card>
            <div class="flex items-center gap-4 " :class="[true ? 'text-teal-500' : 'text-rose-500']">
              <ClockIcon class="size-6" />
              <p>Lanche da tarde</p>
            </div>
          </Card>
          <div class="py-24 border-b border-b-zinc-500/10 text-center">
            <p>Passe o produto no leitor, <br>ou seu crachá para <span class="text-teal-500">Confirmar</span>.</p>
          </div>
        </section>
        <div class="mt-8 flex flex-col gap-2">
          <label class="text-lg">Código de barras</label>
          <input type="text"
            class="rounded bg-transparent border border-zinc-200 dark:border-zinc-100/10 p-4 outline-none focus:outline-sky-600 focus:outline-2"
            autofocus />
        </div>
        <Button variant="danger" class="flex-col px-10 mt-8 rounded">
          <XMarkIcon class="size-8" />
          <p>Remover</p>
        </Button>

      </div>
      <section>

        <Card class="grid grid-cols-[1fr_auto]">
          <div>
            <div class="flex items-center gap-2">
              <UserCircleIcon class="size-5 text-sky-600" />
              <p>Cliente:</p>
            </div>
            <p>Rafael Guaitanele Niszczak</p>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <IdentificationIcon class="size-5 text-sky-600" />
              <p>Crachá:</p>
            </div>
            <p>64444</p>
          </div>
        </Card>
        <Card class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-2">
            <CurrencyDollarIcon class="size-5 text-sky-600" />
            <p>Saldo:</p>
          </div>
          <p>15,00</p>
        </Card>
        <hr class="border-zinc-100 dark:border-zinc-100/10 my-8" />
        <ul class="grid gap-1">
          <div class="flex items-center gap-2 mb-2">
            <ListBulletIcon class="size-5 text-sky-600" />
            <p>Produtos</p>
          </div>
          <li class="flex bg-white/50 dark:bg-zinc-900  items-center justify-between gap-4 p-4 rounded-lg ">
            <div>
              <p>Lanche da tarde</p>
              <p class="text-xs">Quantidade: 1</p>
            </div>
            <p class="ml-auto">R$ <span class="text-teal-500 font-semibold">10,99</span></p>
            <Button variant="danger">
              <XMarkIcon class="size-5" />
            </Button>
          </li>
          <li class="flex bg-white/50 dark:bg-zinc-900  items-center justify-between gap-4 p-4 rounded-lg ">
            <div>
              <p>Lanche da tarde</p>
              <p class="text-xs">Quantidade: 1</p>
            </div>
            <p class="ml-auto">R$ <span class="text-teal-500 font-semibold">10,99</span></p>
            <Button variant="danger">
              <XMarkIcon class="size-5" />
            </Button>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
