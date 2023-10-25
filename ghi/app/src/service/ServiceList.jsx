import React, { useState, useEffect } from "react";


function ServiceList({ setAlert }) {
  const [appointments, setAppointments] = useState([]);
  const [vin, setVin] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setVin(document.getElementById("inputVin").value.toUpperCase());
  }

  function getAppointments() {
    fetch("http://localhost:8080/api/appointments/")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setAppointments(response.appointments);
      });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-center my-4">Service Appointments</h1>
      <div className="d-flex justify-content-end my-1">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-auto">
            <label htmlFor="inputVin" className="visually-hidden">VIN Lookup</label>
            <input type="text" className="form-control" id="inputVin"
              placeholder="VIN Lookup" />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-secondary mb-3">Search</button>
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
          {appointments.filter(el => vin !== "" ? el.vin === vin : true)
            .map((appointment) => (
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
