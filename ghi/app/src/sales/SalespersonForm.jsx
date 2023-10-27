import React, { useEffect, useState } from "react";

function SalespersonForm({ setAlert }) {
    const [models, setModels] = useState([]);
    // console.log("#########", models);
    // const [salespeople, setSalespeople] = useState([]);

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
                    throw new Error(response.statusText);
                }
            })
            .catch((error) => {
                setAlert("Error: " + error.message);
            });
    }

    /*
    To get a list of salespeople, we need to send a GET request to the server
    At http://localhost:8090/api/salespeople/ and will receive a
    JSON response that looks like this:
    {
        "first_name": "Shahzad",
        "last_name": "Khan",
        "employee_id": "skhan",
        "id": 6
    }
    */
    function getModels() {
        const url = "http://localhost:8090/api/salespeople/";
        fetch(url)
            .then((response) => {
                // console.log('response:', response)
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                // console.log("############", response)
                setModels(response.models);
            })
    }

    useEffect(() => {
        getModels();
    }, []);

    const [first_name, setFirstName] = React.useState("");
    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }
    // console.log("first name", first_name)

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
                        <button className="btn btn-primary">Create</button>
                        <span className="mx-4"><a href="/salespeople/" className="btn btn-primary" role="button">Cancel</a></span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalespersonForm;
