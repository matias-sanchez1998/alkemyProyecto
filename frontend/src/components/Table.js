import React from "react";
import { Link } from "react-router-dom";
import API from '../config/axios';

function Table({ moviments, setConsulta }) {
  const deleteMovement = async (id) => {
    try {
      const res = await API.delete(`movements/${id}`)
      setConsulta(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <ul >
        {moviments.map((movimiento) => {
          return (
            <li className="movimientos" key={movimiento.id}>
              Movement: {movimiento.concept} Amount: {movimiento.amount} Type: {movimiento.type}
              <div>
              <Link to={`/movement/${movimiento.id}`}>
                <button className="button button-primary add-movement">Edit</button>
              </Link>
              <Link to={"/"}>
                <button className="button button-primary add-movement" onClick={() => deleteMovement(movimiento.id)}>
                  Delete
                </button>
              </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Table;
