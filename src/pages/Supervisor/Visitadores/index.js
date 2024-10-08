import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import BuscarVisitadores from "../../../components/BuscarVisitadores"

import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import { Form } from "./styled";

export default function Visitadores() {
  return (
    <BuscarVisitadores />
  );
}
