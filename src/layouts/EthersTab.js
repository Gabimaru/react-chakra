import React, { useEffect, useReducer } from 'react'
import { Heading, Text, Center } from '@chakra-ui/core'
import { ethers } from 'ethers'

const web3Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_isWeb3':
      return { ...state, isWeb3: action.isWeb3 }
    case 'SET_enabled':
      return { ...state, isEnabled: action.isEnabled }
    case 'SET_account':
      return { ...state, account: action.account }
    case 'SET_provider':
      return { ...state, provider: action.provider }
    case 'SET_network':
      return { ...state, network: action.network }
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`)
  }
}

const initialWeb3State = {
  isWeb3: false,
  isEnabled: false,
  account: ethers.constants.AddressZero,
  provider: null,
  network: null,
}

function EthersTab() {
  const [state, dispatch] = useReducer(web3Reducer, initialWeb3State)

  //Check if Web3 is injected
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      dispatch({ type: 'SET_isWeb3', isWeb3: true })
    } else {
      dispatch({ type: 'SET_isWeb3', isWeb3: false })
    }
  }, [])

  // Colors of Status
  const status = (x,y) => {
    return <Text color={x}>{y}</Text>
  }

  const coloredGreen = "green.400"
  const coloredRed = "red.400"

  const connected = "connected"
  const disconnected = "disconnected"
  const injected = "injected"
  const notFound = "not found"
  

  //Check if Metamask is Enabled and get account
  useEffect(() => {
    const connect2MetaMask = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        dispatch({ type: 'SET_enabled', isEnabled: true })
        dispatch({ type: 'SET_account', account: accounts[0] })
      } catch (e) {
        console.log('Error:', e)
        dispatch({ type: 'SET_enabled', isEnabled: false })
      }
    }
    if (state.isWeb3) {
      connect2MetaMask()
    }
  }, [state.isWeb3])

  // Connect to provider
  useEffect(() => {
    const connect2Provider = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      dispatch({ type: 'SET_provider', provider: provider })
      const network = await provider.getNetwork()
      dispatch({ type: 'SET_network', network: network })
    }

    if (state.isEnabled) {
      connect2Provider()
    }
  }, [state.isEnabled])

  return (
    <>
      <Center>
      <Heading mb={50} color="purple.700">Web3 with ethers.js</Heading>
      </Center>
      <Text mb="5" fontWeight="bold" color="blue.400">Web3 : {state.isWeb3 ? status(coloredGreen,injected) : status(coloredRed,notFound)}</Text>
      <Text mb="5" fontWeight="bold" color="blue.400">Metamask status : {state.isEnabled ? status(coloredGreen,connected) : status(coloredRed,disconnected)}</Text>
      {state.isEnabled && <Text mb="5" fontWeight="bold" color="blue.400">account: <Text color="green.400">{state.account}</Text></Text>}
        {state.network && (
          <>
            <Text mb="5" fontWeight="bold" color="blue.400">Network name : <Text color="green.400">{state.network.name}</Text></Text>
            <Text mb="5" fontWeight="bold" color="blue.400">Network id : <Text color="green.400">{state.network.chainId}</Text></Text>
          </>
      )}
    </>
  )
}

export default EthersTab
