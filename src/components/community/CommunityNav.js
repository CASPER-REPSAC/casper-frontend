import React, { Component } from "react";
import { Nav } from "react-bootstrap";

export default class CommunityNav extends Component {
  constructor(props) {
    super(props);
    if (document.location.href.match(/([^/]*)\/*$/)[1] === "community") {
      this.state = {
        service_name: "lobby",
      };
    } else {
      this.state = {
        service_name: document.location.href.match(/([^/]*)\/*$/)[1],
      };
    }
  }

  componentDidMount() {
    const chess_btn = document.getElementById("chess-btn");
    chess_btn.addEventListener("click", () => {
      window.open("/chess", "Chess", "width=800, height=800");
    });
  }

  render() {
    return (
      <div>
        <Nav
          variant="tabs"
          defaultActiveKey={"/community/" + this.state.service_name}
        >
          <Nav.Item>
            <Nav.Link href="/community/lobby">로비</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link id="chess-btn">
              <span style={{ color: "#6c757d" }}>Study</span> (♖♘♔)
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="/community/project">
              Project
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="/community/ctf">
              CTF
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="/community/activities">
              Activities
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/community/sos">S.O.S</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/community/rank">Rank</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}
