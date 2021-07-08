import React, { Component } from "react";
import { Card, Form, ListGroup } from "react-bootstrap";
import {
  appeals_dummy,
  suggestions_dummy,
  rescuers_dummy,
  users_dummy,
} from "./lobby_dummy";

export default class Lobby extends Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-row">
          {appeals_dummy.map((apeal, index) => (
            <Card
              key={index}
              className="text-center"
              style={{ width: "8rem", height: "10rem" }}
            >
              <Card.Body>
                <Card.Title>{apeal.owner.name}</Card.Title>
                <Card.Text>{apeal.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

        <span>제안하기</span>
        <div className="d-flex flex-row">
          <div className="suggestion__suggest">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control type="text" placeholder="Title" />
                <Form.Control as="textarea" placeholder="Content" rows={2} />
              </Form.Group>
            </Form>
          </div>
          <div className="suggestion__list">
            <ListGroup>
              {suggestions_dummy.map((suggestion, index) => (
                <ListGroup.Item key={index} action href="">
                  {suggestion.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="suggestion__view">
            <p>{suggestions_dummy[0].title}</p>
            {suggestions_dummy[0].chats.map((chat, index) => (
              <p key={index}>
                {chat.name}: {chat.content}
              </p>
            ))}
          </div>
        </div>
        <span>Rescuers</span>
        <div className="d-flex flex-row">
          {rescuers_dummy.map((rescuer, index) => (
            <Card
              key={index}
              className="text-center"
              style={{ width: "8rem", height: "10rem" }}
            >
              <Card.Body>
                <Card.Title>{rescuer.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {rescuer.techs}
                </Card.Subtitle>
                <Card.Text>{rescuer.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="member-list">
          <span>정회원</span>
          <div className="d-flex flex-row">
            {users_dummy.junior.map((user, index) => (
              <Card
                key={index}
                className="text-center"
                style={{ width: "8rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.techs}
                  </Card.Subtitle>
                  <Card.Text>{user.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <span>졸업생</span>
          <div className="d-flex flex-row">
            {users_dummy.senior.map((user, index) => (
              <Card
                key={index}
                className="text-center"
                style={{ width: "8rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.techs}
                  </Card.Subtitle>
                  <Card.Text>{user.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
