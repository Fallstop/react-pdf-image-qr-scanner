import React from "react";
import styled from "styled-components";
import Scanner from "./components/scanner";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <h1>React Demo</h1>
      <Scanner />
    </Container>
  );
}

export default App;
