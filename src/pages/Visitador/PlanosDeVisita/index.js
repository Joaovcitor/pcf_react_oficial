import React, { useEffect, useState } from "react";
import { CardContainer, CardImage, CardContent, CardButton } from "./styled";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

export default function PlanosDeVisita() {
  const [childrens, setChildrens] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/infoall");
      setChildrens(response.data.children);
    }
    getData();
  }, []);

  return (
    <div>
      <h2>Criar Planos de visitas</h2>
      {childrens.map((child) => (
        <CardContainer key={child.id}>
          <CardContent>
            <p>Nome: <span>{child.name}</span></p>
            <p>Criar Plano de Visita</p>
          </CardContent>
          <Link to={`/planos/criarplano/${child.id}`}>
            <CardButton>Acessar</CardButton>
          </Link>
        </CardContainer>
      ))}
    </div>
  );
}
