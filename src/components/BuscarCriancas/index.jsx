import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [childrens, setChildres] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/infoall");
      setChildres(response.data.children);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/cuidador/showcuidadores");
      setCaregivers(response.data.cuidadores);
    }
    getData();
  }, []);

  const gravidas = caregivers.filter((c) => c.pregnant === true);

  return (
    <Section>
      {childrens.map((child) => {
        return (
          <div key={child.id}>
            <p>Nome: {child.name}</p>
            <Link className="link" to={`/visitas/realizar/${child.id}`}>
              Realizar Visitas
            </Link>
          </div>
        );
      })}
      {gravidas.map((caregiver) => {
        return (
          <div key={caregiver.id}>
            <p>Nome: {caregiver.name}</p>
            <Link
              className="link"
              to={`/visitas/visitas-agendadas-gravida/${caregiver.id}`}
            >
              Realizar Visitas
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
