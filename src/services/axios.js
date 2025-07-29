import axios from "axios";
import history from "./history"; // Importe o history que você acabou de criar
import { toast } from "react-toastify"; // Adicione esta importação

// Criação de instância do Axios
const api = axios.create({
  baseURL: "http://192.168.1.12:3003/apiv1",
  // baseURL: "http://localhost:3003/apiv1",
  withCredentials: true,
});

// Configuração do interceptador de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Tratamento para status 401 e 403
      if (error.response.status === 401 || error.response.status === 403) {
        toast.error("Você não está autorizado a acessar esta página.");
        history.push("/login");
      }
    } else if (error.request) {
      console.error("Problema de rede ou servidor não respondeu.");
      toast.error("Problema de rede. Por favor, verifique sua conexão.");
    } else {
      console.error("Erro desconhecido:", error.message);
      toast.error("Erro desconhecido: " + error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
