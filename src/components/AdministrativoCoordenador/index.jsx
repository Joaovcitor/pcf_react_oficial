import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";
import searchAllUsers from "../../utils/Adm/searchAllUsers";
import { Link } from "react-router-dom";

export default function AdministrativoCoordenador() {
  const [notificacoes, setNotificacao] = useState([]);
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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

  searchAllUsers(setAllUsers);

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
          <h4>Todos os funcionários do sistema </h4>
          {allUsers.length > 0 ? (
            allUsers.map((users) => (
              <div key={users.id}>
                <p>Nome completo:</p>
                <span>{users.name}</span>
                <p>Função: </p>
                <span>{users.role}</span>
                <p>Situação da conta: </p>
                <span>{users.isActive ? "Ativa" : "Desativada"}</span>

                {users.role === "supervisor" ? (
                  <>
                    <Link
                      to={`/meus-supervisores/detalhes/${users.id}`}
                      className="links"
                    >
                      Detalhes
                    </Link>
                  </>
                ) : (
                  ""
                )}
                {users.role === "visitador" ? (
                  <>
                    <Link className="links">Detalhes</Link>
                  </>
                ) : (
                  ""
                )}
                <Link className="links" to={`/faltas/criar/${users.id}`}>
                  Gerar falta
                </Link>
                <button className="links">Desativar Conta</button>
              </div>
            ))
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Faltas geradas</h4>
          {allUsers.length > 0 ? (
            allUsers.map((users) => (
              <div key={users.id}>
                <p>Motivo da falta:</p>
                <span>{users.name}</span>
                <p>Falta invalidada? </p>
                <span>{users.role}</span>
                <p>Quem recebeu a falta:</p>
                <span>{users.isActive ? "Ativa" : "Desativada"}</span>
                <p>Quem deu a falta:</p>
                <span>{users.isActive ? "Ativa" : "Desativada"}</span>
              </div>
            ))
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Pedidos de invalidar falta</h4>
          {allUsers.length > 0 ? (
            allUsers.map((users) => (
              <div key={users.id}>
                <p>Quem pediu:</p>
                <span>{users.name}</span>
                <p>Motivo para invalidar: </p>
                <span>{users.role}</span>

                <button className="links">Invalidar Falta</button>
                <button className="links">Validar Falta</button>
              </div>
            ))
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>
      </Section>
    </>
  );
}
