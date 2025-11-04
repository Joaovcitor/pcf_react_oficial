import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";
import searchAllUsers from "../../utils/Adm/searchAllUsers";
import { Link } from "react-router-dom";
import AdministrativoCoordenador from "../../components/AdministrativoCoordenador";
import AdministrativoVisitador from "../../components/AdministrativoVisitador";
import AdministrativoSupervisor from "../../components/AdministrativoSupervisor";

export default function Administrativo() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/");
      console.log(response);
      setUser(response.data.user);
    }
    getData();
  }, []);

  function renderizaAreaAdmPorRole() {
    switch (user.role) {
      case "visitador": {
        return (
          <>
            <AdministrativoVisitador></AdministrativoVisitador>
          </>
        );
      }
      case "coordenador": {
        return (
          <>
            <AdministrativoCoordenador></AdministrativoCoordenador>
          </>
        );
      }
      case "supervisor": {
        return (
          <>
            <AdministrativoSupervisor></AdministrativoSupervisor>
          </>
        );
      }
    }
  }
  return <>{renderizaAreaAdmPorRole()}</>;
}
