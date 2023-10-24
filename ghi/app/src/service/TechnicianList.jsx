import React, { useState, useEffect } from "react";


function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    function getTechnicians() {
        fetch("http://localhost:8080/api/technicians/")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((response) => {
                setTechnicians(response.technicians);
            });
    }

    useEffect(() => {
        getTechnicians();
    }, []);

    return (
        <div>
            <h1 className="text-center my-4">Technician List</h1>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician, ix) => (
                        <tr key={ix}>
                            <td>{technician.employee_id}</td>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TechnicianList;
