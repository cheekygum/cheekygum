<script setup>
  import ListIcon from './icons/ListIcon.vue'
  import TwitterLogo from './icons/TwitterLogo.vue'
  import TelegramLogo from './icons/TelegramLogo.vue'
</script>

<template>
  <header class="bg-violet py-3">
    <div class="container flex items-center justify-between">
      <div class="flex items-center gap-5">
        <button class="text-lg xl:text-xl font-semibold p-4 rounded-lg bg-purple-light hover:opacity-80 transition-opacity text-violet block lg:hidden">
          <ListIcon />
        </button>
        <ul class="hidden lg:flex items-center gap-5">
          <li class="text-lg xl:text-xl font-ravie font-semibold text-purple-light hover:opacity-80 transition-opacity">
            <a href="#about">About</a>
          </li>
          <li class="text-lg xl:text-xl font-ravie font-semibold text-purple-light hover:opacity-80 transition-opacity">
            <a href="#howToBuy">How to buy</a>
          </li>
          <li class="text-lg xl:text-xl font-ravie font-semibold text-purple-light hover:opacity-80 transition-opacity">
            <a href="#tokenomic">Tokenomic</a>
          </li>
          <li class="text-lg xl:text-xl font-ravie font-semibold text-purple-light hover:opacity-80 transition-opacity">
            <a href="#roadmap">Roadmap</a>
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-4">
        <a href="#howToBuy" class="text-lg xl:text-xl font-semibold py-3 px-10 lg:px-16 rounded-full bg-purple-light hover:opacity-80 transition-opacity text-violet">Buy tokens</a>
        <a href="https://twitter.com/CheekyGumBoy" target="_blank" rel="noopener noreferrer" class="text-lg xl:text-xl font-semibold p-4 rounded-lg bg-purple-light hover:opacity-80 transition-opacity text-violet">
          <TwitterLogo />
        </a>
        <a href="https://t.me/CheekyGum" target="_blank" rel="noopener noreferrer" class="text-lg xl:text-xl font-semibold p-4 rounded-lg bg-purple-light hover:opacity-80 transition-opacity text-violet">
          <TelegramLogo />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
