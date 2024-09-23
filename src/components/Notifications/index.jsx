/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Nav, Section } from "./styled";

export default function Notifications({ endpoint }) {
  const [notificacoes, setNotificacao] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/notificacoes/${endpoint}`);
      setNotificacao(response.data.notificacoes);
    }
    getData();
  }, [endpoint]);
  return (
    <Section>
      <h4>Avisos e notificações</h4>
      <Nav>
        {notificacoes.length > 0 ? (
          notificacoes.map((notificacaoItem) => (
            <div key={notificacaoItem.id}>{notificacaoItem.descricao}</div>
          ))
        ) : (
          <p>Sem notificações no momento.</p>
        )}
      </Nav>
    </Section>
  );
}
