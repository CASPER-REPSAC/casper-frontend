import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>CASPER</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/board">
            <Nav.Link>Board</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/community">
            <Nav.Link>Community</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/library">
            <Nav.Link>Library</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Neva" id="basic-nav-dropdown">
            <NavDropdown.Item>동아리 토큰 인증</NavDropdown.Item>
            <NavDropdown.Item>회원정보 보기</NavDropdown.Item>
            <NavDropdown.Item>작성 글 보기</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>로그아웃</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default Navigation;
