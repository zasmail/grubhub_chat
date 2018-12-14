import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.form`
  cursor: pointer;
  flex-basis: 16.6667%;
  border-radius: 5px;
  margin-left: 8px;
  line-height: 48px;
  height: 48px;
  padding: 0 20px;
  color: #fff;
  background: #0070eb;
  border-color: #0070eb;
  text-align: center;
`;
class SubmitButton extends Component {
  render() {
    return (
      <>
        <Button type="submit">Submit</Button>
      </>
    );
  }
}
export default SubmitButton;
