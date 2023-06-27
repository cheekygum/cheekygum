<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { getContractInstance } from '../contract.js'

  const pending = ref(true)
  const sellAmountMax = ref(100_000_000_000_000)
  const sellAmount = ref(0)

  const sellAmountPercent = computed(() => {
    return (sellAmount.value / sellAmountMax.value) * 100
  })

  async function init () {
    const contract = await getContractInstance()
    sellAmount.value = Number(await contract._sellAmount()) / Math.pow(10, 18)
    pending.value = false
  }

  onMounted(() => {
    init()
  })
</script>

<template>
  <div v-if="!pending" class="relative">
    <div class="w-100 h-4 bg-purple-light rounded-md"></div>
    <div class="absolute bottom-0 left-0 h-4 rounded-md bg-purple" :style="{ width: `${sellAmountPercent}%` }"></div>
  </div>
</template>
