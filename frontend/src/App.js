import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "../src/assest/App.css";
import API from "./config/axios";
import Title from "./components/Title";
import EditForm from "./components/EditForm";
import Table from "./components/Table";
import TitleNew from "./components/TitleNew";
import Form from "./components/Form.js";

function App() {
  const [moviments, setMovements] = useState([]);
  const [consulta, setConsulta] = useState(true);
  useEffect(() => {
    if (consulta) {
      const consultaAPI = () => {
        API.get("/movements")
          .then((res) => {
            setMovements(res.data);
            setConsulta(false);
            
          })
          .catch((error) => console.log(error));
      };

      consultaAPI();
    }
  }, [consulta]);



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Title moviments={moviments} />
              <Table moviments={moviments} setConsulta={setConsulta} />
            </React.Fragment>
          }
        />
        <Route
          path="/new"
          element={
            <React.Fragment>
              <TitleNew />
              <Form setConsulta={setConsulta} />
            </React.Fragment>
          }
        />
        <Route
          path="/movement/:id"
          element={
            <EditForm moviments={moviments} setConsulta={setConsulta} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
