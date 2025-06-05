import React, { useState, useEffect } from 'react';
import { getAllAlumni } from '../services/AlumService'; // adjust path if needed

const ListAlum = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllAlumni()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error('Error fetching alumni:', error));
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">List of Alumni</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((alum) => (
            <tr key={alum.id}>
              <td>{alum.firstName}</td>
              <td>{alum.lastName}</td>
              <td>{alum.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAlum;
