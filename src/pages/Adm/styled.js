import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: #f2b441;
  width: 75%;
  margin: 0 auto;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Nav = styled.nav`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  max-width: 500px;

  h4 {
    color: black;
  }

  div {
    width: 100%;
    background: #00ffa0;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #05060f;
    box-shadow: 0.4rem 0.4rem #05060f;
    overflow: hidden;
    color: black;
    margin-bottom: 10px;
  }

  p {
    color: #05060f;
    font-size: 1rem;
    line-height: 1.25;
    font-weight: 700;
  }
`;
