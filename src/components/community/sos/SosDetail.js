import React, { Component } from "react";

export default class SosDetail extends Component {
  render() {
    const sos_dummy = {
      question: {
        id: 1,
        author: "Neva",
        created_date: "21-06-29",
        title: "Somebody Help..",
        empired_date: null,
        category: "Django",
        content: "Django Debug False Static Not found",
      },
      answers: [
        {
          author: "Neva",
          created_date: "21-06-29",
          title: "It help you",
          content: "python manage.py runserver --insecure, ...",
        },
        {
          author: "anon",
          created_date: "21-06-30",
          title: "Maybe..",
          content: "You can do that ! ! ,,",
        },
      ],
    };

    return (
      <div>
        <div className="question">
          <div className="question__header">
            <h1>{sos_dummy.question.title}</h1>
            <p className="question__header__meta">
              <span className="author">{sos_dummy.question.author}</span>
              <span className="created">{sos_dummy.question.created_date}</span>
            </p>
          </div>
          <div className="question__body">
            <p>{sos_dummy.question.content}</p>
          </div>
        </div>
        <div className="answer-list">
          {sos_dummy.answers.map((answer) => (
            <div className="answer">
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
