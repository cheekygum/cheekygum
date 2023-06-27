<script setup>
  import { ref, computed } from 'vue'
  import { parseEther } from 'ethers'
  import { getContractInstance } from '../contract.js'
  import { store } from '../store.js'

  const TOKEN_PRICE = 1_250_000_000_000

  const pending = ref(false)
  const etherAmount = ref(1)

  const tokensAmount = computed(() => {
    return etherAmount.value * TOKEN_PRICE
  })

  async function onSubmit () {
    const contract = await getContractInstance()

    pending.value = true
    try {
      const transaction = await contract.buy({
        value: parseEther(etherAmount.value.toString())
      })
      console.log(transaction)
    }
    catch (error) {
      console.error(error)
      alert('Something went wrong :(')
    }
    finally {
      pending.value = false
    }
  }
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-purple-light break-all">Ether amount</label>
        <input type="number" min="0.04" max="1" step="0.01" v-model="etherAmount" class="bg-purple-light text-violet px-3 py-2 text-lg rounded-md focus:border-purple-light">
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-purple-light break-all">Tokens amount</label>
        <span class="break-all font-semibold text-lg text-purple-light">{{ tokensAmount }}</span>
      </div>
      <div class="flex justify-center">
        <button type="submit" :disabled="pending" class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity">
          <span v-if="pending">Pending...</span>
          <span v-else>Confirm</span>
        </button>
      </div>
    </form>
  </div>
</template>
