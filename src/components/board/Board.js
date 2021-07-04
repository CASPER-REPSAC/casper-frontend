import React from "react";
import { getBoards, getDataByUrl } from "api";
import { Link } from "react-router-dom";
import { Table, Pagination, Nav } from "react-bootstrap";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_name: this.props.location.pathname.replace("/board/", ""),
      all_posts: {},
    };
  }
  componentDidMount() {
    this.receivePosts();
  }
  componentDidUpdate() {
    if (
      this.state.board_name !==
      this.props.location.pathname.replace("/board/", "")
    ) {
      this.setState({
        board_name: this.props.location.pathname.replace("/board/", ""),
      });
    }
  }

  async receivePosts() {
    const received_board = await getBoards();
    this.setState({ boards: received_board.data });
    let all_posts = {};
    for (let board of received_board.data) {
      all_posts[board.name] = [];
      for (let post_url of board.posts) {
        const received_post = await getDataByUrl(post_url);
        all_posts[board.name] = all_posts[board.name].concat(
          received_post.data
        );
      }
    }
    this.setState({ all_posts: all_posts });
  }

  render() {
    return (
      <>
        <Nav
          variant="tabs"
          defaultActiveKey={"#/board/" + this.state.board_name}
        >
          <Nav.Item>
            <Nav.Link href="#/board/notice">공지사항</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#/board/free">자유게시판</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              사진첩
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              블로그
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              준회원 게시판
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              정회원 게시판
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              졸업생 게시판
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="sub">
          <div className="sub__title">
            <h1>{this.state.board_name}</h1>
          </div>
        </div>
        <div className="board">
          <div className="board__list">
            {this.state.all_posts[this.state.board_name] ? (
              <Table hover size="sm">
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
                  {this.state.all_posts[this.state.board_name].map((post) => (
                    <tr key={post.id}>
                      <td className="no">{post.id}</td>
                      <td className="title">
                        <Link
                          to={"/board/" + this.state.board_name + "/" + post.id}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="author">
                        <a href=".">{post.author}</a>
                      </td>
                      <td className="time">
                        {post.created.slice(0, 10).replaceAll("-", ".")}
                      </td>
                      <td className="readNum">{post.viewer_num}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Loading..</p>
            )}
          </div>
          <div className="board__footer">
            <Pagination size="sm">
              <Pagination.Item key={1} active={true} activeLabel="">
                {1}
              </Pagination.Item>
              <Pagination.Item key={2} active={false}>
                {2}
              </Pagination.Item>
              <Pagination.Item key={3} active={false}>
                {3}
              </Pagination.Item>
            </Pagination>
          </div>
        </div>
      </>
    );
  }
}

export default Board;
