import React, { useState } from "react";
import axios from "../../services/axios";

import { Div } from "./styled";
import FerramentasVisitadores from "../../components/FerramentasVisitadores";
import FerramentasSupervisores from "../../components/FerramentasSupervisores";
import FerramentaCoordenador from "../../components/FerramentasCoordenador";

export default function Visitador() {
  const [users, setUsers] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      setUsers(response.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  function renderizaComponente() {
    if (!users) return null;
    switch (users.role) {
      case "visitador":
        return (
          <>
            <FerramentasVisitadores />
            {/* <TabelaDevisitasDosVisitadores /> */}
          </>
        );
      case "supervisor":
        return (
          <>
            <FerramentasSupervisores />
          </>
        );
      case "coordenador":
        return (
          <>
            <FerramentaCoordenador />
            {/* <Notifications endpoint={"supervisor-showall-notificacoes"} /> API ainda não possui notificações para coordenadores */}
          </>
        );
    }
  }
  return (
    <Div>{users ? <>{renderizaComponente()}</> : <p>Carregando...</p>}</Div>
  );
}
