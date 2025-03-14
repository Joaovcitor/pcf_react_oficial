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
  const [faltas, setFaltas] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/faltas/");
        if (response.status === 204) {
          console.log("Sem faltas");
        }
        console.log(response.data.faltas);
        setFaltas(response.data.faltas);
      } catch (e) {
        toast.error("Ocorreu um erro!");
      }
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      if (user === null) return;
      try {
        const response = await axios.get("/users/");

        setUser(response.data.users);
      } catch (e) {
        toast.error("Ocorreu um erro!");
      }
    }
    getData();
  }, []);

  const faltasParaInvalidar = faltas.filter(
    (f) => f.pedir_para_invalidar_falta !== null
  );

  searchAllUsers(setAllUsers);
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
                {users.role !== "coordenador" && (
                  <>
                    <Link className="links" to={`/faltas/criar/${users.id}`}>
                      Gerar falta
                    </Link>
                    <button className="links">Desativar Conta</button>
                  </>
                )}
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
          {faltas.length > 0 ? (
            faltas.map((falta) => {
              // Busca o usuário que deu a falta
              const usuarioQueDeuFalta = user.find(
                (user) => user.id === falta.registradorId
              );
              const usuarioQueLevouFalta = user.find(
                (user) => user.id === falta.userId
              );

              return (
                <div key={falta.id}>
                  <p>Motivo da falta:</p>
                  <span>{falta.motivo_da_falta}</span>

                  <p>Falta invalidada?</p>
                  <span>{falta.falta_invalidada ? "Sim" : "Não"}</span>

                  <p>Quem recebeu a falta:</p>
                  <span>
                    {usuarioQueDeuFalta
                      ? usuarioQueLevouFalta.name
                      : "Não informado"}
                  </span>

                  <p>Quem deu a falta:</p>
                  <span>
                    {usuarioQueDeuFalta
                      ? usuarioQueDeuFalta.name
                      : "Usuário não encontrado"}
                  </span>
                </div>
              );
            })
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Pedidos de invalidar falta</h4>
          {faltasParaInvalidar.length > 0 ? (
            faltasParaInvalidar.map((falta) => {
              const usuarioQueLevouFalta = user.find(
                (user) => user.id === falta.userId
              );

              return (
                <div key={falta.id}>
                  <p>Motivo para invalidar:</p>
                  <span>{falta.pedir_para_invalidar_falta}</span>
                  <p>Quem recebeu a falta:</p>
                  <span>
                    {usuarioQueLevouFalta
                      ? usuarioQueLevouFalta.name
                      : "Não informado"}
                  </span>
                  <p>Deseja invalidar a falta?</p>
                  <nav className="buttons">
                    <button className="links">Sim</button>
                    <button className="links">Não</button>
                  </nav>
                </div>
              );
            })
          ) : (
            <p>Você não possui nenhuma visita invalidada</p>
          )}
        </Nav>
      </Section>
    </>
  );
}
