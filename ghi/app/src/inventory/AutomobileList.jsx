import React, { useState, useEffect } from "react";

/*
To get a list of automobiles, we need to send a GET request to the server
At http://localhost:8100/api/automobiles/ and will receive a
JSON response that looks like this:
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
*/


function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);
    /*
    To get a list of automobiles, we need to send a GET request to the server
    At http://localhost:8100/api/automobiles/ and will receive a
    JSON response that looks like this:
    {
      "autos": [
        {
          "href": "/api/automobiles/1C3CC5FB2AN120174/",
          "id": 1,
          "color": "yellow",
          "year": 2013,
          "vin": "1C3CC5FB2AN120174",
          "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
              "href": "/api/manufacturers/1/",
              "id": 1,
              "name": "Daimler-Chrysler"
            }
          },
          "sold": false
        }
      ]
    }
    */
    function getAutomobiles() {
        const url = "http://localhost:8100/api/automobiles/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setAutomobiles(response.autos);
            })
    }

    useEffect(() => {
        getAutomobiles();
    }, []);

    return (
        <div>
            <h1 className="text-center my-4">Automobile List</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile) => (
                        <tr key={automobile.id}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            <td>{automobile.sold ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default AutomobileList;
