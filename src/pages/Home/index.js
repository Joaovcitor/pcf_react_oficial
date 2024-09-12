import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/axios";

import { Div } from "./styled"
import { toast } from "react-toastify";
import FerramentasVisitadores from "../../components/FerramentasVisitadores"
import FerramentasSupervisores from "../../components/FerramentasSupervisores"

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
        return toast.success("Você é coordenador")
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
      <div className="dados">
        <nav>
          <p>Planos criados: </p>
        </nav>
        <nav className="beneficiarios">
          <p>Beneficiários: {childrens.length}</p>
        </nav>
      </div>
    {renderizaComponente()}
    </Div>
  );
}
