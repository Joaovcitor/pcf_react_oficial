import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";
import searchAllUsers from "../../utils/Adm/searchAllUsers";
import { Link } from "react-router-dom";

export default function AdministrativoVisitador() {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [visitasInvalidadas, setVisitasInvalidadas] = useState([]);
  const [faltas, setFaltas] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/faltas/");
        if (response.status === 204) {
          console.log("Sem faltas");
        }
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
  useEffect(() => {
    async function getData() {
      if (user === null) return;
      try {
        const response = await axios.get("/");

        setUsuarioLogado(response.data.user);
      } catch (e) {
        toast.error("Ocorreu um erro!");
      }
    }
    getData();
  }, []);

  const minhasFaltas = faltas.filter(
    (f) => f.userId === usuarioLogado.id && !f.falta_invalidada
  );
  const meusPedidosDeInvalidacaoDeFaltas = faltas.filter(
    (f) => f.userId === usuarioLogado.id && f.pedir_para_invalidar_falta
  );
  console.log(minhasFaltas);

  searchAllUsers(setAllUsers);
  return (
    <>
      <Section>
        <Nav>
          <h4>Suas informações</h4>
          <div className="info">
            <h4>Nome: {usuarioLogado.name}</h4>
            <h4>E-mail: {usuarioLogado.email}</h4>
            <Link to={"/editar-usuario"} className="links">
              Mudar E-mail ou senha
            </Link>
          </div>
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Faltas geradas: {minhasFaltas.length}</h4>
          {minhasFaltas.length > 0 ? (
            minhasFaltas.map((falta) => {
              const usuarioQueDeuFalta = user.find(
                (user) => user.id === falta.registradorId
              );

              return (
                <div key={falta.id}>
                  <p>Motivo da falta:</p>
                  <span>{falta.motivo_da_falta}</span>

                  <p>Falta invalidada?</p>
                  <span>{falta.falta_invalidada ? "Sim" : "Não"}</span>

                  <p>Quem deu a falta:</p>
                  <span>
                    {usuarioQueDeuFalta
                      ? usuarioQueDeuFalta.name
                      : "Usuário não encontrado"}
                  </span>
                  {!falta.pedir_para_invalidar_falta ? (
                    <Link
                      to={`/faltas/pedir-para-invalidar/${falta.id}`}
                      className="links"
                    >
                      Pedir para invalidar
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p>Você não possui nenhuma falta (:</p>
          )}
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Meus Pedidos de invalidar falta</h4>
          {meusPedidosDeInvalidacaoDeFaltas.length > 0 ? (
            meusPedidosDeInvalidacaoDeFaltas.map((falta) => (
              <div key={falta.id}>
                <p>Motivo para invalidar:</p>
                <span>{falta.pedir_para_invalidar_falta}</span>
                <p>Aceito:</p>
                <span>
                  {falta.pedido_para_invalidar_aceito ? "Sim" : "Não"}
                </span>
              </div>
            ))
          ) : (
            <p>Sem pedidos de invalidar falta</p>
          )}
        </Nav>
      </Section>
      <Section>
        <Nav>
          <h4>Visitas Invalidas</h4>
          {faltas.length > 0 && faltas.pedir_para_invalidar_falta ? (
            faltas.map((users) => (
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
            <p>Sem pedidos de invalidar falta</p>
          )}
        </Nav>
      </Section>
    </>
  );
}
