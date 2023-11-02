import React, { useEffect, useState } from "react";

/*
To create a sale, we need to send a POST request to the server
At http://localhost:8090/api/sales/ with the following
JSON in the body of the request:
    {
        "automobile": "1XKAD49X93J855508",      # must be existing vin
        "salesperson": "1",                     # salesperson ID
        "customer": "2",                        # customer ID
        "price": 29000.99                       # number with two decimal places
    }
*/

function SaleForm({ setAlert }) {
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState("");
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperon] = useState("");
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const [price, setPrice] = useState("");

    function handleAutomobileChange(event) {
        setAutomobile(event.target.value);
    }

    function handleSalespersonChange(event) {
        setSalesperon(event.target.value);
    }

    function handleCustomerChange(event) {
        setCustomer(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8090/api/sales/";
        const data = {
            automobile: automobile.toUpperCase(),
            salesperson: salesperson,
            customer: customer,
            price: price
        };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Call updateAuto function with the vin
                    updateAuto(automobile.toUpperCase());
                    window.location.href = "/sales";
                } else {
                    // throw new Error(response.statusText);
                    return response.json().then(json => {
                        throw new Error(json.message || 'Something went wrong');
                    });
                }
            })
            .catch((error) => {
                setAlert("Error: " + error.message);
            });
    };

    /*
    To update an automobile to sold, we need to send a PUT request to the server
    At http://localhost:8100/api/automobiles/<:vin>/ with the following
    JSON in the body of the request:
    {
        "automobile": "1XKAD49X93J855508",
            # must be an existing automobile vin
        "salesperson": "1",
            # salesperson ID
        "customer": "2",
            # customer ID
        "price": 29000.99
            # number with two decimal places
    }
    */

    function updateAuto(vin) {
        const url = `http://localhost:8100/api/automobiles/${vin}/`;
        const data = {
            sold: true,
        }
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                // throw new Error(response.statusText);
                return response.json().then(json => {
                    throw new Error(json.message || 'Something went wrong');
                });
            }
        })
        .then((result) => {
            console.log(result.message);
        })
        .catch((error) => {
            console.error("Error updating automobile:", error);
        })
    }

    function getAutomobiles() {
        const url = "http://localhost:8100/api/automobiles/"
        fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((response) => {
            setAutomobiles(response.autos.filter(el => el.sold === false))
        })
    }

    function getSalespeople() {
        const url = "http://localhost:8090/api/salespeople/"
        fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((response) => {
            setSalespeople(response.salespeople)
        })
    }

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
    }

    /*
    To get a list of sales, we need to send a GET request to the server
    At http://localhost:8090/api/sales/ and will receive a
    JSON response that looks like this:
    {
        "sale": {
            "salesperson": {
                "first_name": "Howard",
                "last_name": "Chung",
                "employee_id": "hchung",
                "id": 1
            },
            "customer": {
                "first_name": "Incredible",
                "last_name": "Hulk",
                "address": "777 Marvel Avenue, Rocinha, Rio de Janeiro 26456",
                "phone_number": "111-233-1267",
                "id": 2
            },
            "automobile": {
                "import_href": "/api/automobiles/1XKAD49X93J855508/",
                "vin": "1XKAD49X93J855508",
                "sold": true,
                "id": 9
            },
            "price": 29000.99,
            "id": 1
        }
    }
    */

    useEffect(() => {
        getAutomobiles();
        getSalespeople();
        getCustomers();
    }, []);

    return (
        <div className="row">
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <label htmlFor="automobile" className="form-label">Automobile VIN</label>
                            <select onChange={handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                                <option value="">Automobile VIN</option>
                                {automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson" className="form-label">Salesperson</label>
                            <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                                <option value="">Choose a salesperson...</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name + " " + salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer" className="form-label">Customer</label>
                            <select onChange={handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                                <option value="">Choose a customer...</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name + " " + customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input value={price} type="number" min={0} step={0.01}
                                onChange={handlePriceChange} required name="price" id="price"
                                placeholder="0" className="form-control"
                            />
                        </div>
                        <button className="btn btn-secondary">Create</button>
                        <span className="mx-4"><a href="/sales" className="btn btn-secondary" role="button">Cancel</a></span>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SaleForm;
