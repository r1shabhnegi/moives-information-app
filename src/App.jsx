import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration } from './services/store/homeSlice';
import { Header, Footer } from './components';
import { Home, Details, SearchResults, Explore, PageNotFound } from './pages';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    fetchApiConfig();
  }, []);

  console.log(url);
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
    });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/:mediaType/:id'
          element={<Details />}
        />
        <Route
          path='/search/:query'
          element={<SearchResults />}
        />
        <Route
          path='/explore/:mediaType'
          element={<Explore />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
