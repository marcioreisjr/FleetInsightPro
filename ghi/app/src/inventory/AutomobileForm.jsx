import React, { useEffect } from "react";

function AutomobileForm({ setAlert }) {
    const [models, setModels] = React.useState([]);

    /*
    To create a automobile, we need to send a POST request to the server
    At http://localhost:8100/api/automobiles/ with the following JSON in the
    body of the request:
    {
        "color": "red",
        "year": 2012,
        "vin": "1C3CC5FB2AN120174",
        "model_id": 1
    }
    */
    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8100/api/automobiles/";
        const data = { color, year, vin, model_id };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/automobiles/";
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch((error) => {
                setAlert("Error: " + error.message);
            });
    }

    /*
    To get a list of models, we need to send a GET request to the server
    At http://localhost:8100/api/models/ and will receive a
    JSON response that looks like this:
    {
        "models": [
            {
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
        ]
    }
    */
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

    useEffect(() => {
        getModels();
    }, []);

    const [color, setColor] = React.useState("");
    function handleColorChange(event) {
        setColor(event.target.value);
    }

    const [year, setYear] = React.useState("");
    function handleYearChange(event) {
        setYear(event.target.value);
    }

    const [vin, setVin] = React.useState("");
    function handleVinChange(event) {
        setVin(event.target.value);
    }

    const [model_id, setModel_Id] = React.useState("");
    function handleModelChange(event) {
        setModel_Id(event.target.value);
    }

    return (
        <div className="row">
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Add an Automobile to Inventory</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} required type="text"
                            name="color" placeholder="Color" id="color" className="form-control" />
                            <label>Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYearChange} required type="number"
                            name="year" placeholder="Year" id="year" className="form-control" />
                            <label>Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} required type="text"
                            name="vin" placeholder="Vin" id="vin" className="form-control" />
                            <label>Vin</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} value={model_id} required id="model" name="model" className="form-select">
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-secondary">Create</button>
                        <span className="mx-4"><a href="/automobiles/" className="btn btn-secondary" role="button">Cancel</a></span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;
