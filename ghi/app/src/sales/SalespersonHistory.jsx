import React, { useState, useEffect } from "react";

/*
to get a list of salespeople, we need to send a GET request to the server
At http://localhost:8090/api/salespeople/ and will receive a
JSON response that looks like this:
{
	"salespeople": [
		{
			"first_name": "Howard",
			"last_name": "Chung",
			"employee_id": "hchung",
			"id": 1
		}
    ]
}
*/

function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState([]);

    function handleSalespersonChange(event) {
        setSalesperson(event.target.value);
    }

    function getSalespeople() {
        const url = "http://localhost:8090/api/salespeople/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setSalespeople(response.salespeople)
            })

    };

    useEffect(() => {
        getSalespeople();
    }, []);

    return (
        <div className="row">
            <h1 className="text-left my-4">Salesperson History</h1>
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                        <option value="">Salesperson</option>
                        {salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
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
                    {salespeople.map((salesperson) => (
                        <tr>
                            <td>{salesperson.first_name} {salesperson.last_name}</td>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalespersonHistory;
