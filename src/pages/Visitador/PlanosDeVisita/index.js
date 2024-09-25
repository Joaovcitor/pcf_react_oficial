import React, { useEffect, useState } from "react";
import { Div, Nav } from "./styled";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

export default function PlanosDeVisita() {

  const [childrens, setChildrens] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/infoall");
      setChildrens(response.data.children)
    }

    getData()
  }, []);

  return (
    <Div>
      <h2>Criar Planos de visitas</h2>

      {childrens.map(child => {
        return (
          <Nav key={child.id}>
            <p>Nome: <span>{child.name}</span></p>
            <Link className="link" to={`/planos/criarplano/${child.id}`}>Criar Plano</Link>
          </Nav>)
      })}
    </Div>
  );
}
