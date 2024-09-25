// utils/BuscarCriancasPorId.js
import axios from "../../services/axios";

const BuscarCriancasPorId = async (id) => {
  try {
    const response = await axios.get(`/crianca/info/${id}`);
    return response.data.child;
  } catch (error) {
    console.error("Erro ao buscar criança:", error);
    return null;
  }
};

export default BuscarCriancasPorId;
