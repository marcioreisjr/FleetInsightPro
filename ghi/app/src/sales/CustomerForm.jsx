import React, { useEffect, useState } from "react";

function CustomerForm({ setAlert }) {
    const [customers, setCustomers] = useState([]);

    /*
    To create a customer, we need to send a POST request to the server
    At http://localhost:8090/api/customers/ with the following
    JSON in the body of the request:
    {
        "first_name": "Howard",
        "last_name": "Chung",
        "address": "777 Miracle Lane, New York, NY 11101",
        "phone_number": "111-233-1267"
    }
    */
   function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8090/api/customers/";
        const data = { first_name, last_name, address, phone_number };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/customers";
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch((error) => {
                setAlert("Error: " + error.message);
            });
    };
    /*
    To get a list of customers, we need to send a GET request to the server
    At http://localhost:8090/api/customers/ and will receive a
    JSON response that looks like this:
    {
    	"customers": [
            {
            "first_name": "Howard",
            "last_name": "Chung",
            "address": "777 Miracle Lane, New York, NY 11101",
            "phone_number": "111-233-1267",
            "id": 1
            }
        ]
    {
    */
    function getCustomers() {
        const url = "http://localhost:8090/api/customers/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                getCustomers(response.customers);
            });
    };

    useEffect(() => {
        getCustomers();
    }, []);

    // "first_name": "Howard",
    // "last_name": "Chung",
    // "address": "777 Miracle Lane, New York, NY 11101",
    // "phone_number": "111-233-1267",
    const [first_name, setFirstName] = React.useState("");
    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    const [last_name, setLastName] = React.useState("");
    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    const [address, setAddress] = React.useState("");
    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    const [phone_number, setPhoneNumber] = React.useState("");
    function handlePhoneNumberChange(event) {
        setPhoneNumber(event.target.value);
    }

    return (
        <div className="row">
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Add a Customer</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input value={first_name} onChange={handleFirstNameChange} required type="text" name="first_name" id="first_name" placeholder="First Name" className="form-control" />
                            <label>First Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={last_name} onChange={handleLastNameChange} required type="type" name="last_name" id="last_name" placeholder="Last Name" className="form-control"/>
                            <label>Last Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={address} onChange={handleAddressChange} required type="text" name="address" id="address" placeholder="Address" className="form-control"/>
                            <label>Address...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={phone_number} onChange={handlePhoneNumberChange} required type="text" name="address" id="address" placeholder="Phone Number" className="form-control"/>
                            <label>Phone Number...</label>
                        </div>
                        <button className="btn btn-primary">
                            Create
                        </button>
                        <span className="mx-4">
                            <a href="/customers/" className="btn btn-primary" role="button">Cancel</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;
