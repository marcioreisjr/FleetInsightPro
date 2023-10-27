import React, { useState, useEffect } from "react";

/*
To get a list of customers, we need to send a GET request
to the server
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

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    function getCustomers() {
        const url = "http://localhost:8090/api/customers/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setCustomers(response.customers)
            })
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <div>
            <h1 className="text-left my-4">Customers</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
