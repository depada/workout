import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.png";
import logoText from "../assets/icons/logo_text.png";
const Footer = () => {
  const isInfoPage = window.location.href.includes("/tell-us");
  return (
    <Div
      style={{
        position: isInfoPage ? "absolute" : "sticky",
        bottom: 0,
        width: isInfoPage ? "100vw" : "inherit",
      }}
    >
      <div className="footer">
        <img src={logo} alt="logo" />
        <img src={logoText} style={{ width: "100px" }} alt="logo_text" />
      </div>
      <div className="creator">
        {" "}
        Created by <a href="https://github.com/depada">Team Stack Overflow</a>
      </div>
    </Div>
  );
};
const Div = styled.div`
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  background: #191f2a;
  display: flex;
  padding: 1.5rem;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  .footer {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.5rem;
    img {
      width: 40px;
      height: 40px;
    }
    h2 {
      color: #fff;
      font-size: 1.2rem;
    }
  }
  .creator {
    color: #fff;
    font-size: 1.2rem;
    a {
      text-decoration: none;
      color: #1460e5;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 768px) {
    flex-direction: column;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 1.2rem;
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      img {
        width: 40px;
        height: 40px;
      }
      h2 {
        color: #fff;
        font-size: 1.2rem;
      }
    }
    .creator {
      color: #fff;
      font-size: 1rem;
      a {
        text-decoration: none;
        color: #1460e5;
      }
    }
  }
`;
export default Footer;
