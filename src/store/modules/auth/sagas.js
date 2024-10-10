import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/login", payload, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(actions.loginSuccess({ ...response.data }));

    const { token } = response.data;

    sessionStorage.setItem("token", token);

    toast.success("Você fez login com sucesso!");

    history.push(payload.prevPath);
  } catch (e) {
    console.log(e);
    toast.error("E-mail ou senha inválidos");
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;

  sessionStorage.setItem("token", token);
}

function* registerRequest({ payload }) {
  const { id, email, password } = payload;

  try {
    if (id) {
      yield call(axios.post, "/visitadores/editarperfilvisitador", {
        email,
        password: password || undefined,
      });
      toast.success("Conta alterada com sucesso");
    }
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

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
