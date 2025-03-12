import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

import { Nav, Section } from "./styled";
import { toast } from "react-toastify";
import searchAllUsers from "../../utils/Adm/searchAllUsers";
import { Link } from "react-router-dom";
import AdministrativoCoordenador from "../../components/AdministrativoCoordenador";

export default function Administrativo() {
  return (
    <>
      <AdministrativoCoordenador></AdministrativoCoordenador>
    </>
  );
}
