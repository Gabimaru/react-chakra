import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Heading, Center } from '@chakra-ui/core'

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
      const result = await axios(url);
 
      setData(result.data);
    } catch (error) {
      setIsError(true);
    }
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}

function FetchTab() {
  
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  return (
    <>
    <Center>
    <Heading color="purple.700">Fetch content with useEffect hook</Heading>
    </Center>
    <form onSubmit={event => {
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
 
        event.preventDefault();
      }}>
    <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
              <button type="submit">Search</button>
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
    </>
    );
}

export default FetchTab

// A poursuivre à partir de "Reducer Hook for Data Fetching"