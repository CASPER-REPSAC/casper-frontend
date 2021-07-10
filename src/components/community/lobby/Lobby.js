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
      <div className="lobby">
        <div className="lobby__appeals">
          <div className="tag">
            <span>#배우고싶어요</span>
          </div>
          {appeals_dummy.map((apeal, index) => (
            <div key={index} className="appeal-card">
              <div className="appeal-card__photo"></div>
              <div className="appeal-card__name">
                <span>{apeal.owner.name}</span>
              </div>
              <div className="appeal-card__content">
                <span>{apeal.content}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lobby__suggestion">
          <div className="suggest">
            <div className="suggest__top">
              <span>제안하기</span>
              <div className="suggest__top__types">
                <button className="project">PROJECT</button>
                <button className="study">STUDY</button>
                <button className="ctf">CTF</button>
              </div>
            </div>
            <div className="suggest__form">
              <input
                disabled
                type="text"
                placeholder="Title"
                className="title"
              />
              <textarea
                disabled
                type="text"
                placeholder="Content"
                className="content"
              />
            </div>
            <div className="suggest__footer">
              <button className="cancel">취소</button>
              <button className="submit">등록</button>
            </div>
          </div>
          <ul className="suggestions-list">
            {suggestions_dummy.map((suggestion, index) => (
              <li key={index} className="suggestions-list__title">
                <button>{suggestion.title}</button>
              </li>
            ))}
          </ul>
          <div className="suggestion-chat">
            <div className="suggestion-chat__title">
              <span>{suggestions_dummy[0].title} </span>
              <span className="new">3</span>
            </div>
            <ul className="suggestion-chat__room">
              {suggestions_dummy[0].chats.map((chat, index) => (
                <li className="chat" key={index}>
                  <span className="chat__name">{chat.name}</span>
                  <span className="chat__msg">{chat.content}</span>
                </li>
              ))}
            </ul>
            <div className="suggestion-chat__input">
              <input
                disabled
                type="text"
                placeholder="I think ..."
                className="title"
              />
              <button>전송</button>
            </div>
          </div>
        </div>

        <div className="lobby__rescuers">
          <span className="cardbox-tag">Rescuers</span>
          <div className="rescuers__cardbox">
            {rescuers_dummy.map((rescuer, index) => (
              <div className="member-card" key={index}>
                <div className="photo"></div>
                <span className="name">{rescuer.name}</span>
                <span className="techs">{rescuer.techs}</span>
                <span className="description">{rescuer.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lobby__activities">
          <span> 🚧 Activities 🚧</span>
          <span> project</span>
          <span> study</span>
          <span> ctf</span>
        </div>

        <button
          className="more-member-btn"
          onClick={() => {
            const display =
              document.getElementsByClassName("junior-members")[0].style
                .display;
            if (display === "none") {
              document.getElementsByClassName(
                "junior-members"
              )[0].style.display = "block";
              document.getElementsByClassName(
                "senior-members"
              )[0].style.display = "block";
              document.getElementsByClassName(
                "more-member-btn"
              )[0].textContent = "전체 멤버 닫기";
            } else {
              document.getElementsByClassName(
                "junior-members"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "senior-members"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "more-member-btn"
              )[0].textContent = "전체 멤버 보기";
            }
          }}
        >
          전체 멤버 보기
        </button>
        <div className="lobby__members">
          <div className="junior-members">
            <span className="cardbox-tag">정회원</span>
            <div className="member-cardbox">
              {users_dummy.junior.map((user, index) => (
                <div className="member-card" key={index}>
                  <div className="photo"></div>
                  <span className="name">{user.name}</span>
                  <span className="techs">{user.techs}</span>
                  <span className="description">{user.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="senior-members">
            <span className="cardbox-tag">졸업생</span>
            <div className="member-cardbox">
              {users_dummy.senior.map((user, index) => (
                <div className="member-card" key={index}>
                  <div className="photo"></div>
                  <span className="name">{user.name}</span>
                  <span className="techs">{user.techs}</span>
                  <span className="description">{user.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
