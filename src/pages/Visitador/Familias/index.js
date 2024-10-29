import React, { useEffect, useState } from "react";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";
import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from "date-fns"

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

  for (let i = 0; i < children.length; i++) {
    console.log(calcularIdadeCompleta(children[i].born))
  }
  return (
    <Div>
      <h2>Quantidade de beneficiários: {children.length}</h2>
      {children.map(child => (
        <Section key={child.id}>
          <p>Nome: {child.name}</p>
          <p>Idade: {calcularIdadeCompleta(child.born)}</p>
          <Link className="link" to={`/formularios/${child.id}`}>Acessar</Link>
        </Section>
      ))}
    </Div>
  );
}
