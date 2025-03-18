import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
  /* background-color: #4C9770; */
  background-color: #011126;
  /* background-color: #5496bf; */
  background-color: #053f5c;
  /* border-bottom: 1px solid #011126; */
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  img {
    width: 70px;
  }
`;
