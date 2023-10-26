import React, { useEffect, useState } from "react";

/*
        "reason": "Oil change",
        "status": "active",  # active, cancelled, finished -- for GET only
        "date": "10/10/2023",
        "time": "13:30",
        "vin": "ZZZ123...",
        "customer": "Charles Darwin",
        "technician": {Technician},
        "purchased_here",  # for GET only
        "id"  # for GET only
*/

function AppointmentForm({ setAlert }) {
  const [technicians, setTechnicians] = useState([]);
  const [technician, setTechnician] = useState("");
  const [reason, setReason] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [vin, setVin] = useState("");

  function handleVinChange(event) {
    setVin(event.target.value);
  }

  function handleCustomerChange(event) {
    setCustomer(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
  }

  function handleTechnicianChange(event) {
    setTechnician(event.target.value);
  }

  function handleReasonChange(event) {
    setReason(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8080/api/appointments/";
    const data = {
      vin: vin.toUpperCase(),
      customer: customer,
      date: date,
      time: time,
      technician: technician,
      reason: reason,
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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

  function getTechnicians() {
    const url = "http://localhost:8080/api/technicians/";
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setTechnicians(response.technicians);
      });
  }

  useEffect(() => {
    getTechnicians();
  }, []);

  return (
    <div className="row">
      <div className="offset-2 col-8">
        <div className="shadow p-4 mt-4 forms">
          <h1>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input value={vin} onChange={handleVinChange} required type="text" name="vin"
                id="vin" placeholder="Automobile VIN" className="form-control" />
              <label>Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customer} onChange={handleCustomerChange} required type="text"
                name="customer" id="customer" placeholder="Customer" className="form-control" />
              <label>Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input value={date} onChange={handleDateChange} required type="date" name="date"
                id="date" placeholder="Date" className="form-control" />
              <label>Date</label>
            </div>
            <div className="form-floating mb-3">
              <input value={time} onChange={handleTimeChange} required type="time" name="time"
                id="time" placeholder="Time" className="form-control" />
              <label>Time</label>
            </div>
            <div className="mb-3">
              <select onChange={handleTechnicianChange} value={technician} required id="technician"
                name="technician" className="form-select">
                <option value="">Choose a Technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.employee_id} value={technician.employee_id}>
                      {technician.first_name + " " + technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input value={reason} onChange={handleReasonChange} required type="text"
                name="reason" id="reason" placeholder="Reason" className="form-control" />
              <label>Reason</label>
            </div>
            <button className="btn btn-secondary">Create</button>
            <span className="mx-4"><a href="/appointments" className="btn btn-secondary"
              role="button">Cancel</a></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
