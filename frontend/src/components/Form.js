import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/axios";

function Form({ setConsulta}) {
  let history = useNavigate();
  const [movimiento, setMovimiento] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
  });
  const [error, setError] = useState(false);

  const changeState = (e) => {
    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
    });
  };

  const createMovimiento = (e) => {
    e.preventDefault();
    if (
      movimiento.concept === "" ||
      movimiento.amount === "" ||
      movimiento.date === "" ||
      movimiento.type === ""
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      API.post("/movements", movimiento)
        .then((res) => {
          setConsulta(true);
          history('/');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <form className="form" onSubmit={createMovimiento}>
      <label>Concept</label>
      <input
        type="text"
        name="concept"
        placeholder="Concept"
        onChange={changeState}
      />
      <label>Amount</label>
      <input
        type="number"
        name="amount"
        placeholder="amount"
        onChange={changeState}
      />
      <label>Date</label>
      <input
        type="date"
        name="date"
       
        onChange={changeState}
      />
      <label>Type</label>
      <select
       
     
        onChange={changeState}
        name="type"
      >
             <option value="">- Select an option -</option>
          <option value="income">Income</option>
          <option value="expenditure">expenditure</option>
      </select>

      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default Form;
