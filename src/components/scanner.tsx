import React from "react";
import styled from "styled-components";


const Button = styled.button`
  padding: .8rem 2rem;
  font-weight: 600;
  color: #fff;
  background-color: #cf2265;
  border-radius: 1rem;
  cursor: pointer;
  border: none;
  &:active {
    background-color: #c42062;
  }
`

const Container = () => {
  return <div>
      <Button>The Nothing Button</Button>
    </div>;
};

export default Container;
