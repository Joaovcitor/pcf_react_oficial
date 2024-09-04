import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyle";

import { Link } from "react-router-dom";

import { Div } from "./styled"
import FerramentasVisitadores from "../../components/FerramentasVisitadores"
import axios from "../../services/axios";
import { toast } from "react-toastify";

export default function Visitador() {
  const [users, setUsers] = useState({});
  const [childrens, setChildrens] = useState({});

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/visitadores/showInformations");
      setUsers(response.data.user);
    }

    getData();
  }, [])

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
      <FerramentasVisitadores>

      </FerramentasVisitadores>
    </Div>
  );
}
