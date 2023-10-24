import React, { useEffect } from "react";

function ModelForm() {

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

    const [name, setName] = React.useState("");
    function handleNameChange(event) {
        setName(event.target.value);
    }

    const [picture_url, setPicture_Url] = React.useState("");
    function handlePicture_UrlChange(event) {
        setPicture_Url(event.target.value);
    }

    const [manufacturer_id, setManufacturer_Id] = React.useState("");
    function handleManufacturer_IdChange(event) {
        setManufacturer_Id(event.target.value);
    }

    /*
    To create a model, we need to send a POST request to the server
    At http://localhost:8100/api/models/ with the following JSON in the
    body of the request:
    {
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer_id": 1
    }
    */
    function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8100/api/models/";
        const data = { name, picture_url, manufacturer_id };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Model created successfully");
                    window.location.href = "/models/";
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-Vehicle-Model-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="Name" id="Name" className="form-control" />
                            <label htmlFor="Name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={picture_url} onChange={handlePicture_UrlChange} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture url">picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select value={manufacturer_id} onChange={handleManufacturer_IdChange} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer_id => {
                                    return (
                                        <option key={manufacturer_id.id} value={manufacturer_id.id}>{manufacturer_id.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-secondary">Create</button>
                        <span className="mx-4"><a href="/models/" className="btn btn-secondary" role="button">List</a></span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModelForm;
