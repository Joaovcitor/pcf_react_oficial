/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Div } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function PlanosDeVisita({ match }) {
  const { id } = match.params;
  const [formData, setFormData] = useState({
    objetivo: "",
    etapa1: "",
    etapa2: "",
    etapa3: "",
    observacao: "",
    conseguiu_fazer: "Com ajuda",
  });
  const [visitaFeita, setVisitaFeita] = useState({})

  useEffect(() => {
    async function getDataPlanos() {
      try {
        const response = await axios.get(`/planos/infosingleplano/${id}`);
        const { plano } = response.data;
        setFormData({
          objetivo: plano.objetivo || "",
          etapa1: plano.etapa1 || "",
          etapa2: plano.etapa2 || "",
          etapa3: plano.etapa3 || "",
          observacao: plano.observacao || "",
          conseguiu_fazer: plano.conseguiu_fazer || "Com ajuda"
        });
        setVisitaFeita(response.data.visitaFeita)
      } catch (error) {
        console.log(error)
        toast.error('Erro ao buscar os dados do plano.');
      }
    }

    getDataPlanos();
  }, [id]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`/planos/editar/${id}`, { ...formData, childId: id });

      toast.success("Plano editado com sucesso!");
      history.push(`/planos/editar/${id}`);
    } catch (e) {
      const errors = get(e, 'response.data.errors', '');
      if (typeof errors === 'string') {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach(error => {
          toast.error(error);
        });
      }
    }
  }

  return (
    <Div onSubmit={handleSubmit}>
      <h2>Editar Plano de visita</h2>
      <p>Objetivo:</p>
      <textarea
        name="objetivo"
        value={formData.objetivo}
        onChange={handleInputChange}
        id="objetivo"
      />
      <p>Momento 1:</p>
      <textarea
        name="etapa1"
        value={formData.etapa1}
        onChange={handleInputChange}
        id="etapa1"
      />
      <p>Momento 2:</p>
      <textarea
        name="etapa2"
        value={formData.etapa2}
        onChange={handleInputChange}
        id="etapa2"
      />
      <p>Momento 3:</p>
      <textarea
        name="etapa3"
        value={formData.etapa3}
        onChange={handleInputChange}
        id="etapa3"
      />
      {visitaFeita.finalizou ? (
        <>
          <p>Observação</p>
          <textarea
            name="observacao"
            value={formData.observacao}
            onChange={handleInputChange}
            id="observacao"
          />
          <p>Conseguiu fazer:</p>
          <select name="conseguiu_fazer" value={formData.conseguiu_fazer} onChange={handleInputChange} id="conseguiu_fazer">
            <option value="Com ajuda">Com ajuda</option>
            <option value="Sem ajuda">Sem ajuda</option>
            <option value="Não quis fazer">Não quis fazer</option>
          </select>
        </>
      ) : (<p>Você não terminou essa visita</p>)}
      <button type="submit">Editar Plano</button>
    </Div>
  );
}
