/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import Mapa from "../../../components/Mapa";
import { Div } from "./styled";
import { toast } from "react-toastify";
import InvalidarVisita from "../../../components/InvalidarVisita";

export default function MapaDeCalor({ match }) {
  return (
    <>
      <Mapa></Mapa>
    </>
  );
}
