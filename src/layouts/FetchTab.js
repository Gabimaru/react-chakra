import React, {useState, useEffect, useReducer} from 'react'
import axios from 'axios'
import { Heading, Center, Input, Button, VStack, HStack } from '@chakra-ui/core'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true,
        isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false,
        isError: false,
        data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false,
        isError: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
      const result = await axios(url);

      if (!didCancel) {
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      }
    } catch (error) {
      if (!didCancel) {
      dispatch({ type: 'FETCH_FAILURE' });
      }
    }
    };
 
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
}

function FetchTab() {
  
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  return (
    <VStack>
    <Center>
    <Heading mb={50} color="purple.700">Fetch content with useEffect hook</Heading>
    </Center>
    <form onSubmit={event => {
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
 
        event.preventDefault();
      }}>
        <HStack>
    <Input
        type="text"
        mb={25}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
              <Button mb={25} colorScheme="blue" type="submit">Search</Button>
              </HStack>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
    <ul>
    {data.hits.map(item => (
      <li key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </li>
    ))}
    </ul>
    
    )}
    </VStack>
    );
}

export default FetchTab

    /*
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    */