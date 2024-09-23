import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Table, Section, StyledLink, TableCell, TableRow } from "./styled";

export default function Notifications() {
  const [visitas, setNotificacao] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/tabelas/infoall`);
      setNotificacao(response.data.visitas);
    }
    getData();
  }, []);

  return (
    <Section>
      <h4>Tabela de Visitas</h4>
      {visitas.length > 0 ? (
        <Table>
          {visitas.map((visita) => (
            <div key={visita.id} className="visitas">
              <table>
                <thead>
                  <tr>
                    <th>Dia da Visita</th>
                    <th>Beneficiário</th>
                    <th>Horário da Visita</th>
                    <th>Editar ou excluir</th>
                  </tr>
                </thead>
                <tbody id="visitas-tbody">
                  <tr>
                    <td>{visita.dayOfVisit}</td>
                    <td>{visita.childVisited}</td>
                    <td>{visita.period}</td>
                    <td>
                      <Link to={`/tabelas/editar`} className="links">
                        Acessar
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="/familias" className="links">
                Criar visitas
              </Link>
            </div>
          ))}
        </Table>
      ) : (
        <p>Sem Tabelas no momento.</p>
      )}
    </Section>
  );
}
