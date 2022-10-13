import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../config/axios";
import Error from "./Error";

function EditForm({ setConsulta, moviments }) {
  let history = useNavigate();
  let { id } = useParams();
  const [datosFiltrados] = moviments.filter((mov) => mov.id == id);
  const [mov, setmov] = useState({
    concept: datosFiltrados.concept,
    amount: datosFiltrados.amount,
    date: datosFiltrados.date,
    type: datosFiltrados.type,
  });
  const [error, setError] = useState(false);

  const changeState = (e) => {
    setmov({
      ...mov,
      [e.target.name]: e.target.value,
    });
  };

  const editMovement = (e) => {
    e.preventDefault();
    if (
      mov.concept === "" ||
      mov.amount === "" ||
      mov.date === "" ||
      mov.type === ""
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      mov.date = mov.date.slice(0,10)
      API.patch(`/movements/${id}`, mov)
        .then((res) => {
          setConsulta(true);
          history("/");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <React.Fragment>
              <h1>Edit movement</h1>

      <form className="form" onSubmit={editMovement}>
        <label>Concept</label>
        <input
          type="text"
          name="concept"
          placeholder="concept"
          onChange={changeState}
          defaultValue={datosFiltrados.concept}
        />
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={changeState}
          defaultValue={datosFiltrados.amount}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          onChange={changeState}
          defaultValue={datosFiltrados.date}
        />
        <label>Type</label>
        <select
          className="u-full-width"
          id="type-form"
          onChange={changeState}
          name="type"
          defaultValue={datosFiltrados.type}
        >
          <option value="">- Select an option -</option>
          <option value="income">Income</option>
          <option value="expenditure">expenditure</option>
        </select>

        <button type="submit">Save</button>
      </form>
      {error ? <Error message="All fields are required" /> : null}
    </React.Fragment>
  );
}

export default EditForm;
