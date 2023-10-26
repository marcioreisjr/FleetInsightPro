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
            });
            .then((response) => {
                getCustomers(response.customers);
            });
    };

    useEffect(() )


}
