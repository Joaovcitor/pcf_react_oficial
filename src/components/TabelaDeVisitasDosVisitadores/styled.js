import styled from "styled-components";
import { primaryColor } from "../../config/colors";

import { Link } from 'react-router-dom';

export const Section = styled.section`
display: flex;
justify-content: center;
text-align: center;
flex-direction: column;

p {
  color: black;
}

h3 {
  color: black;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
`

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:nth-child(even) {
    background-color: #f3f3f3;
  }
`;

export const TableCell = styled.td`
  padding: 12px 15px;
`;

export const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const Table = styled.table`
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  color: white;

  p {
    color: #05060f;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
  }

  div {
  background: #00ffa0;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.5vmin solid #05060f;
  box-shadow: 0.4rem 0.4rem #05060f;
  overflow: hidden;
  color: black;
  }

  .links {
    border: none;
    background-color: blue;
    display: flex;
    margin-top: 25px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
