import React, { Component } from "react";
import styled from "styled-components";
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1030;
  display: flex;
  width: 100%;
  height: 60px;
  color: #fff;
  transform: translateZ(0);
  box-shadow: "none";
  transition: all 0.2s ease;
  background-color: #f63440;
`;
const Logo = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
  margin: 15px 15px 15px;
  width: 100%;
  background-size: contain;
  height: 100%;
  background-image: url(https://www.grubhub.com/assets/img/grubhub/logo-full.svg);
  transition: none;
`;

const LogoContainer = styled.div`
  flex: 1 150px;
  justify-content: center;
  max-width: 150px;
`;
class Navbar extends Component {
  render() {
    return (
      <>
        <Header>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Header>
      </>
    );
  }
}
export default Navbar;
