'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"

declare global {
    interface Window {
        ethereum?: any;
    }
}

export function ConnectButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        if (network.chainId === BigInt(11155111)) { // Sepolia network ID
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0].address)
          }
        }
      } catch (error) {
        console.error("An error occurred while checking the connection:", error)
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        })
        const provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setIsConnected(true)
        setAddress(address)
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  return (
    <Button onClick={connectWallet} variant="outline" className="bg-white text-gray-800 hover:bg-gray-100">
      {isConnected ? `Connected: ${String(address).slice(0, 6)}...${String(address).slice(-4)}` : 'Connect Wallet'}
    </Button>
  )
}

