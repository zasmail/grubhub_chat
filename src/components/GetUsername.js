import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import SubmitButton from "./SubmitButton";

const Hero = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeroImage = styled.div`
  background-image: url(https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto/fl_lossy/q_80/v1538431627/Homepage_Desktop_0018_Pizza_2x_qshvvo.jpg);
  background-color: #777;
  padding: 52px 20px;
  width: 100%;
  position: relative;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover !important;
  justify-content: center;
  display: flex;
`;
const Container = styled.div`
  max-width: 1140px;
  color: white;
`;
const UsernameForm = styled.form`
  display: flex;
`;
const UserNameInputField = styled.input`
  border: 0;
  border-radius: 5px;
  padding-left: 10px;
  height: 48px;
  flex: 3 1 auto;
  min-width: 1%;
  font-size: 16px;
`;
// const SubmitButton = styled.form`
//   cursor: pointer;
//   flex-basis: 16.6667%;
//   border-radius: 5px;
//   margin-left: 8px;
//   line-height: 48px;
//   height: 48px;
//   padding: 0 20px;
//   color: #fff;
//   background: #0070eb;
//   border-color: #0070eb;
// `;

class GetUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <>
        <Navbar />
        <Hero>
          <HeroImage>
            <Container>
              <h1>What is your username?</h1>
              <UsernameForm onSubmit={this.onSubmit}>
                <UserNameInputField
                  type="text"
                  placeholder="Your full name"
                  onChange={this.onChange}
                />
                <SubmitButton />
              </UsernameForm>
            </Container>
          </HeroImage>
        </Hero>
      </>
    );
  }
}
export default GetUsername;
