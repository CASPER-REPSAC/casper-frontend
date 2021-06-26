import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="navbar">
    <div className="navbar__logo">
      <Link to="/">CASPER</Link>
    </div>

    <ul className="navbar__menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/board">Board</Link>
        <ul>
          <li>
            <Link to="/board/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/board/free">자유게시판</Link>
          </li>
          <li>
            <span>사진첩</span>
          </li>
          <li>
            <span>블로그</span>
          </li>
          <li>
            <span>준회원게시판</span>
          </li>
          <li>
            <span>정회원게시판</span>
          </li>
          <li>
            <span>졸업생게시판</span>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/community">Community</Link>
        <ul>
          <li>
            <Link to="/community/lobby">Lobby</Link>
          </li>
          <li>
            <span>Study</span>
          </li>
          <li>
            <span>Project</span>
          </li>
          <li>
            <span>CTF</span>
          </li>
          <li>
            <span>Activities</span>
          </li>
          <li>
            <Link to="/community/sos">S.O.S</Link>
          </li>
          <li>
            <Link to="/community/rank">RANK</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/library">Library</Link>
        <ul>
          <li>
            <span>Presentations</span>
          </li>
          <li>
            <span>Roadmap</span>
          </li>
          <li>
            <a href="">CasperWIKI</a>
          </li>
          <li>
            <a href="">NAS</a>
          </li>
        </ul>
      </li>
    </ul>

    <div className="navbar__account"></div>
  </nav>
);
export default Navigation;
