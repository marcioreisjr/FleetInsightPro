import React, { useState, useEffect } from "react";


function ServiceList({ setAlert }) {
  const [appointments, setAppointments] = useState([]);
  const [searchData, setSearchData] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const searchCriteria =
      document.querySelector('input[name="searchSel"]:checked').value;
    const searchVal =
      document.getElementById("inputSearchData").value.toUpperCase();
    if (searchVal === "") return setSearchData(appointments);
    const filteredData = appointments.filter((appointment) => {
      if (searchCriteria === "vin") {
        return appointment.vin.toUpperCase().includes(searchVal.toUpperCase());
      } else if (searchCriteria === "customer") {
        return appointment.customer.toUpperCase().includes(searchVal.toUpperCase());
      } else if (searchCriteria === "technician") {
        return appointment.technician["first_name"].toUpperCase().includes(searchVal.toUpperCase()) ||
          appointment.technician["last_name"].toUpperCase().includes(searchVal.toUpperCase()) ||
          appointment.technician["employee_id"].toUpperCase().includes(searchVal.toUpperCase());
      }
      return false;
    });
    setSearchData(filteredData);
  }

  function getAppointments() {
    fetch("http://localhost:8080/api/appointments/")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        const splitTime = response.appointments.map((appointment) => {
          const dateTime = new Date(appointment.date_time);
          const date = dateTime.toLocaleDateString("en-US");
          const time = dateTime.toLocaleTimeString("en-US").replace(":00 ", " ");
          appointment.date = date;
          appointment.time = time;
          return appointment;
        });
        setAppointments(splitTime);
        setSearchData(splitTime);
      });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-center my-4">Service Appointments</h1>
      <div className="d-flex justify-content-end my-3">
        <form onSubmit={handleSubmit} className="d-flex">
          <div className="d-flex align-items-center">
            <div className="form-check mx-3">
              <input className="form-check-input" type="radio" name="searchSel"
                id="searchSel1" value={"vin"} defaultChecked />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                VIN
              </label>
            </div>
            <div className="form-check mx-3">
              <input className="form-check-input" type="radio" name="searchSel"
                id="searchSel2" value={"customer"} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Customer
              </label>
            </div>
            <div className="form-check mx-3">
              <input className="form-check-input" type="radio" name="searchSel"
                id="searchSel3" value={"technician"} />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Technician
              </label>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="col-auto mx-3">
              <label htmlFor="inputSearchData" className="visually-hidden">Lookup text</label>
              <input type="text" className="form-control" id="inputSearchData"
                placeholder="Lookup text" />
            </div>
            <button type="submit" className="btn btn-secondary">Search</button>
          </div>
        </form>
      </div>
      <table className="table table-striped shadow">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{appointment.purchased_here ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.technician["first_name"] +
                " " + appointment.technician["last_name"]}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status.toLowerCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceList;
