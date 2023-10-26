import React, { useState, useEffect } from "react";


function AppointmentList({ setAlert }) {
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

  function handleCancelBtn(event) {
    const id = event.target.getAttribute("data-sel");
    const url = "http://localhost:8080/api/appointments/" + id + "/cancel/";
    fetch(url, {
      method: "PUT",
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/appointments";
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        setAlert("Error: " + error.message);
      });
  }

  function handleFinishBtn(event) {
    const id = event.target.getAttribute("data-sel");
    const url = "http://localhost:8080/api/appointments/" + id + "/finish/";
    fetch(url, {
      method: "PUT",
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/appointments";
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        setAlert("Error: " + error.message);
      });
  }

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
          </tr>
        </thead>
        <tbody>
          {appointments.filter(el => el.status === "CREATED")
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
                <td>
                  <button className="btn btn-danger btn-small"
                    data-sel={appointment.id} onClick={handleCancelBtn}>
                    Cancel
                  </button>
                  <button className="btn btn-success btn-small mx-2"
                    data-sel={appointment.id} onClick={handleFinishBtn}>
                    Finish
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
