import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/axios";

import { Div } from "./styled"
import { toast } from "react-toastify";
import FerramentasVisitadores from "../../components/FerramentasVisitadores"
import FerramentasSupervisores from "../../components/FerramentasSupervisores"
import FerramentaCoordenador from "../../components/FerramentasCoordenador"

export default function Visitador() {
  const [users, setUsers] = useState({});
  const [childrens, setChildrens] = useState({});

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/");
      setUsers(response.data.user);
    }

    getData();
  }, []);

  function renderizaComponente() {
    switch(users.role) {
      case "visitador":
        return <FerramentasVisitadores/>
      case "supervisor":
        return <FerramentasSupervisores/>
      case "coordenador":
        return <FerramentaCoordenador/>
    }
  }

  useEffect(() => {
    async function getChildrens() {
      const response = await axios.get("/familias/showfamilias");
      setChildrens(response.data.children)
    }

    getChildrens();
  }, [])
  return (
    <Div>
      <h2>Olá, {users.name}</h2>
      <Link to="/">Editar Perfil</Link>

    {renderizaComponente()}
    </Div>
  );
}
