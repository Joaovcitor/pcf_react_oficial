/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";

export default function Notifications({ endpoint }) {
  const [notificacoes, setNotificacao] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/notificacoes/${endpoint}`);
        if (response.status === 200) {
          return setNotificacao(response.data.notificacoes);
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          toast.warn("Nenhuma notificação foi encontrada");
        } else {
          toast.error("Ocorreu um erro ao buscar suas notificações");
        }
      }
    }
    getData();
  }, [endpoint]);
  return (
    <Section>
      <h4>Avisos e notificações</h4>
      <Nav>
        {notificacoes.length > 0 ? (
          notificacoes.map((notificacaoItem) => (
            <div key={notificacaoItem.id}>
              <p>{notificacaoItem.descricao}</p>
            </div>
          ))
        ) : (
          <p>Sem notificações no momento.</p>
        )}
      </Nav>
    </Section>
  );
}
