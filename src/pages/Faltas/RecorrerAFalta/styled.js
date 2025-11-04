import styled from "styled-components";

// Page container with soft gradient background
export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff7f7 0%, #f7f9ff 50%, #fdf2f8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Card/Form with modern look
export const Div = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.12);
  border: 1px solid rgba(244, 114, 182, 0.15);

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
      color: #1f2937;
      font-weight: 800;
      letter-spacing: 0.2px;
    }
  }

  .subtitle {
    color: #6b7280;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  textarea {
    min-height: 220px;
    background: #f9fafb;
    color: #111827;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: #f472b6;
      box-shadow: 0 0 0 4px rgba(244, 114, 182, 0.15);
      background: #ffffff;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  button[type="submit"] {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: #ffffff;
    border: none;
    padding: 0.9rem 1.4rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 6px 18px rgba(236, 72, 153, 0.35);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(236, 72, 153, 0.45);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 6px 18px rgba(236, 72, 153, 0.35);
    }
  }
`;

// Navigation Styling
export const Nav = styled.nav`
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  padding: 20px;
  border-radius: 12px;
  margin-top: 25px;
  box-shadow: 0 6px 15px rgba(17, 24, 39, 0.12);
  text-align: center;

  span {
    color: #0ea5e9;
    font-weight: 800;
    font-size: 20px;
  }

  p {
    color: #334155;
    font-size: 14px;
    margin-top: 8px;
  }

  .link {
    color: #ffffff;
    display: inline-flex;
    background: linear-gradient(135deg, #f472b6, #ec4899);
    padding: 14px;
    border-radius: 8px;
    width: 160px;
    margin: 15px auto 0;
    text-align: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(236, 72, 153, 0.35);
  }

  .link:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(236, 72, 153, 0.45);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* Espaçamento entre os radios */
  margin-top: 15px;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    color: white;
  }

  input {
    margin-right: 8px;
    transform: scale(1.2); /* Aumenta o tamanho do radio */
    accent-color: #05ffa1; /* Cor personalizada */
  }
`;
