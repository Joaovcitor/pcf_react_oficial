import React, { useEffect, useState } from "react";
import { Section, Card, Button } from "./styled";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import { get } from "lodash";

// 2. Nome do componente em PascalCase (inicia com letra maiúscula)
export default function Dados() {
  const [caregivers, setCaregivers] = useState([]);
  // 3. Iniciar o loading como 'true' para mostrar feedback ao usuário
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/cuidador/");
        setCaregivers(response.data);
      } catch (err) {
        setError("Falha ao buscar os dados. Tente novamente mais tarde.");
        const errors = get(err, "response.data.errors", []);
        errors.forEach((errorMsg) => toast.error(errorMsg));
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const handleSubmitValidar = async (idCaregiver) => {
    setLoading(true);
    try {
      await axios.put("/supervisor/validar-cuidador", { idCaregiver });

      toast.success("Dados Validados com sucesso!");

      // getData();
    } catch (e) {
      const errors = get(e, "response.data.errors", [
        "Ocorreu um erro desconhecido.",
      ]);
      if (Array.isArray(errors)) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const nonPregnantCaregivers = caregivers.filter(
    (c) => !c.pregnant && c.children.length > 0
  );
  const pregnantBeneficiaries = caregivers.filter((c) => c.pregnant);

  return (
    <Section>
      {nonPregnantCaregivers.length > 0 && <h1>Cuidadores</h1>}
      {nonPregnantCaregivers.map((caregiver) => (
        <Card
          key={caregiver.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h2>
            {caregiver.name} (CPF: {caregiver.cpf})
          </h2>
          <h3>Crianças:</h3>
          <ul>
            {caregiver.children.map((child) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
          {caregiver.visitor?.name && (
            <div>
              <h3>Visitante:</h3>
              <p>
                Entrada em:{" "}
                {new Date(caregiver.visitor.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          )}
          <Button onClick={() => handleSubmitValidar(caregiver.id)}>
            Validar dados
          </Button>
        </Card>
      ))}

      {pregnantBeneficiaries.length > 0 && <h1>Gestantes</h1>}
      {pregnantBeneficiaries.map((beneficiario) => (
        <Card
          key={beneficiario.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h4>Dados da gestante</h4>
          <p>Nome: {beneficiario.name}</p>
          <p>CPF: {beneficiario.cpf}</p>
          <p>RG: {beneficiario.rg}</p>
          <br />
          {/* Acesso seguro ao nome do visitante */}
          <h4>Dados do Visitador: {beneficiario.visitor?.name}</h4>
          <Button
            onClick={() => handleSubmitValidar(beneficiario.id)}
            type="button"
            className="links"
          >
            Validar dados
          </Button>
        </Card>
      ))}
    </Section>
  );
}
