import React, { useEffect, useState } from "react";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subYears,
  subMonths,
} from "date-fns";

import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function Login() {
  const [children, setFamilia] = useState([]);
  const [pregnants, setPregnants] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/cuidador/meus-cuidadores");
        setPregnants(response.data);
      } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro!");
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/");
      setFamilia(response.data);
    }
    getData();
  }, []);

  const gravidas = pregnants.filter((p) => p.pregnant === true);

  function calcularIdadeCompleta(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    const anos = differenceInYears(hoje, nascimento);

    const dataAjustada = subYears(hoje, anos);
    const meses = differenceInMonths(dataAjustada, nascimento);

    const dataAjustadaMeses = subMonths(dataAjustada, meses);
    const dias = differenceInDays(dataAjustadaMeses, nascimento);

    return `${anos} anos, ${meses} meses e ${dias} dias`;
  }

  return (
    <Div>
      <h2>Quantidade de Crianças: {children.length}</h2>
      {children.map((child) => (
        <Section key={child.id}>
          <p>Nome: {child.name}</p>
          <p>Idade: {calcularIdadeCompleta(child.born)}</p>
          <Link className="link" to={`/formularios/${child.id}`}>
            Acessar
          </Link>
        </Section>
      ))}
      <h2>Quantidade de Grávidas: {gravidas.length}</h2>
      {gravidas.map((pregnant) => (
        <Section key={pregnant.id}>
          <p>Nome: {pregnant.name}</p>
          <p>Idade: {calcularIdadeCompleta(pregnant.born)}</p>
          <p>Semanas: {pregnant.week_pregnant}</p>
          <Link className="link" to={`/formularios/gravidas/${pregnant.id}`}>
            Acessar
          </Link>
        </Section>
      ))}
    </Div>
  );
}
