import React, { Component } from "react";
import { Card, Form, ListGroup } from "react-bootstrap";

export default class Lobby extends Component {
  render() {
    const lobby_dummy = {
      apeals: [
        { created_date: "21-06-29", author: "Neva", content: "Everything" },
        { created_date: "21-06-29", author: "Coais", content: "Languages" },
      ],
      suggestions: [
        {
          title: "Connect",
          type: "project",
          chats: [
            { author: "Neva", created_date: "21-06-29", content: "i wanna do" },
            { author: "Aven", created_date: "21-06-29", content: "good idea!" },
          ],
        },
        { title: "Binary Analystics", type: "study", chats: [] },
      ],
      users: [
        {
          photo: "https://avatars.githubusercontent.com/u/41868642?v=4",
          name: "Neva",
          descryption: "Hi, I'm Neva",
          stacks: "something",
        },
        {
          photo: "https://avatars.githubusercontent.com/u/41868642?v=4",
          name: "Aven",
          descryption: "Hi, I'm aveN",
          stacks: "anything",
        },
      ],
    };

    return (
      <div>
        <div className="d-flex flex-row">
          {lobby_dummy.apeals.map((apeal) => (
            <Card
              className="text-center"
              style={{ width: "8rem", height: "10rem" }}
            >
              <Card.Body>
                <Card.Title>{apeal.author}</Card.Title>
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
              {lobby_dummy.suggestions.map((suggestion) => (
                <ListGroup.Item action href="">
                  {suggestion.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="suggestion__view">
            <p>{lobby_dummy.suggestions[0].title}</p>
            {lobby_dummy.suggestions[0].chats.map((chat) => (
              <p>
                {chat.author}: {chat.content}
              </p>
            ))}
          </div>
        </div>
        <span>Rescuers</span>
        <div className="d-flex flex-row">
          {lobby_dummy.users.map((use) => (
            <Card
              className="text-center"
              style={{ width: "8rem", height: "10rem" }}
            >
              <Card.Body>
                <Card.Title>{use.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {use.stacks}
                </Card.Subtitle>
                <Card.Text>{use.descryption}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="member-list">
          <span>정회원</span>
          <div className="d-flex flex-row">
            {lobby_dummy.users.map((use) => (
              <Card
                className="text-center"
                style={{ width: "8rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Title>{use.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {use.stacks}
                  </Card.Subtitle>
                  <Card.Text>{use.descryption}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <span>졸업생</span>
          <div className="d-flex flex-row">
            {lobby_dummy.users.map((use) => (
              <Card
                className="text-center"
                style={{ width: "8rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Title>{use.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {use.stacks}
                  </Card.Subtitle>
                  <Card.Text>{use.descryption}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
