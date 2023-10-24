import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './inventory/ManufacturerForm';
import ManufacturerList from './inventory/ManufacturerList';
import ModelForm from './inventory/ModelForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models/create" element={<ModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
