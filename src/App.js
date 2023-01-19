import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Banner from './pages/banner/Banner';
import MainPage from './pages/mainPage/MainPage';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Routes>
          <Route index element={<Banner />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
