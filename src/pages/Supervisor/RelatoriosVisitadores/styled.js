import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  h3 {
    font-size: 1.9rem;
    text-align: center;
    margin-bottom: 25px;
    color: #222e3e;

    span {
      color: #003a79ff;
      font-weight: 700;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
    margin: 0 auto 40px auto;
    padding: 25px 30px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 30px rgba(33, 150, 243, 0.15);
    }

    label {
      font-weight: 600;
      color: #33475b;
      font-size: 1rem;
    }

    input {
      padding: 14px 18px;
      font-size: 1rem;
      border: 1.8px solid #cbd5e1;
      border-radius: 10px;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;

      &:focus {
        outline: none;
        border-color: #1e88e5;
        box-shadow: 0 0 8px rgba(30, 136, 229, 0.3);
      }
    }

    button {
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
      background: linear-gradient(90deg, #1e88e5 0%, #1565c0 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(30, 136, 229, 0.4);
      transition:
        background 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        background: linear-gradient(90deg, #1565c0 0%, #0d47a1 100%);
        box-shadow: 0 6px 20px rgba(13, 71, 161, 0.6);
      }
    }
  }
`;

export const PainelResumo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

export const CardResumo = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
  text-align: center;
  cursor: default;
  transition:
    box-shadow 0.4s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px ${({ color }) => color + "55" || "#2196f355"};
    transform: translateY(-8px);
  }

  svg {
    font-size: 3.2rem;
    margin-bottom: 14px;
    color: ${({ color }) => color || "#2196f3"};
  }

  h5 {
    margin: 0 0 12px;
    font-weight: 700;
    font-size: 1.3rem;
    color: #222e3e;
    user-select: none;
  }

  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.4rem;
    color: #444;
  }
`;

export const CriancasContainer = styled.div`
  max-width: 900px;
  margin: 0 auto 40px auto;

  h3 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.8rem;
    color: #222e3e;
  }
`;

export const CriancaCard = styled.div`
  background: white;
  max-width: 280px;
  margin: 0 auto 20px auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 14px 30px rgba(0, 123, 255, 0.25);
  }

  p {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    margin: 10px 0;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;

    a {
      background-color: #007bff;
      color: white;
      padding: 8px 16px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 220px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    max-width: 180px;
    padding: 12px;

    p {
      font-size: 0.9rem;
    }
  }
`;

export const PlanosContainer = styled.div`
  max-width: 900px;
  margin: 0 auto 40px auto;
  padding: 0 10px;

  h3 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.8rem;
    color: #222e3e;
  }
`;

export const PlanoItem = styled.div`
  background: #f9f9f9;
  border-radius: 15px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 22px rgba(0, 123, 255, 0.2);
  }

  p {
    margin: 10px 0;

    strong {
      font-weight: 700;
      color: #007bff;
    }
  }
`;
