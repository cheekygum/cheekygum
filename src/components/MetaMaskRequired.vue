<script setup>
  import { ref } from 'vue'
  import { store, connectAccount } from '../store.js'

  const pending = ref(false)

  async function onConnectMetaMaskClicked () {
    pending.value = true
    await connectAccount()
    pending.value = false
  }
</script>

<template>
  <div>
    <button
      v-if="!store.connectedAccount"
      @click="onConnectMetaMaskClicked"
      :disabled="pending"
      class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity"
    >
      Connect MetaMask
    </button>
    <slot v-else class="mb-5"></slot>
  </div>
</template>
