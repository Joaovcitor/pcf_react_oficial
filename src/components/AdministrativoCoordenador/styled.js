import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
  /* background-color: #d95032; */
  background-color: #f2d399;
  border: solid 0.5vmin #1b1959;
  width: 85%;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  max-width: 100%;

  h4 {
    width: 100%;
    text-align: center;
    color: black;
    font-weight: bolder;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    background: #f24405;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #0d0d0d;
    /* box-shadow: 0.4rem 0.4rem #05060f; */
    overflow: hidden;
    color: white;
    text-align: center;
  }

  .links {
    background-color: #bb1141;
    color: white;
    font-weight: bolder;
    width: 180px;
    border-radius: 10px;
    padding: 5px;
    margin-top: 10px;
    border: 0.5vmin solid #0d0d0d;
  }

  p {
    color: #05060f;
    font-size: 1rem;
    line-height: 1.25;
    font-weight: 700;
  }

  span {
    font-weight: bolder;
  }

  @media (max-width: 1024px) {
    div {
      width: 200px;
    }
  }

  @media (max-width: 768px) {
    div {
      width: 180px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    div {
      width: 100%;
    }
  }
`;
