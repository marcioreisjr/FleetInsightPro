import React, { useState } from "react";

function CustomerForm({ setAlert }) {
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
    const [first_name, setFirstName] = useState("");
    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    const [last_name, setLastName] = useState("");
    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    const [address, setAddress] = useState("");
    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    const [phone_number, setPhoneNumber] = useState("");
    function handlePhoneNumberChange(event) {
        setPhoneNumber(event.target.value);
    }

    function fixPhoneNumber(phone_number) {
        phone_number = phone_number.replace(/[^+\d]/g, "");
        let re = (/(\+\d{1,3})?\(?(\d{3})\)?(\d{3})(\d{4})/g)
            .exec(phone_number);
        if (re) {
            return `${re[1] ? re[1].trim() :
                ""} (${re[2]})${re[3]}-${re[4]}`.trim();
        }
        return phone_number.trim();
    }

    function handlePhoneBlur(event) {
        setPhoneNumber(fixPhoneNumber(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8090/api/customers/";
        const data = {
            first_name,
            last_name,
            address,
            phone_number: fixPhoneNumber(phone_number),
        };
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
                            <input value={last_name} onChange={handleLastNameChange} required type="type" name="last_name" id="last_name" placeholder="Last Name" className="form-control" />
                            <label>Last Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={address} onChange={handleAddressChange} required type="text" name="address" id="address" placeholder="Address" className="form-control" />
                            <label>Address...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={phone_number} onChange={handlePhoneNumberChange} onBlur={handlePhoneBlur}
                            required type="tel" name="address" id="address" placeholder="Phone Number" className="form-control" />
                            <label>Phone Number...</label>
                        </div>
                        <button className="btn btn-secondary">
                            Create
                        </button>
                        <span className="mx-4">
                            <a href="/customers/" className="btn btn-secondary" role="button">Cancel</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;
