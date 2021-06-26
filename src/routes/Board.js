import React from 'react';
import { getAllPosts } from 'api';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.receivePosts();
  }
  async receivePosts() {
    const received_posts = await getAllPosts();
    this.setState({ posts: received_posts.data });
    console.log(received_posts);
  }

  render() {
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
                {this.state.posts.map((post) => (
                  <tr>
                    <td className="no">{post.id}</td>
                    <td className="title">
                      <a href="">{post.title}</a>
                    </td>
                    <td className="author">
                      <a href="">{post.author}</a>
                    </td>
                    <td className="time">
                      {post.created.slice(0, 10).replaceAll('-', '.')}
                    </td>
                    <td className="readNum">{post.viewer_num}</td>
                  </tr>
                ))}
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
}

export default Board;
