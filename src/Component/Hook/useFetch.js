import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url, callback) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(url);
        setData(response.data);
      
    };
    fetchData();
  }, [url]);

  return { data };
};

export default useFetch;