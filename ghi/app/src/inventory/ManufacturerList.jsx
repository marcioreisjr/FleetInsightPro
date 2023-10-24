import React, { useEffect } from "react";


function ManufacturerList() {
    /*
    * We will store the list of manufacturers in the manufacturers state
    * To ger the list of manufacturers, we need to send a GET request to the
    * server at http://localhost:8100/api/manufacturers/ and will receive a
    * JSON response that looks like this:
    * {
    *   "manufacturers": [
    *    {
    *       "href": "/api/manufacturers/1/",
    *       "id": 1,
    *       "name": "Daimler-Chrysler"
    *    },
    *   ]
    * }
    */
    const [manufacturers, setManufacturers] = React.useState([]);

    function getManufacturers() {
        const url = "http://localhost:8100/api/manufacturers/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setManufacturers(response.manufacturers);
            })
    }

    useEffect(() => {
        getManufacturers();
    }, []);

    return (
        <div>
            <h1 className="text-center my-4">Manufacturer List</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManufacturerList;
