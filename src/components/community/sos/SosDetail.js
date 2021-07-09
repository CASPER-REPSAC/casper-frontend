import React, { Component } from "react";
import { sos_dummy } from "./sos_dummy";
export default class SosDetail extends Component {
  render() {
    return (
      <div>
        <div className="question">
          <div className="question__header">
            <h1>{sos_dummy[0].title}</h1>
            <p className="question__header__meta">
              <span className="author">{sos_dummy[0].author}</span>
              <span className="created">{sos_dummy[0].created_date}</span>
            </p>
          </div>
          <div className="question__body">
            <p>{sos_dummy[0].content}</p>
          </div>
        </div>
        <div className="answer-list">
          {sos_dummy[0].answers.map((answer, index) => (
            <div className="answer" key={index}>
              <div className="answer__header">
                <h1>{answer.title}</h1>
                <p className="answer__header__meta">
                  <span className="author">{answer.author}</span>
                  <span className="created">{answer.created_date}</span>
                </p>
              </div>
              <div className="answer__body">
                <p>{answer.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
