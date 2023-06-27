<script setup>
  import { ref } from 'vue'
  import { getContractInstance } from '../contract.js'

  const pending = ref(false)

  async function onClaimButtonClicked () {
    const contract = await getContractInstance()

    pending.value = true
    try {
      const transaction = await contract.claim()
      const receipt = await transaction.wait()
      console.log(receipt)
    }
    catch (error) {
      console.error(error)
      alert('Tokens were already sent to this wallet')
    }
    finally {
      pending.value = false
    }
  }
</script>

<template>
  <button
    @click="onClaimButtonClicked"
    :disabled="pending"
    class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity"
  >
    Claim
  </button>
</template>
