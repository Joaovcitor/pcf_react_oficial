import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 18px;
    color: white;
    font-weight: bolder;
  }

  h2 {
    color: white;
  }

  input {
    border: none;
    border-bottom: solid 1px black;
    background-color: transparent;
    color: white;
    text-align: center;
    font-size: 18px;
  }
`;

export const Section = styled.section`
position: relative;
  width: 220px;
  height: 120px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  background: #fff;
  border: solid 4px #333;
  box-shadow: -5px 5px #333;
  transition: all .2s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;

  .link {
    background-color: white;
  color: black;
  border-radius: 10em;
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid black;
  box-shadow: 0 0 0 0 black;
  &:hover {
    transform: translateY(-4px) translateX(-2px);
  box-shadow: 2px 5px 0 0 black;
  }
  }

  p {
    color: black;
    margin-bottom: 20px;
  }
`;
