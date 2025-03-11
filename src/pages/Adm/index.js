import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";

export default function Administrativo() {
  const [notificacoes, setNotificacao] = useState([]);
  const [user, setUser] = useState([]);
  const [visitasInvalidadas, setVisitasInvalidadas] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/");
        setUser(response.data.user);
      } catch (e) {
        toast.error("Ocorreu um erro!");
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `/visitasporgeolo/visitas-invalidadas`
        );
        console.log(response.data);
        setVisitasInvalidadas(response.data.visitas);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Section>
        <Nav>
          <h4>Visitas Invalidadas</h4>
          {visitasInvalidadas.length > 0 ? (
            visitasInvalidadas.map((notificacaoItem) => (
              <div key={notificacaoItem.id}>
                <p>
                  ID da Visita: <span>{notificacaoItem.id}</span>
                </p>
                <p>Motivo da Invalidação: </p>
                <span>{notificacaoItem.motivo_da_invalidacao}</span>
              </div>
            ))
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>

        <Nav>
          <h4>Faltas</h4>
          {notificacoes.length > 0 ? (
            notificacoes.map((notificacaoItem) => (
              <div key={notificacaoItem.id}>
                <p>
                  Tipo da notificação:{" "}
                  <span>{notificacaoItem.notificacao_tipo}</span>
                </p>
                <p>Descrição: </p>
                <p>{notificacaoItem.descricao}</p>
              </div>
            ))
          ) : (
            <p>Você não possui nenhuma falta</p>
          )}
        </Nav>
      </Section>
    </>
  );
}
