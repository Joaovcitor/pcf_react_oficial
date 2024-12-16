import axios from "../services/axios";

export default async function RelatoriosDeVisitadoresIndividuais(endPoint) {
  try {
    const response = await axios.get(`/detalhes/${endPoint}`);
    return {
      visitador: response.data.visitador,
      childrens: response.data.child,
      planos: response.data.planos,
      visitasFeitas: response.data.visitasFeitas,
    };
  } catch (e) {
    console.log(e);
  }
}
