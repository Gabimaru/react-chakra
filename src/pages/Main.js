import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import HelloTab from '../layouts/HelloTab'
import CounterTab from '../layouts/CounterTab'
import FormTab from '../layouts/FormTab'
import FetchTab from '../layouts/FetchTab'
import EthersTab from '../layouts/EthersTab'

function Main() {
  return (
    <>
      <Tabs colorScheme="purple" size="lg" isFitted={true}>
        <TabList>
          <Tab>Hello</Tab>
          <Tab>Counter</Tab>
          <Tab>Form</Tab>
          <Tab>Fetch</Tab>
          <Tab>Ethers.js</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HelloTab />
          </TabPanel>
          <TabPanel>
            <CounterTab />
          </TabPanel>
          <TabPanel>
            <FormTab />
          </TabPanel>
          <TabPanel>
            <FetchTab />
          </TabPanel>
          <TabPanel>
            <EthersTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Main
