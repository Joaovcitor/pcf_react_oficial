import axios from "axios";
import history from "./history"; // Importe o history que você acabou de criar

// Criação de instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Configuração do interceptador de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        history.push("/login");
      }
    } else if (error.request) {
      console.error("Problema de rede ou servidor não respondeu.");
    } else {
      console.error("Erro desconhecido:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
