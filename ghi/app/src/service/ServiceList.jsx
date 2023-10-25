import React, { useState, useEffect } from "react";


function ServiceList({ setAlert }) {
  const [appointments, setAppointments] = useState([]);

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
          {appointments.filter(el => true)
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
