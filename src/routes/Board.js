import React from 'react';

const dummy_post = {
  id: '428',
  title: '2021년도 준회원 CTF 결과',
  content: 'test_content',
  author: 'Universe',
  created: '2121.05.30',
  viewer_num: '67',
};

export default function Board() {
  const { id, title, author, created, viewer_num } = dummy_post;
  return (
    <>
      <div className="sub">
        <div className="sub__title">
          <h1>Board Name</h1>
        </div>
      </div>
      <div className="board">
        <div className="board__list">
          <table>
            <thead>
              <tr>
                <th>
                  <span>번호</span>
                </th>
                <th>
                  <span>제목</span>
                </th>
                <th>
                  <span>글쓴이</span>
                </th>
                <th>
                  <span>날짜</span>
                </th>
                <th>
                  <span>조회 수</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="no">{id}</td>
                <td className="title">
                  <a href="">{title}</a>
                </td>
                <td className="author">
                  <a href="">{author}</a>
                </td>
                <td className="time">{created}</td>
                <td className="readNum">{viewer_num}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="board__footer">
          <div className="board__footer__pagination">
            <a href="">첫 페이지</a>
            <strong>1</strong>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">4</a>
            <a href="">끝 페이지</a>
          </div>
        </div>
      </div>
    </>
  );
}
