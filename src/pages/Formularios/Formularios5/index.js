/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Container } from "../../../styles/GlobalStyle";
import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from "date-fns"
import Etapa1 from "../../../components/Formularios5/Etapa1"
import Etapa2 from "../../../components/Formularios5/Etapa2"
import Etapa3 from "../../../components/Formularios5/Etapa3"
import Etapa4 from "../../../components/Formularios5/Etapa4"
import Etapa5 from "../../../components/Formularios5/Etapa5"
import Etapa6 from "../../../components/Formularios5/Etapa6"
import Etapa7 from "../../../components/Formularios5/Etapa7"

import axios from "../../../services/axios"
import { toast } from "react-toastify";


export default function Login({ match }) {
  const { id } = match.params;
  const [child, setChild] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/crianca/info/${id}`)
      setChild(response.data.child)
    }

    getData()
  }, [id])

  function calcularIdadeCompleta(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    const anos = differenceInYears(hoje, nascimento);

    const dataAjustada = subYears(hoje, anos);
    const meses = differenceInMonths(dataAjustada, nascimento);

    const dataAjustadaMeses = subMonths(dataAjustada, meses);
    const dias = differenceInDays(dataAjustadaMeses, nascimento);

    return { anos, meses, dias };
  }

  function renderizarEtapasComBaseNaIdade() {
    const idade = calcularIdadeCompleta(child.id);
    if (idade.anos === 1 && idade.meses <= 6) {
      return <Etapa5></Etapa5>
    } else if (idade.anos === 1 && idade.meses <= 11 && idade.anos <= 2) {
      return <Etapa6></Etapa6>
    } else if (idade.anos === 2 || idade.anos === 3) {
      return <Etapa7></Etapa7>
    }

    if (idade.meses <= 3) {
      return <Etapa1></Etapa1>
    } else if (idade.meses >= 3 && idade.meses <= 6 && idade.dias < 1) {
      return <Etapa2></Etapa2>
    } else if (idade.meses >= 6 && idade.meses <= 9 && idade.dias < 1) {
      return <Etapa3></Etapa3>
    } else if (idade.meses >= 9 && idade.meses <= 12) {
      return <Etapa4 id={id}></Etapa4>
    }
  }

  return (
    <Container>
      <h2>Formulário 5</h2>
      {renderizarEtapasComBaseNaIdade()}
    </Container>
  );
}
