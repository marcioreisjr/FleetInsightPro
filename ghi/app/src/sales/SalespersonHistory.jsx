import React, { useState, useEffect } from "react";

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState("");

    function handleSalesChange(event) {
        setSelectedSalesperson(event.target.value);
    }

    function filterSalesBySalesperson() {
        return sales.filter((sale) => sale.salesperson.id === parseInt(selectedSalesperson));
    }

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
        <div className="row">
            <div className="col-lg-6">
                <h1 className="text-left my-4">Salesperson History</h1>
                <div>
                    <select onChange={handleSalesChange} value={selectedSalesperson} required id="salesperson" name="salesperson" className="form-select">
                        <option value="">Salesperson</option>
                        {sales.map((sale) => (
                            <option key={sale.id} value={sale.salesperson.id}>
                                {sale.salesperson.first_name} {sale.salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <table className="table table-striped shadow">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>Manufacturer</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Picture</th>
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
                                    <td>${sale.price}</td>
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
