import React, { useState, useEffect } from "react";
import Price from "./Price";

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState("");

    function handleSalesChange(event) {
        setSelectedSalesperson(event.target.value);
    }

    function filterSalesBySalesperson() {
        return sales.filter((sale) => sale.salesperson.id === parseInt(selectedSalesperson));
    }
    // get auto sold details at `http://localhost:8100/api/automobiles/<str:vin>`
    function getSales() {
        const url = "http://localhost:8090/api/sales/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setSales(response.sales);
            });
    }

    useEffect(() => {
        getSales();
    }, []);

    return (
        <div className="container">
            <div>
                <h1 className="text-left my-4">Salesperson History</h1>
                <div className="my-4">
                    <select onChange={handleSalesChange} value={selectedSalesperson} required id="salesperson" name="salesperson" className="form-select">
                        <option value="">Salesperson</option>
                        {sales.map((sale) => (
                            <option key={sale.id} value={sale.salesperson.id}>
                                {sale.salesperson.first_name} {sale.salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped shadow">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterSalesBySalesperson().map((sale) => (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td><Price price={sale.price} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalespersonHistory;
