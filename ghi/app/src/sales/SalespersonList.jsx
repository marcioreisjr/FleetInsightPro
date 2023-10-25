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

function SalespersonList() {
    const [salespeople, setSalespeople] = useState([]);

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
        <div>
            <h1 className="text-left my-4">Salespeople</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map((salesperson) => (
                        <tr>
                            <td>{salesperson.employee_id}</td>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalespersonList;
