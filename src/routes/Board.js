import React from 'react';
import { getBoard, getDataByUrl } from 'api';
import { Link } from 'react-router-dom';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_name: this.props.location.pathname.replace('/board/', ''),
      posts: [],
    };
  }
  componentDidMount() {
    this.receivePosts();
  }
  componentDidUpdate() {
    if (
      this.props.location.pathname.replace('/board/', '') !==
      this.state.board_name
    ) {
      this.receivePosts();
    }
  }

  async receivePosts() {
    this.setState({
      board_name: this.props.location.pathname.replace('/board/', ''),
    });
    let board_id = 3;
    if (this.state.board_name === 'notice') {
      board_id = 1;
    } else if (this.state.board_name === 'free') {
      board_id = 2;
    }
    const received_board = await getBoard(board_id);

    this.setState({ posts: [] });
    for (let post_url of received_board.data.posts) {
      const received_post = await getDataByUrl(post_url);
      this.setState({ posts: this.state.posts.concat(received_post.data) });
    }
  }

  render() {
    return (
      <>
        <div className="sub">
          <div className="sub__title">
            <h1>{this.props.location.pathname.replace('/board/', '')}</h1>
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
                  <tr key={post.id}>
                    <td className="no">{post.id}</td>
                    <td className="title">
                      <Link
                        to={'/board/' + this.state.board_name + '/' + post.id}
                      >
                        {post.title}
                      </Link>
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
