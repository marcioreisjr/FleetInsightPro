import React, { useState, useEffect } from "react";

function SaleList({ setAlert }) {
    const[sales, setSales] = useState([])

    function getSales() {
        const url = "http://localhost:8090/api/sales/"
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setSales(response.sales)
            })
    };

    useEffect(() => {
        getSales();
    }, []);

    return (
        <div>
            <h1 className="text-left my-4">Sales</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <td>Salesperson Employee ID</td>
                        <td>Salesperson Name</td>
                        <td>Customer</td>
                        <td>VIN</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                        <tr>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name + " " + sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default SaleList;