import React from "react";

function ManufacturerForm() {
  const [manufacturerName, setManufacturerName] = React.useState("");

  function handleNameChange(event) {
    setManufacturerName(event.target.value);
  }

  /*
   * To create a manufacturer, we need to send a POST request to the server
   * At http://localhost:8100/api/manufacturers/ with the following JSON in the
   * body of the request:
   * {
   *    "name": "manufacturerName"
   * }
   */
  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8100/api/manufacturers/";
    const data = { name: manufacturerName };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Manufacturer created successfully");
          window.location.href = "/manufacturers/";
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
          <h1 className='large-heading-dark'>Create a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input onChange={handleNameChange} value={manufacturerName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-secondary">Create</button>
            <span className="mx-4"><a href="/manufacturers/" className="btn btn-secondary" role="button">List</a></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
