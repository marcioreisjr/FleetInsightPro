import React, { useState, useEffect } from "react";
import Price from "./Price";

function SaleList({ setAlert }) {
    const [sales, setSales] = useState([]);

    function getSales() {
        const url = "http://localhost:8090/api/sales/"
        fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    return data.json();
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
                    <tr >
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name + " " + sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td><Price price={sale.price} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default SaleList;
