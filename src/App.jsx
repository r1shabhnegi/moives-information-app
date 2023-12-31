import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { getApiConfiguration } from './services/store/homeSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi('/movie/popular').then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  return <div className='App'>App</div>;
}

export default App;
