import React, { useState } from 'react'
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  VStack,
  Button,
  Center,
  useToast,
} from '@chakra-ui/core'

function FormTab() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const handleSubmit = (event) => {
    event.preventDefault()
    toast({
      position: 'top',
      title: `Registration failed`,
      description: `This registration failed for: 
        username: ${username} 
        email: ${email}
        password: ${password}
      `,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <VStack spacing={10}>
        <Heading mb={50} color="purple.700">Form</Heading>
        <form>
          <FormControl id="username" isRequired={true}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value)
              }}
            />
            <FormHelperText>Please enter a unique username</FormHelperText>
          </FormControl>
          <FormControl id="email" isRequired={true} mt={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              type="email"
              onChange={(event) => {
                setEmail(event.currentTarget.value)
              }}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl mt={6} id="password" isRequired={true}>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              type="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value)
              }}
            />
            <FormHelperText>Choose a strong password</FormHelperText>
          </FormControl>
          <Center>
            <Button
              type="submit"
              colorScheme="blue"
              mt={10}
              onClick={handleSubmit}
            >
              register
            </Button>
          </Center>
        </form>
      </VStack>
    </>
  )
}

export default FormTab
