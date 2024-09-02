import React, {useState} from "react";
import { Container } from "../../styles/GlobalStyle";
import axios from "../../services/axios";

export default function Visitador() {
  const [visitadores, setVisitadores] = useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/visitadores/visitadores-do-sistema");
      setVisitadores(response.data.visitadores);
    }

    getData();
  }, [])
  return (
    <Container>
      <h2>Olá, Visitador</h2>
      {visitadores.map(visitador => (visitador.name))}
    </Container>
  );
}
