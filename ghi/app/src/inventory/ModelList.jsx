
import React from "react";
import "./inventory_styles.css";

function ModelList() {
    /*
    * We will store the list of models in the models state
    * To ger the list of models, we need to send a GET request to the
    * server at http://localhost:8100/api/models/ and will receive a
    * JSON response that looks like this:
    * {
    *   "models": [
    *    {
    *       "href": "/api/models/1/",
    *       "id": 1,
    *       "name": "Sebring",
    *       "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    *       "manufacturer": {
    *           "href": "/api/manufacturers/1/",
    *           "id": 1,
    *           "name": "Daimler-Chrysler"
    *       }
    *    },
    *   ]
    * }
    */
    const [models, setModels] = React.useState([]);

    function getModels() {
        const url = "http://localhost:8100/api/models/";
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setModels(response.models);
            })
    }

    React.useEffect(() => {
        getModels();
    }, []);

    return (
        <div>
            <h1 className="text-center my-4">Model List</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img className="model-pic shadow" src={model.picture_url} alt={model.name} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ModelList;
