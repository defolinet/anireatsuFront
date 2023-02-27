import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Banner from './pages/banner/Banner';
import MainPage from './pages/mainPage/MainPage';
import AuthPage from './pages/authPage/AuthPage';
import { useEffect } from 'react';
import { refresh } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/loading/Loading';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const status = useSelector(store => store.user.status)
  console.log(user)
  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(refresh())
    }
  }, [])

  if(status === 'loading') {
    return <Loading />
  }

  return (
    <HashRouter hashType="hashbang">
      <div className="App">
        <Routes>
          <Route index element={<Banner />} />
          <Route path='/main/*' element={<MainPage />} />
          <Route path='/auth/*' element={<AuthPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
