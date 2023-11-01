import React, { useState } from "react";

function SalespersonForm({ setAlert }) {

    /*
    To create a salesperson, we need to send a POST request to the server
    At http://localhost:8090/api/salespeople/ with the following JSON in the
    body of the request:
   {
        "first_name": "Shahzad",
        "last_name": "Khan",
        "employee_id": "skhan"
    }
    */

    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8090/api/salespeople/";
        const data = { first_name, last_name, employee_id };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/salespeople/";
                } else {
                    return response.json().then(json => {
                        throw new Error(json.message || 'Something went wrong');
                    })
                }
            })
            .catch((error) => {
                setAlert("Error: " + error.message);
            });
    }

    const [first_name, setFirstName] = React.useState("");
    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    const [last_name, setLastName] = React.useState("");
    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    const [employee_id, setEmployeeId] = React.useState("");
    function handleEmployeeIdChange(event) {
        setEmployeeId(event.target.value);
    }

    return (
        <div className="row">
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input value={first_name} onChange={handleFirstNameChange} required type="text" name="first_name" id="first_name" placeholder="First Name" className="form-control" />
                            <label>First Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={last_name} onChange={handleLastNameChange} required type="text" name="last_name" id="last_name" placeholder="Last Name" className="form-control" />
                            <label>Last Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employee_id} onChange={handleEmployeeIdChange} required type="text" name="employee_id" id="employee_id" placeholder="Employee ID" className="form-control" />
                            <label>Employee ID...</label>
                        </div>
                        <button className="btn btn-secondary">Create</button>
                        <span className="mx-4"><a href="/salespeople/" className="btn btn-secondary" role="button">Cancel</a></span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalespersonForm;
