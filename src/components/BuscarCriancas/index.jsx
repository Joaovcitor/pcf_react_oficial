import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [childrens, setChildres] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/infoall");
      console.log(response.data.children);
      setChildres(response.data.children);
    }
    getData();
  }, []);

  return (
    <Section>
      {childrens.map((child) => {
        return (
          <div key={child.id}>
            <p>Nome: {child.name}</p>
            <Link className="links" to={`/visitas/realizar/${child.id}`}>
              Realizar Visitas
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
