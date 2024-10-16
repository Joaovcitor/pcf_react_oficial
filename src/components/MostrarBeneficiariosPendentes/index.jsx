import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { format } from "date-fns";

import { toast } from "react-toastify";
import { get } from "lodash";

export default function dados() {
  const [childrens, setChildrens] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/supervisor/beneficiarios-pendentes");
      console.log("Teste", response.data);
      setChildrens(response.data.childrens);
      setCaregivers(response.data.caregivers);
    }
    getData();
  }, []);

  const handleSubmitValidar = async (idChild, idCaregiver) => {
    try {
      await axios.put("/supervisor/validar-cuidador", {
        idCaregiver,
      });

      await axios.put("/supervisor/validar-crianca", {
        idChild,
      });

      toast.success("Dados Validados");
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof errors === "object") {
        Object.values(errors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
      }
    }
  };

  return (
    <Section>
      {childrens.map((beneficiario) => {
        return (
          <div key={beneficiario.id}>
            <h4>Dados Cuidador</h4>
            <p>Nome: {beneficiario.Caregiver.name}</p>
            <p>CPF: {beneficiario.Caregiver.cpf}</p>
            <p>RG: {beneficiario.Caregiver.rg}</p>
            <br />
            <h4>Dados da criança</h4>
            <p>Nome: {beneficiario.name}</p>
            <p>
              Data de nascimento:{" "}
              {format(new Date(beneficiario.born), "dd-MM-yyyy")}
            </p>
            <p>NIS: {beneficiario.nis}</p>
            <br />
            <h4>Dados do Visitador</h4>
            <p>Nome: {beneficiario.visitador.name}</p>
            <button
              onClick={() =>
                handleSubmitValidar(beneficiario.id, beneficiario.Caregiver.id)
              }
              type="button"
              className="links"
            >
              Validar dados
            </button>
          </div>
        );
      })}

      {caregivers.map((beneficiario) => {
        return (
          <div key={beneficiario.id}>
            <h4>Dados da gestante</h4>
            <p>Nome: {beneficiario.name}</p>
            <p>CPF: {beneficiario.cpf}</p>
            <p>RG: {beneficiario.rg}</p>
            <br />
            <h4>Dados do Visitador</h4>
            <p>Nome: {beneficiario.visitador.name}</p>
            <button
              onClick={() =>
                handleSubmitValidar(beneficiario.id, beneficiario.id)
              }
              type="button"
              className="links"
            >
              Validar dados
            </button>
          </div>
        );
      })}
    </Section>
  );
}
