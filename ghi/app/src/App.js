import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './inventory/ManufacturerForm';
import ManufacturerList from './inventory/ManufacturerList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
