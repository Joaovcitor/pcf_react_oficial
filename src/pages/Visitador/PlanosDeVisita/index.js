import React, { useEffect, useState } from "react";
import { CardContainer, CardImage, CardContent, CardButton } from "./styled";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

export default function PlanosDeVisita() {
  const [childrens, setChildrens] = useState([]);
  const [pregnants, setPregnants] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/");
      setChildrens(response.data);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      const response = await axios.get("/cuidador/meus-cuidadores");
      setPregnants(response.data);
    }
    getData();
  }, []);
  const gravidas = pregnants.filter((f) => f.pregnant);
  console.log(gravidas);

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
      {gravidas.map((child) => (
        <CardContainer key={child.id}>
          <CardContent>
            <p>
              Nome: <span>{child.name}</span>
            </p>
          </CardContent>
          <Link to={`/planos/criarplano-gravida/${child.id}`}>
            <CardButton>Criar Plano</CardButton>
          </Link>
        </CardContainer>
      ))}
    </div>
  );
}
