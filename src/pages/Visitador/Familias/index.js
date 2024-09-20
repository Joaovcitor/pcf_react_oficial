import React, { useEffect, useState } from "react";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";

// #F2C8A2
import axios from "../../../services/axios";

export default function Login() {
  const [children, setFamilia] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get("/familias/showfamilias");
      setFamilia(response.data.children);
    }
    getData();
  }, [])

  function formatarDataPtBr(data) {
    const dateObject = new Date(data);
    return dateObject.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  return (
    <Div>
      <h2>Quantidade de beneficiários: {children.length}</h2>
      {children.map(child => (
        <Section key={child.id}>
          <p>Nome: {child.name}</p>
          <p>Nascimento: {formatarDataPtBr(child.born)}</p>
          <Link to={`/formularios/${child.id}`}>Acessar</Link>
        </Section>
      ))}
    </Div>
  );
}
