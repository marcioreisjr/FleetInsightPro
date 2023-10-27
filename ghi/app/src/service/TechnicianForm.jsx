import React, { useState } from "react";


function TechnicianForm({ setAlert }) {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [employee_id, setEmployeeId] = useState("");

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleIdChange(event) {
        setEmployeeId(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            first_name: first_name,
            last_name: last_name,
            employee_id: employee_id
        };
        fetch("http://localhost:8080/api/technicians/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "/technicians/";
            } else {
                return response.json().then(json => {
                    throw new Error(json.message || 'Something went wrong');
                });
            }
        }).catch((error) => {
            setAlert("Error: " + error.message);
        });
    }

    return (
        <div className="row">
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="add-technician-form">
                        <div className="form-floating mb-3">
                            <input value={first_name} onChange={handleFirstNameChange} required type="text" name="first_name" id="first_name" placeholder="First Name" className="form-control" />
                            <label>First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={last_name} onChange={handleLastNameChange} required type="text" name="last_name" id="last_name" placeholder="Last Name" className="form-control" />
                            <label>Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employee_id} onChange={handleIdChange} required type="text" name="employee_id" id="employee_id" placeholder="Employee ID" className="form-control" />
                            <label>Employee ID</label>
                        </div>
                        <button className="btn btn-secondary">Create</button>
                        <span className="mx-4"><a href="/technicians/" className="btn btn-secondary" role="button">Cancel</a></span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
