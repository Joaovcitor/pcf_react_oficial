import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858F;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    width: 300px;
    /* height: 384px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: #78858F;
  }

  .card__img {
    height: 192px;
    width: 100%;
  }

  .card__avatar {
    position: absolute;
    width: 114px;
    height: 114px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 57px);
  }

  .card__avatar svg {
    width: 100px;
    height: 100px;
  }

  .card__title {
    margin-top: 60px;
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

  .card__btn {
    margin-top: 15px;
    width: 125px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    font-weight: 700;
    font-size: 11px;
    color: var(--main-color);
    background: var(--bg-color);
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin: 0 auto;
  margin-top: 20px;

  p {
    color: black;
  }

  h3 {
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  div {
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: #e3cd40;
    width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    border-radius: 5px;
    justify-content: center;
  }

  .links {
    border: none;
    background-color: blue;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 7px;
    padding: 5px;
    border-radius: 4px;
    color: white;
  }
`;

export const Nav = styled.nav`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  div {
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: ${primaryColor};
    text-align: center;
    border-radius: 5px;
    justify-content: center;
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
