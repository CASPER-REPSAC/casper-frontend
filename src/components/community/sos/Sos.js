import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sos_dummy } from "./sos_dummy";

export default class Sos extends Component {
  render() {
    return (
      <div>
        <p>S.O.S</p>
        <div className="sos__write">
          <Form>
            <p>
              구조자 대기: 4명 <Button>구조자 등록</Button>
            </p>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control type="text" placeholder="Title" />
              <Form.Control type="text" placeholder="Category" />
              <Form.Control type="text" placeholder="Empired Date" />

              <Form.Control as="textarea" placeholder="Content" rows={2} />
              <Button>구조요청 발신</Button>
            </Form.Group>
          </Form>
        </div>
        <div className="sos__list">
          <Table hover size="sm">
            <thead>
              <tr>
                <th>
                  <span>제목</span>
                </th>
                <th>
                  <span>구조 요청자</span>
                </th>
                <th>
                  <span>응답수</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sos_dummy.map((question, index) => (
                <tr key={index}>
                  <td className="title">
                    <Link to={"/community/sos/" + question.id}>
                      {question.title}
                    </Link>
                  </td>
                  <td className="author">{question.author}</td>
                  <td className="rescue_num">{question.answers.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
