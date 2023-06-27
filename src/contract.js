import { ethers } from 'ethers'

import GumBoy from '../../contracts/GumBoy/build/contracts/GumBoy.json'
const contractAddress = '0x70c573C15e95EeBd71Bae6A4B0a786B7bA3f5608'

export async function getContractInstance () {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, GumBoy.abi, signer)

  return contract
}
