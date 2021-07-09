import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = ({ isLogin, user }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/theme">CASPER</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/theme">Home</Nav.Link>
          <LinkContainer to="/board">
            <Nav.Link>Board</Nav.Link>
          </LinkContainer>
          {isLogin ? (
            <>
              <LinkContainer to="/community">
                <Nav.Link>Community</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/library">
                <Nav.Link>Library</Nav.Link>
              </LinkContainer>

              <NavDropdown title={user.nickname} id="basic-nav-dropdown">
                <NavDropdown.Item>동아리 토큰 인증</NavDropdown.Item>
                <NavDropdown.Item>회원정보 보기</NavDropdown.Item>
                <NavDropdown.Item>작성 글 보기</NavDropdown.Item>
                <NavDropdown.Divider />
                <LinkContainer to="/account/logout">
                  <NavDropdown.Item>로그아웃</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </>
          ) : (
            <>
              <LinkContainer to="/account/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const mapStateToProps = ({ accountReducer }) => {
  return {
    isLogin: accountReducer.isLogin,
    user: accountReducer.user,
  };
};

export default connect(mapStateToProps)(Navigation);
