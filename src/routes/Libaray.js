import React, { Component } from "react";
import { Nav } from "react-bootstrap";

export default class Libaray extends Component {
  render() {
    return (
      <div>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link disabled href="#">
              Presentations
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              Roadmap
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              Wiki
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              NAS
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}
