import axios from "axios";
import history from "./history"; // Importe o history que você acabou de criar
import { toast } from "react-toastify"; // Adicione esta importação

// Criação de instância do Axios
const api = axios.create({
  //baseURL: "https://primeirainfanciasuasapi.socialquixada.com.br/apiv1",
  baseURL: "http://localhost:3003/apiv1",
  withCredentials: true,
});

// Interceptor de requisição: anexa token de autenticação se disponível
api.interceptors.request.use(
  (config) => {
    try {
      const token =
        sessionStorage.getItem("jwt") || sessionStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (_) {
      // Ignora problemas ao acessar sessionStorage
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Configuração do interceptador de resposta
api.interceptors.response.use(
  (response) => {
    // Se a resposta tem a estrutura { success: true, data: ... }, extrair apenas os dados
    if (
      response.data &&
      response.data.success === true &&
      response.data.data !== undefined
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    const { response, request, message } = error || {};

    if (response) {
      const status = response.status;
      const rawData = response.data;

      // Normaliza o formato de erro para alinhar com o middleware da API
      let normalizedMessage = "Erro ao processar a requisição.";
      let normalizedErrors = [];

      if (rawData && typeof rawData === "object") {
        if (typeof rawData.message === "string" && rawData.message.length) {
          normalizedMessage = rawData.message;
        }
        if (Array.isArray(rawData.errors) && rawData.errors.length) {
          normalizedErrors = rawData.errors;
        } else if (rawData.message) {
          normalizedErrors = [rawData.message];
        }
      }

      response.data = {
        ...(rawData && typeof rawData === "object" ? rawData : {}),
        success: false,
        message: normalizedMessage,
        errors: normalizedErrors,
      };

      // Tratamento para status 401 e 403
      if (status === 401 || status === 403) {
        toast.error("Você não está autorizado a acessar esta página.");
        history.push("/login");
      }
    } else if (request) {
      console.error("Problema de rede ou servidor não respondeu.");
      toast.error("Problema de rede. Por favor, verifique sua conexão.");
    } else {
      console.error("Erro desconhecido:", message);
    }

    return Promise.reject(error);
  }
);

export default api;
