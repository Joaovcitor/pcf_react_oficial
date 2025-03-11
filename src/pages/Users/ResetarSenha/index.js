/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Organizador, Links, Div } from "./styled";
import axios from "../../../services/axios";
import { get } from "lodash";

import { toast } from "react-toastify";

export default function ResetarSenha({ match }) {
  const { token } = match.params;
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      return toast.error("Preencha sua senha");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Senhas são diferentes!");
    }

    try {
      await axios.patch(`/login/resetar-senha/${token}`, {
        newPassword,
      });
      toast.success("Senha recuperada com sucesso!");
      history.push("/login");
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof errors === "object") {
        Object.values(errors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
      }
    }
  };
  return (
    <Div>
      <Organizador onSubmit={handleSubmitPassword}>
        Redefinir senha:
        <label htmlFor="email">
          Senha
          <input
            type="password"
            id="password"
            value={newPassword || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Confirmar Senha
          <input
            type="password"
            id="password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Editar</button>
      </Organizador>
    </Div>
  );
}
