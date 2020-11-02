import React from 'react'
import { Heading, Text, VStack, Image, Stack } from '@chakra-ui/core'
import reactImage from '../res/react.svg'
import chakraImage from '../res/chakra.svg'
import resultImage from '../res/result.jpeg'

function HelloTab() {
  return (
    <>
      <VStack spacing={10}>
        <Heading mb={50} color="purple.700">Welcome to my first React + Chakra UI course</Heading>
        <Stack direction="row" align="center" spacing={20}>
          <Image src={reactImage} boxSize="200px" />
          <Text fontSize={100}>+</Text>
          <Image src={chakraImage} boxSize="150px" />
          <Text fontSize={100}> =</Text>
          <Image src={resultImage} boxSize="200px" />
        </Stack>
        <Text>We can create text easily with chakra</Text>
        <Text fontSize="3xl">Change font size</Text>
        <Text as="i" fontSize="5xl" color="purple.700">
          And change color too
        </Text>
      </VStack>
    </>
  )
}

export default HelloTab
