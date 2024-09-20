import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/axios";

import { Div } from "./styled"
import FerramentasVisitadores from "../../components/FerramentasVisitadores"
import FerramentasSupervisores from "../../components/FerramentasSupervisores"
import FerramentaCoordenador from "../../components/FerramentasCoordenador"

export default function Visitador() {
  const [users, setUsers] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      setUsers(response.data.user);
    } catch (e) {
      console.log(e)
    }
  }


  React.useEffect(() => {
    fetchData()
  }, []);

  function renderizaComponente() {
    if (!users) return null;
    switch(users.role) {
      case "visitador":
        return <FerramentasVisitadores/>
      case "supervisor":
        return <FerramentasSupervisores/>
      case "coordenador":
        return <FerramentaCoordenador/>
    }
  }
  return (
    <Div>
      {users ? (
        <>
          <h2>Olá, {users.name}</h2>
          {renderizaComponente()}
        </>
      ) : (
        <p>Carregando...</p> // Mensagem de carregamento enquanto busca os dados
      )}
    </Div>
  );
}
