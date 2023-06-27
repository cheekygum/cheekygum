import { reactive } from 'vue'

export const store = reactive({
  connectedAccount: null
})

export async function connectAccount () {
  if (typeof window.ethereum == 'undefined') {
    alert('MetaMask is not detected! Install MetaMask browser extension or open website in MetaMask mobile app.')
  }

  return window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(() => {
      store.connectedAccount = window.ethereum.selectedAddress
      window.ethereum.on('accountsChanged', () => {
        store.connectedAccount = window.ethereum.selectedAddress
      })
    })
    .catch(error => {
      alert(error.message)
      console.error(error)
    })
}
