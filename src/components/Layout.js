import React, { useContext } from "react";
import Header from "./Header";
import ThemeContext from "../contexts/themeContext";
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const ContentContainer = styled(Container)`
  padding: 10px 0px;
`

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext)
  const bg =
    theme === "dark"
      ? "body {background-color: #404042; color: gray;}"
      : "body {background-color: #fff; color: #000;}"
  return (
    <>
      <style>{bg}</style>
      <Container fluid="xl">
        <Header />
        <ContentContainer className="content">
          {children}
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout;
