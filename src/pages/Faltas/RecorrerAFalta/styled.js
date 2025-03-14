import styled from "styled-components";

// Form Container
export const Div = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #bf0f1e;
  width: 380px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  text-align: center;

  h2 {
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  p {
    font-size: 16px;
    color: #e0f7fa;
    margin-top: 10px;
  }

  select,
  textarea,
  input {
    border: none;
    padding: 12px;
    border-radius: 8px;
    width: 85%;
    font-size: 16px;
    margin-top: 10px;
    transition: all 0.3s ease-in-out;
  }

  select {
    background-color: #fff;
    color: #333;
    font-weight: 600;
    text-align: center;
  }

  option {
    color: #333;
    font-size: 16px;
  }

  textarea {
    height: 250px;
    background: #fff;
    color: #333;
    border: none;
    font-family: "Courier New", Courier, monospace;
    font-size: 16px;
  }

  input {
    background: #fff;
    color: #333;
    text-align: center;
    font-family: "Courier New", Courier, monospace;
  }

  button {
    background-color: #6fd904;
    border: solid 1px #333;
    color: black;
    border: none;
    padding: 12px 20px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 15px;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background: #f23d4c;
  }
`;

// Navigation Styling
export const Nav = styled.nav`
  background: linear-gradient(135deg, #1e2a47, #0d1b2a);
  padding: 20px;
  border-radius: 12px;
  margin-top: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  text-align: center;

  span {
    color: #ffc107;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
  }

  p {
    color: #e0f7fa;
    font-size: 14px;
    margin-top: 8px;
  }

  .link {
    color: #fff;
    display: flex;
    background: #ffc107;
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
  }

  .link:hover {
    background: #ffa000;
    color: #fff;
    box-shadow: 0 4px 10px rgba(255, 152, 0, 0.6);
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
