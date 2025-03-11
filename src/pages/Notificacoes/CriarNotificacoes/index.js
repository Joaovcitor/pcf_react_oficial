import React, { useEffect, useState } from "react";
import { Div, Nav, RadioGroup } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function PlanosDeVisita() {
  const [visitadores, setVisitadores] = useState({});
  const [todosVisitadores, setTodosVisitadores] = useState(false);
  const [umVisitador, setUmVisitador] = useState(false);

  const [notificacao_tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/");
      console.log(response.data);
      setUser(response.data.user);
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      switch (user.role) {
        case "coordenador": {
          const response = await axios.get("/coordenador/meus-visitadores");
          console.log(response.data.visitadores);
          setVisitadores(response.data.visitadores);
          break;
        }
        case "supervisor": {
          const response = await axios.get(
            "/supervisor/info-dos-meus-visitadores"
          );
          setVisitadores(response.data.visitador);
          break;
        }
      }
    }
    getData();
  }, [user.role]);

  const handleTodosVisitadoresChange = (event) => {
    setTodosVisitadores(event.target.checked);
  };

  const handleUmVisitadorChange = (event) => {
    setUmVisitador(event.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!notificacao_tipo || descricao.length < 3) {
      return toast.error("Preencha todos os campos");
    }

    console.log(typeof notificacao_tipo, notificacao_tipo);
    console.log(typeof descricao, descricao);

    try {
      if (todosVisitadores) {
        switch (user.role) {
          case "coordenador": {
            await axios.post(
              "/notificacoes/coordenador-create-varias-notificacoes",
              {
                notificacao_tipo,
                descricao,
              }
            );
            toast.success("Notificações criada com sucesso");
            break;
          }
          case "supervisor": {
            await axios.post(
              "/notificacoes/supervisor-create-varias-notificacoes",
              {
                notificacao_tipo,
                descricao,
              }
            );
            toast.success("Notificações criada com sucesso");
            break;
          }
        }

        return toast.success("Notificações criada com sucesso");
      }

      if (umVisitador) {
        switch (user.role) {
          case "coordenador": {
            await axios.post(`/notificacoes/coordenador-create-notificacoes`, {
              id,
              notificacao_tipo,
              descricao,
            });
            break;
          }
          case "supervisor": {
            await axios.post(`/notificacoes/supervisor-create-notificacoes`, {
              id,
              notificacao_tipo,
              descricao,
            });
            break;
          }
        }
        return toast.success("Notificação criada com sucesso");
      }
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
  }

  return (
    <Div onSubmit={handleSubmit}>
      <h2>Criar Notificações</h2>
      <p>Para quem é essa notificação</p>
      <label htmlFor="todosVisitadores">
        Todos os visitadores{" "}
        <input
          onChange={handleTodosVisitadoresChange}
          checked={todosVisitadores}
          type="checkbox"
          name=""
          id=""
        />
      </label>
      <label htmlFor="umVisitador">
        Um visitador{" "}
        <input
          onChange={handleUmVisitadorChange}
          checked={umVisitador}
          type="checkbox"
          name=""
          id=""
        />
      </label>
      {umVisitador ? (
        <select
          name="grau_de_dificuldade_objetivo"
          onChange={(e) => setId(e.target.value)}
          id="grau_de_dificuldade_objetivo"
        >
          <option value="Selecione">Selecione</option>
          {(visitadores && visitadores.length > 0 ? visitadores : []).map(
            (visitador) => {
              return (
                <option key={visitador.id} value={visitador.id}>
                  {visitador.name}
                </option>
              );
            }
          )}
        </select>
      ) : (
        ""
      )}

      <p>Qual o tipo dessa notificação:</p>
      <RadioGroup>
        {["Reunião", "Falta", "Evento", "Outras"].map((tipo) => (
          <label key={tipo} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="radio"
              name="grau_de_dificuldade_objetivo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            {tipo}
          </label>
        ))}
      </RadioGroup>

      <p>Descreva</p>
      <textarea
        name="objetivo"
        onChange={(e) => setDescricao(e.target.value)}
        id="objetivo"
      ></textarea>
      <button type="submit">Criar Notificação</button>
    </Div>
  );
}
