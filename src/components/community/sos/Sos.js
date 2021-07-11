import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sos_dummy } from "./sos_dummy";

export default class Sos extends Component {
  render() {
    return (
      <div className="sos">
        <div className="sos__form">
          <div className="sos__form__inputs">
            <div className="header">
              <input
                disabled
                className="title"
                placeholder="title"
                type="text"
              ></input>
              <input
                disabled
                className="category"
                type="text"
                placeholder="category"
              ></input>
              <input
                disabled
                className="empired-date"
                placeholder="empired-date"
                type="date"
              ></input>
            </div>
            <textarea
              disabled
              type="text"
              className="content"
              placeholder="content"
            />
          </div>
          <div className="sos__form__submit">
            <div className="rescuer-form">
              <div className="rescuer-form__num">
                <span>⛑ 구조자 대기: 4명</span>
              </div>
              <button disabled className="rescuer-form__regist">
                구조자 등록
              </button>
            </div>
            <div className="sos-submit">
              <button disabled className="sos-submit__submit-btn">
                구조 요청 🧨
              </button>
              <button disabled className="sos-submit__cancel-btn">
                지우기
              </button>
            </div>
          </div>
        </div>

        <div className="sos__list">
          <span className="sos__list__title">구조 신호 (S.O.S) 목록 </span>
          <Table hover size="sm" className="sos__list__table">
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
