import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentForm from './service/AppointmentForm';
import TechnicianForm from './service/TechnicianForm';
import TechnicianList from './service/TechnicianList';
import AppointmentList from './service/AppointmentList';
import ServiceList from './service/ServiceList';
import ManufacturerForm from './inventory/ManufacturerForm';
import ManufacturerList from './inventory/ManufacturerList';
import ModelForm from './inventory/ModelForm';
import ModelList from './inventory/ModelList';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobileList from './inventory/AutomobileList';


import { useState } from 'react';

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /**
   * Handles the closing of the alert.
   */
  function handleAlertClose() {
    setShowAlert(false);
    setAlertMessage('');
  };

  /**
   * Sets the alert message and shows the alert. This is a dismissable alert.
   *
   * @param {String} message - The message to display in the alert.
   */
  function setAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }

  return (
    <BrowserRouter>
      <Nav />
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAlertClose}></button>
        </div>
      )}
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/add" element={<TechnicianForm setAlert={setAlert} />} />
          <Route path="/technicians" element={<TechnicianList setAlert={setAlert} />} />
          <Route path="/appointments/create" element={<AppointmentForm setAlert={setAlert} />} />
          <Route path="/appointments" element={<AppointmentList setAlert={setAlert} />} />
          <Route path="/appointments/services" element={<ServiceList setAlert={setAlert} />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm setAlert={setAlert} />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models/create" element={<ModelForm setAlert={setAlert} />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/automobiles/create" element={<AutomobileForm setAlert={setAlert} />} />
          <Route path="/automobiles" element={<AutomobileList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
