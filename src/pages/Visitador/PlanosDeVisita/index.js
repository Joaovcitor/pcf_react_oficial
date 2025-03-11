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
      {childrens.map((child) => (
        <CardContainer key={child.id}>
          <CardContent>
            <p>
              Nome: <span>{child.name}</span>
            </p>
          </CardContent>
          <Link to={`/planos/criarplano/${child.id}`}>
            <CardButton>Criar Plano</CardButton>
          </Link>
        </CardContainer>
      ))}
    </div>
  );
}
