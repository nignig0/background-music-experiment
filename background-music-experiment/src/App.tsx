import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/:playListId' element = {<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
