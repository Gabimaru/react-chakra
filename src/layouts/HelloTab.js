import React from 'react'
import { Heading, Text, VStack, Image, Stack } from '@chakra-ui/core'
import reactImage from '../res/react.svg'
import chakraImage from '../res/chakra.svg'
// import resultImage from '../res/result.jpeg'

function HelloTab() {
  return (
    <>
      <VStack spacing={10}>
        <Heading color="purple.700">Welcome to basic React + Chakra UI Tutorial</Heading>
        <Stack direction="row" align="center" spacing={20}>
          <Image src={reactImage} boxSize="200px" />
          <Text mr="30" fontSize={100}>+</Text>
          <Image src={chakraImage} boxSize="113px" />
        </Stack>
        
        <Text color="blue.400">We can create text easily with chakra</Text>
        <Text fontSize="3xl" color="blue.400">Change font size</Text>
        <Text as="i" fontSize="5xl" color="purple.700">
          And change color too
        </Text>
      </VStack>
    </>
  )
}

export default HelloTab

/*<Stack direction="row" align="center" spacing={20}>
          <Text mr="30" fontSize={40}>React</Text>
          <Text mr="30" fontSize={40}>Chakra UI</Text>
        </Stack>
        */