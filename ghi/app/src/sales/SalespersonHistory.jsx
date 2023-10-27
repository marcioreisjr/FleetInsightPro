import React, { useState, useEffect } from "react";

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState(""); // New state to track selected salesperson

    function handleSalesChange(event) {
        setSelectedSalesperson(event.target.value);
    }

    // Use this function to filter sales based on the selected salesperson
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
                            <option key={sale.salesperson.id} value={sale.salesperson.id}>
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


// import React, { useState, useEffect } from "react";

// /*
// to get a list of salespeople, we need to send a GET request to the server
// At http://localhost:8090/api/salespeople/ and will receive a
// JSON response that looks like this:
// {
// 	"salespeople": [
// 		{
// 			"first_name": "Howard",
// 			"last_name": "Chung",
// 			"employee_id": "hchung",
// 			"id": 1
// 		}
//     ]
// }
// */

// function SalespersonHistory() {
//     const [sales, setSales] = useState([]);
//     const [sale, setSale] = useState([]);
//     const [salespeople, setSalespeople] = useState([]);
//     const [salesperson, setSalesperson] = useState([]);

//     function handleSales(event) {
//         setSales(event.target.value);
//     }

//     function handleSalespersonChange(event) {
//         setSalesperson(event.target.value);
//     }

//     function getSales() {
//         const url = "http://localhost:8090/api/sales/";
//         fetch(url)
//             .then((response) => {
//                 if (response.status === 200) {
//                     return response.json();
//                 }
//             })
//             .then((response) => {
//                 setSales(response.sales)
//             })

//     };

//     function getSalespeople() {
//         const url = "http://localhost:8090/api/salespeople/";
//         fetch(url)
//             .then((response) => {
//                 if (response.status === 200) {
//                     return response.json();
//                 }
//             })
//             .then((response) => {
//                 setSalespeople(response.salespeople)
//             })

//     };

//     useEffect(() => {
//         getSales();
//         getSalespeople();
//     }, []);

//     return (
//         <div className="row">
//             <h1 className="text-left my-4">Salesperson History</h1>
//                 <div className="mb-3">
//                     <select onChange={handleSales} value={salesperson} required id="sales" name="sales" className="form-select">
//                         <option value="">Salesperson</option>
//                         {sales.map(sale => {
//                             return (
//                                 <option key={sale.id} value={sale.id}>
//                                     {sale.salesperson.first_name} {sale.salesperson.last_name}
//                                 </option>
//                             )
//                         })}
//                     </select>
//                 </div>
//                 <div className="mb-3">
//                     <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
//                         <option value="">Salesperson</option>
//                         {salespeople.map(salesperson => {
//                             return (
//                                 <option key={salesperson.id} value={salesperson.id}>
//                                     {salesperson.first_name} {salesperson.last_name}
//                                 </option>
//                             )
//                         })}
//                     </select>
//                 </div>
//             <table className="table table-striped shadow">
//                 <thead>
//                     <tr>
//                         <th>Salesperson</th>
//                         <th>Customer</th>
//                         <th>VIN</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sales.map((sale) => (
//                         <tr>
//                             <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
//                             <td>{sale.customer.first_name} {sale.customer.last_name}</td>
//                             <td>{sale.automobile}</td>
//                             <td>${sale.price}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SalespersonHistory;
