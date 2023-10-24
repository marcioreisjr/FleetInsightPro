import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './inventory/ManufacturerForm';
import ManufacturerList from './inventory/ManufacturerList';
import ModelForm from './inventory/ModelForm';
import ModelList from './inventory/ModelList';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobileList from './inventory/AutomobileList';


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
          <Route path="/models" element={<ModelList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
